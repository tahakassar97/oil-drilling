/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { Button } from '@oil-drilling/ui';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  selectedWell?: string;
  drillingData?: any[];
  file?: File;
}

const Chatbot: FC<ChatbotProps> = ({ selectedWell, drillingData, file }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm Drill AI. Ask me anything about this well!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert('Your browser does not support Speech Recognition.');

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSendMessage(transcript); // directly send voice input
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    if ((!inputText.trim() || isLoading) && !message) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      text: message || inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message || inputText,
          selectedWell,
          drillingData,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: Math.random().toString(36).substring(2, 15),
        text: data.response || 'Sorry, I could not process your request.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const errorMessage: Message = {
        id: Math.random().toString(36).substring(2, 15),
        text: 'Sorry, there was an error processing your request.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        id: '1',
        text: "Hi, I'm Drill AI. Ask me anything about this well!",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      startVoiceInput();
    }
    // Voice functionality would be implemented here
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Drill AI</h3>
        <Button
          variant="link"
          onClick={clearHistory}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear History
        </Button>
      </div>

      {/* Voice Chat Button */}
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={toggleVoice}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isVoiceEnabled
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
        >
          {isVoiceEnabled
            ? '🎤 Stop Voice Chat'
            : '🎤 Click to start voice chat!'}
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.isUser ? 'text-primary-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type messages here"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
