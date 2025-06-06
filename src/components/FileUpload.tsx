import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onFileParsed: (data: any, fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileParsed }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'csv' && ext !== 'xml') {
      setError('Only CSV or XML files are supported.');
      return;
    }
    try {
      const text = await file.text();
      let parsed;
      if (ext === 'csv') {
        // Simple CSV parse (for demo)
        const [header, ...rows] = text.split('\n').map(l => l.split(','));
        parsed = rows.map(row => Object.fromEntries(header.map((h, i) => [h, row[i]])));
      } else {
        // Simple XML parse (for demo)
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        parsed = xml;
      }
      onFileParsed(parsed, file.name);
    } catch (err) {
      setError('Failed to parse file.');
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileInputRef.current!.files = e.dataTransfer.files;
      handleFileChange({ target: { files: e.dataTransfer.files } } as any);
    }
  };

  return (
    <>
      
      <div className="dashboard-card">
        <div className="section-title flex items-center gap-2">
          <svg className="icon-md text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5-5 5 5M12 5v12" /></svg>
          1. Upload WordPress Export File (CSV/XML)
        </div>
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 mb-2 transition ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-blue-200 bg-blue-100'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <svg className="icon-md text-blue-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16v-4a4 4 0 0 1 8 0v4M5 20h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z" /></svg>
          <span className="text-blue-700 font-medium">Drag & drop your file here, or <span className="underline">browse</span></span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xml"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {fileName && <div className="text-sm text-green-700 flex items-center gap-1"><svg className="icon-md text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Selected: {fileName}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
};

export default FileUpload;
