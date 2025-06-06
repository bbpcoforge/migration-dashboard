import React, { useState } from 'react';

interface WordpressApiPreviewProps {
  onDataFetched?: (data: any[]) => void;
}

const WordpressApiPreview: React.FC<WordpressApiPreviewProps> = ({ onDataFetched }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sitecoreUrl, setSitecoreUrl] = useState('');
  const [migrationLoading, setMigrationLoading] = useState(false);
  const [migrationResult, setMigrationResult] = useState<string | null>(null);

  const fetchData = async (pageNum = 1) => {
    setError('');
    setLoading(true);
    setData([]);
    try {
      const apiUrl = url.endsWith('/') ? `${url}wp-json/wp/v2/pages?page=${pageNum}` : `${url}/wp-json/wp/v2/pages?page=${pageNum}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Failed to fetch.');
      const json = await res.json();
      setData(json);
      setTotalPages(Number(res.headers.get('x-wp-totalpages')) || 1);
      setTotalItems(Number(res.headers.get('x-wp-total')) || json.length);
      setCurrentPage(pageNum);
      onDataFetched?.(json);
    } catch (err: any) {
      setError('Could not fetch data from the provided URL.');
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox selection
  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) setSelectedRows([]);
    else setSelectedRows(data.map((row) => row.id));
  };

  // Post selected rows to Sitecore migration API (parallel for each row)
  const handleMigrate = async () => {
    setMigrationLoading(true);
    setMigrationResult(null);
    try {
      const selectedData = data.filter((row) => selectedRows.includes(row.id));
      const siteName = sitecoreUrl || 'sihti';
      const apiUrl = 'https://sc104sc.dev.local/api/siteitem/addscpage';
      const results = await Promise.all(selectedData.map(async (row) => {
        const body = JSON.stringify({
          Link: row.link,
          Content: row.content?.rendered || '',
          SiteName: siteName
        });
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        });
        return res.ok;
      }));
      if (results.every(r => r)) {
        setMigrationResult('Migration successful!');
      } else {
        setMigrationResult('Some migrations failed.');
      }
    } catch (err: any) {
      setMigrationResult('Migration failed. Please check the Sitecore API URL and try again.');
    } finally {
      setMigrationLoading(false);
    }
  };

  return (
    <>
    <div className="dashboard-card mb-6">
      <div className="section-title flex justify-center mb-10">
        <div className="flex flex-row w-1/4 items-center">Import from WordPress API</div>
      </div>
      <div className="flex justify-center mb-10">
        <div className="flex flex-row gap-3 w-1/2 items-center">
          <input
            type="text"
            className="px-3 py-2 bg-white outline-none text-base text-gray-800 placeholder-gray-400 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 transition w-full"
            placeholder="Enter WordPress site URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            style={{ minWidth: 0, minHeight: '30px', marginRight: '8px', fontSize: '0.97rem', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }}
          />
          <button
            className="btn-primary px-3 py-2 rounded-lg h-full text-base font-semibold whitespace-nowrap transition disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => fetchData(1)}
            disabled={loading || !url}
            style={{ minHeight: '36px', fontSize: '0.97rem' }}
          >
            {loading ? 'Loading...' : 'Fetch Pages'}
          </button>
        </div>
      </div>
      {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
      {data.length > 0 && (
        <>
        <div className="bold-text text-gray-500 text-sm text-left my-[10px] mx-[5px] ">
          Total {totalItems} pages found, Showing page {currentPage} of {totalPages}
        </div>
        <div className="overflow-x-auto animate-fade-in mt-8">
          <table className="min-w-full border rounded-xl overflow-hidden">
            <thead>
              <tr>
                <th className="text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left">Page ID</th>
                <th className="text-left">Title</th>
                <th className="text-left">Slug</th>
                <th className="text-left">Page URL</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((page: any) => (
                <tr key={page.id} className={selectedRows.includes(page.id) ? 'bg-blue-50' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(page.id)}
                      onChange={() => handleSelectRow(page.id)}
                    />
                  </td>
                  <td>{page.id}</td>
                  <td>{page.title?.rendered || ''}</td>
                  <td>{page.slug}</td>
                  <td><a href={page.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{page.link}</a></td>
                  <td>{page.date ? new Date(page.date).toLocaleDateString('en-US') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6 gap-2" style={{ marginTop: '20px' }}>
            <button className="btn-pgn px-4 py-2 mx-[3px] rounded bg-gray-200" onClick={() => fetchData(currentPage - 1)} disabled={currentPage === 1 || loading}>&lt;</button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn-pgn px-4 py-2 mx-[3px] rounded ${currentPage === idx + 1 ? "bg-pink-700 text-white" : "bg-gray-200"}`}
              onClick={() => fetchData(idx + 1)}
              disabled={loading}
            >
              {idx + 1}
            </button>
          ))}
          <button className="btn-pgn px-4 py-2 mx-[3px] rounded bg-gray-200" onClick={() => fetchData(currentPage + 1)} disabled={currentPage === totalPages || loading}>&gt;</button>
        </div>
        {/* Sitecore Migration Card - only show if rows are selected */}
        {selectedRows.length > 0 && (
          <div className="dashboard-card mt-8 flex flex-col items-center">
            <div className="section-title flex items-center gap-2 mb-2">
                Migrate Selected Pages to Sitecore
            </div>
            <div className="flex flex-row gap-3 w-1/2 items-center justify-center">
              <input
                type="text"
                className="px-3 py-2 bg-white outline-none text-base text-gray-800 placeholder-gray-400 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 transition w-full"
                placeholder="Enter Sitecore Site Name (e.g. sihti)"
                value={sitecoreUrl}
                onChange={e => setSitecoreUrl(e.target.value)}
                style={{ minWidth: 0, minHeight: '30px', marginRight: '8px', fontSize: '0.97rem', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }}
              />
              <button
                className="btn-primary px-3 py-2 rounded-lg h-full text-base font-semibold whitespace-nowrap transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleMigrate}
                disabled={migrationLoading || !sitecoreUrl || selectedRows.length === 0}
                style={{ minHeight: '36px', fontSize: '0.97rem' }}
              >
                {migrationLoading ? 'Migrating...' : `Migrate ${selectedRows.length} Selected`}
              </button>
            </div>
          </div>
        )}
        {migrationResult && <div className={`mt-2 text-center font-semibold ${migrationResult.includes('successful') ? 'successful' : 'error'}`}>{migrationResult}</div>}
       
        </>
      )}
    </div>
    </>
  );
};

export default WordpressApiPreview;
