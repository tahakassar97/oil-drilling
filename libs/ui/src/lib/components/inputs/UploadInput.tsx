'use client';

import { FC, useRef, ChangeEvent } from 'react';
import { cn } from '../../utils';

interface UploadInputProps {
  onFileSelect?: (file: File) => void;
  onFilesSelect?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const UploadInput: FC<UploadInputProps> = ({
  onFileSelect,
  onFilesSelect,
  accept,
  multiple = false,
  disabled = false,
  className = '',
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (multiple && onFilesSelect) {
      onFilesSelect(files);
    } else if (onFileSelect && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn('flex items-center w-fit', className)}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white mx-1"
        >
          <path
            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 15L12 12L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children || 'Upload'}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
    </>
  );
};

export { UploadInput };
