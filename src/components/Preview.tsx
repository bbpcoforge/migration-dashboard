import React from 'react';

interface PreviewProps {
  data: any;
  fileName: string;
}

const Preview: React.FC<PreviewProps> = ({ data, fileName }) => {
  if (!data) return null;
  if (typeof data === 'object' && data.documentElement) {
    // XML preview
    return (
      <div className="dashboard-card" style={{background: 'var(--color-card)', color: 'var(--color-text)'}}>
        <div className="section-title flex items-center gap-2" style={{color: 'var(--color-primary)'}}>
          <svg className="icon-md" style={{color: 'var(--color-primary)'}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect width="8" height="4" x="8" y="2" rx="1" /></svg>
          2. Preview XML Content ({fileName})
        </div>
        <pre className="overflow-x-auto text-xs p-2 rounded border max-h-64" style={{background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid #e5e7eb'}}>{new XMLSerializer().serializeToString(data)}</pre>
      </div>
    );
  }
  // CSV preview
  return (
    <div className="dashboard-card" style={{background: 'var(--color-card)', color: 'var(--color-text)'}}>
      <div className="section-title flex items-center gap-2" style={{color: 'var(--color-primary)'}}>
        <svg className="icon-md" style={{color: 'var(--color-primary)'}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6m-6 0h6" /></svg>
        2. Preview CSV Content ({fileName})
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-lg mb-2">
        <table className="min-w-full text-xs rounded-2xl">
          <thead className="sticky top-0 z-10">
            <tr>
              {Object.keys(data[0] || {}).map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row: any, i: number) => (
              <tr key={i}>
                {Object.values(row).map((v, j) => (
                  <td key={j} className="whitespace-nowrap">{String(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 10 && <div className="text-xs mt-1" style={{color: 'var(--color-secondary)'}}>Showing first 10 rows</div>}
      </div>
    </div>
  );
};

export default Preview;
