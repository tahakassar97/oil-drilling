/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useState } from 'react';

import { Button, UploadInput, useToast } from '@oil-drilling/ui';
import { wellList } from './utils';
import DrillingCharts from './components/DrillingCharts';
import Chatbot from './components/Chatbot';

interface Well {
  id: string;
  name: string;
  depth: number;
  status: 'active' | 'inactive' | 'maintenance';
}

const Dashboard: FC = () => {
  const { successNotify, errorNotify } = useToast();
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    setFile(file);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        errorNotify('Upload failed');
        return;
      }

      const data = await res.json();

      if (res.ok) {
        successNotify('File uploaded and processed successfully.');
        if (data.processedData && data.processedData.length > 0) {
          const transformedData = data.processedData.map((item: any) => ({
            depth: item.DEPTH || item.depth,
            SH: (item['%SH'] !== undefined ? item['%SH'] : item.SH) || 0,
            SS: (item['%SS'] !== undefined ? item['%SS'] : item.SS) || 0,
            LS: (item['%LS'] !== undefined ? item['%LS'] : item.LS) || 0,
            DOL: (item['%DOL'] !== undefined ? item['%DOL'] : item.DOL) || 0,
            ANH: (item['%ANH'] !== undefined ? item['%ANH'] : item.ANH) || 0,
            Coal:
              (item['%Coal'] !== undefined ? item['%Coal'] : item.Coal) || 0,
            Salt:
              (item['%Salt'] !== undefined ? item['%Salt'] : item.Salt) || 0,
            DT: item.DT || 0,
            GR: item.GR || 0,
            MINFINAL: item.MINFINAL || 1,
            UCS: item.UCS || 0,
            FA: item.FA || 0,
            RAT: item.RAT || 1,
            ROP: item.ROP || 0,
          }));
          setUploadedData(transformedData);
        }
      } else {
        errorNotify('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch {
      errorNotify('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleWellSelect = (well: Well) => {
    setSelectedWell(well);
  };

  return (
    <main className="h-[calc(100vh-64px)]">
      <header className="flex bg-white backdrop-blur-lg shadow-sm h-[64px] fixed top-0 left-0 right-0  items-center gap-4 p-4 border-b border-gray-300">
        <h2 className="font-bold text-2xl">Drill AI Intelligence Platform</h2>
      </header>

      <div className="flex flex-col lg:flex-row gap-3 pt-[64px] h-[calc(100vh-64px)]">
        <aside className="w-full lg:w-64 h-auto lg:h-[calc(100vh-64px)] border-r border-gray-300 bg-white shadow-sm">
          <div className="flex w-full items-center justify-between p-4 border-b border-gray-300">
            <h4 className="text-lg font-bold">Well List</h4>
            <Button
              variant="link"
              className="flex items-center justify-center bg-gray-200 h-6 px-1 rounded-md hover:bg-gray-300"
            >
              {'<'}
            </Button>
          </div>

          <div className="overflow-y-auto h-64 lg:h-[calc(100vh-120px)]">
            <ul className="px-2">
              {wellList.map((well, index) => (
                <li
                  key={well.name}
                  className={`flex flex-col justify-between p-3 m-2 rounded-lg cursor-pointer transition-colors ${
                    selectedWell?.name === well.name
                      ? 'bg-primary-100 border border-primary-500'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() =>
                    handleWellSelect({
                      id: `well-${index}`,
                      name: well.name,
                      depth: well.depth,
                      status: 'active',
                    })
                  }
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm">{well.name}</p>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedWell?.name === well.name
                          ? 'bg-primary-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  </div>
                  <small className="text-gray-500 text-xs">
                    Depth: {well.depth} ft
                  </small>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Main Content Area */}
          <section className="flex-1">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 py-3 border-b border-gray-200 gap-4">
              <div className="flex items-center space-x-6">
                <ul className="flex flex-wrap space-x-4">
                  <li className="p-2 border-b-2 border-primary-500 text-primary-500">
                    <p className="text-sm font-semibold">Drilling Monitoring</p>
                  </li>
                  <li className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <p className="text-sm font-semibold">Offset Wells Map</p>
                  </li>
                  <li className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <p className="text-sm font-semibold">Bit Summary</p>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-xs rounded-md"
                  size="default"
                >
                  Filter
                </Button>

                <UploadInput
                  onFileSelect={handleUpload}
                  disabled={isUploading}
                  className="bg-primary-500 hover:bg-primary-600 rounded-md text-white py-2 px-4 gap-2 text-xs"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </UploadInput>
              </div>
            </div>

            {/* Charts Area */}
            <div className="h-[600px] overflow-y-auto">
              <DrillingCharts data={uploadedData} />
            </div>
          </section>

          {/* Chatbot Sidebar */}
          <aside className="w-full lg:w-80 h-96 lg:h-[calc(100vh-64px)] border-l border-gray-200 shadow-sm">
            <Chatbot
              selectedWell={selectedWell?.name}
              drillingData={uploadedData}
              file={file as File}
            />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
