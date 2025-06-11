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
  const [migrationProgress, setMigrationProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  
  
  // Store all selected row details across all pages
  const [allSelectedRows, setAllSelectedRows] = useState<{ [id: number]: any }>({});

  // Store all loaded rows by id (across all pages)
  const [allLoadedRows, setAllLoadedRows] = useState<{ [id: number]: any }>({});

  // When fetching data, add to allLoadedRows
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
      // Add loaded rows to allLoadedRows
      setAllLoadedRows((prev) => {
        const copy = { ...prev };
        json.forEach((row: any) => { copy[row.id] = row; });
        return copy;
      });
    } catch (err: any) {
      setError('Could not fetch data from the provided URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Update selectedRows and allSelectedRows when selecting/deselecting a row
  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        // Deselect
        setAllSelectedRows((old) => {
          const copy = { ...old };
          delete copy[id];
          return copy;
        });
        return prev.filter((rowId) => rowId !== id);
      } else {
        // Select
        setAllSelectedRows((old) => {
          const copy = { ...old };
          // Use allLoadedRows for details
          if (allLoadedRows[id]) copy[id] = allLoadedRows[id];
          return copy;
        });
        return [...prev, id];
      }
    });
  };

  // Select/deselect all rows on current page
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      // Deselect all on this page
      setSelectedRows([]);
      setAllSelectedRows((old) => {
        const copy = { ...old };
        data.forEach((row) => { delete copy[row.id]; });
        return copy;
      });
    } else {
      // Select all on this page
      setSelectedRows(data.map((row) => row.id));
      setAllSelectedRows((old) => {
        const copy = { ...old };
        data.forEach((row) => { if (allLoadedRows[row.id]) copy[row.id] = allLoadedRows[row.id]; });
        return copy;
      });
    }
  };
  
  // When page changes, update selectedRows to reflect only those on current page
  React.useEffect(() => {
    setSelectedRows(data.filter((row) => allSelectedRows[row.id]).map((row) => row.id));
  }, [data, allSelectedRows]);

  // Post all selected rows (from all pages) to Sitecore migration API
  const handleMigrate = async () => {
    setMigrationLoading(true);
    setMigrationResult(null);
    let progress = 0;
    try {
      const selectedData = Object.values(allSelectedRows);
      const siteName = sitecoreUrl || 'sihti';
      const apiUrl = 'http://sihti.ntldigital.com/api/siteitem/addscpage';
      let successCount = 0;
      for (let i = 0; i < selectedData.length; i++) {
        const row = selectedData[i];
        const body = JSON.stringify({
          Link: row.link,
          Content: row.content?.rendered || '',
          SiteName: siteName
        });
        try {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
          });
          if (res.ok) successCount++;
        } catch (e) {
          // continue to next
        }
        progress = Math.round(((i + 1) / selectedData.length) * 100);
        setMigrationProgress(progress);
      }
      if (successCount === selectedData.length) {
        setMigrationResult('Migration successful!');
      } else if (successCount > 0) {
        setMigrationResult('Some migrations failed.');
      } else {
        setMigrationResult('Migration failed. Please check the Sitecore API URL and try again.');
      }
    } catch (err) {
      setMigrationResult('Migration failed. Please check the Sitecore API URL and try again.');
    } finally {
      setMigrationLoading(false);
    }
  };

  return (
    <>
    <div className="">
      
      <div className="flex flex-row flex-wrap gap-8 mb-8 w-full max-w-6xl mx-auto justify-center">
        {/* Source System Card */}
        <div className="dashboard-card flex-1 min-w-[320px] max-w-[420px] flex flex-col items-center w-full sm:w-auto">
          <div className="section-title flex justify-center mb-6 text-lg font-semibold">Source System</div>
          <div className="flex flex-col gap-6 w-full items-center">
            <select value={selectedOption} onChange={handleChange}>
              <option key="default" value="">-- Select a source --</option>
              <option key="wp" value="WordPress">WordPress</option>
              <option key="sc" value="Sitecore">Sitecore</option>
              <option key="aem" value="AEM">Adobe Experience Manager</option>
              <option key="sf" value="Sitefinity">Sitefinity</option>
              <option key="drupal" value="Drupal">Drupal</option>
              <option key="joomla" value="Joomla">Joomla</option>
              <option key="umbraco" value="Umbraco">Umbraco</option>
              <option key="kentico" value="Kentico">Kentico</option>
              <option key="contentful" value="Contentful">Contentful</option>
              <option key="dotnet" value="DotNet">.Net</option>
              <option key="php" value="PHP">PHP</option>
            </select>
            <input
              type="text"
              placeholder={`Enter ${selectedOption} website URL (e.g. https://example.com)`}
              value={url}
              onChange={e => setUrl(e.target.value)}
              style={{ minWidth: 0, fontSize: '0.97rem', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }}
            />
            <button
              className="btn-primary px-3 py-2 rounded-lg w-full text-base font-semibold whitespace-nowrap transition disabled:opacity-60 disabled:cursor-not-allowed mb-2"
              onClick={() => fetchData(1)}
              disabled={loading || !url}
              style={{ minHeight: '44px', fontSize: '0.97rem' }}
            >
              {loading ? 'Loading...' : 'Fetch Pages'}
            </button>
            {error && <div className="text-red-600 mb-2 text-center w-full">{error}</div>}
          </div>
        </div>
        {/* Migrate System Card */}
        <div className="dashboard-card flex-1 min-w-[320px] max-w-[420px] flex flex-col items-center w-full sm:w-auto">
          <div className="section-title flex justify-center mb-6 text-lg font-semibold">Migrate to Sitecore</div>
          <div className="flex flex-col gap-6 w-full items-center">
            <input
              type="text"
              placeholder="Enter Sitecore Site Name (e.g. sihti)"
              value={sitecoreUrl}
              onChange={e => setSitecoreUrl(e.target.value)}
              style={{ minWidth: 0, fontSize: '0.97rem', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }}
            />
            <div className="flex flex-row gap-4 w-full items-center justify-center mb-2">
              <button
                className="btn-primary px-3 py-2 rounded-lg w-full text-base font-semibold whitespace-nowrap transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleMigrate}
                disabled={migrationLoading || !sitecoreUrl || Object.keys(allSelectedRows).length === 0}
                style={{ minHeight: '44px', fontSize: '0.97rem' }}
              >
                {migrationLoading ? 'Migrating...' : `Migrate ${Object.keys(allSelectedRows).length} Selected`}
              </button>
              <button
                className="btn-primary btn-danger px-3 py-2 rounded-lg w-full text-base font-semibold whitespace-nowrap transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={async () => {
                  if (!sitecoreUrl) return;
                  setMigrationLoading(true);
                  setMigrationResult(null);
                  try {
                    const apiUrl = `http://sihti.ntldigital.com/api/siteitem/deletescpage/${sitecoreUrl}`;
                    const res = await fetch(apiUrl, { method: 'DELETE' });
                    if (res.ok) {
                      setMigrationResult('Site deleted successfully!');
                    } else {
                      setMigrationResult('Failed to delete site.');
                    }
                  } catch (err) {
                    setMigrationResult('Failed to delete site.');
                  } finally {
                    setMigrationLoading(false);
                  }
                }}
                disabled={migrationLoading || !sitecoreUrl}
                style={{ minHeight: '44px', fontSize: '0.97rem', backgroundColor: '#e53e3e', color: 'white' }}
              >
                Delete Site
              </button>
            </div>
            {/* Progress Bar */}
            {migrationLoading && (
              <div className="w-full mt-2">
                <div className="progress-bar-container rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full transition-all duration-300"
                    style={{ width: `${migrationProgress}%` }}
                  ></div>
                </div>
                <div className="text-center text-xs mt-1 text-gray-600">{migrationProgress}%</div>
              </div>
            )}
            {migrationResult && <div className={`mt-2 text-center font-semibold w-full ${migrationResult.includes('successful') ? 'successful' : 'error'}`}>{migrationResult}</div>}
          </div>
        </div>
      </div>
      {/* Table below the cards */}
      {data.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <div className="bold-text text-gray-500 text-sm text-left my-[10px] mx-[5px] ">
            Total {totalItems} pages found, Showing page {currentPage} of {totalPages}
          </div>
          <div className="overflow-x-auto animate-fade-in mt-4">
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
        </div>
      )}
    </div>
    </>
  );
};

export default WordpressApiPreview;
