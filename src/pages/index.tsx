import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Preview from '../components/Preview';
import FieldMapping from '../components/FieldMapping';
import MigrateNowButton from '../components/MigrateNowButton';
import ProgressIndicator from '../components/ProgressIndicator';
import StatusUpdates from '../components/StatusUpdates';
import ErrorHandler from '../components/ErrorHandler';
import SummaryReport from '../components/SummaryReport';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [fileData, setFileData] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [migrationInProgress, setMigrationInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<any>(null);

  const handleFileParsed = (data: any, name: string) => {
    setFileData(data);
    setFileName(name);
    setMapping({});
    setSummary(null);
    setError(null);
  };

  const handleMappingChange = (map: Record<string, string>) => {
    setMapping(map);
  };

  const handleMigrationStart = async () => {
    setMigrationInProgress(true);
    setStatus('Migration started...');
    setError(null);
    setSummary(null);
    setProgress(0);
    try {
      for (let i = 1; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(res => setTimeout(res, 80));
      }
      // Simulate API call
      setStatus('Migration completed successfully.');
      setSummary({ migratedItems: ['Item 1', 'Item 2'], errors: [] });
    } catch (err) {
      setError('Migration failed.');
      setStatus('Migration failed.');
    } finally {
      setMigrationInProgress(false);
      setProgress(100);
    }
  };

  // Extract fields for mapping (CSV only for demo)
  const fields = Array.isArray(fileData) && fileData.length > 0 ? Object.keys(fileData[0]) : [];

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-2">
        <div className="w-full max-w-3xl">
          <FileUpload onFileParsed={handleFileParsed} />
          <Preview data={fileData} fileName={fileName} />
          {fields.length > 0 && (
            <FieldMapping fields={fields} onMappingChange={handleMappingChange} />
          )}
          {fields.length > 0 && (
            <div className="dashboard-card flex flex-col gap-4 items-center">
              <MigrateNowButton onClick={handleMigrationStart} disabled={migrationInProgress} />
              {migrationInProgress && <ProgressIndicator progress={progress} />}
              <StatusUpdates status={status} />
              <ErrorHandler error={error} />
              {summary && <SummaryReport summary={summary} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;