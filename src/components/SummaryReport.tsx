import React from 'react';

const SummaryReport: React.FC<{ summary: any }> = ({ summary }) => {
  return (
    <div className="dashboard-card mt-8 p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <svg className="icon-md text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        <h2 className="text-xl font-bold text-green-800">Migration Summary Report</h2>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
          <svg className="icon-md text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6m-6 0h6" /></svg>
          Migrated Content
        </h3>
        <div className="overflow-x-auto rounded-2xl shadow-lg mb-2" style={{background: 'var(--color-card)'}}>
          <table className="min-w-full text-xs rounded-2xl">
            <thead className="sticky top-0 z-10">
              <tr>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {summary?.migratedItems?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="whitespace-nowrap">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!summary?.migratedItems || summary.migratedItems.length === 0) && (
          <div className="text-gray-400 text-sm">No items migrated.</div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-1">
          <svg className="icon-md text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.415 1.415M5.636 5.636l1.414 1.414M17.657 17.657l1.415 1.415M12 8v4m0 4h.01" /></svg>
          Issues Encountered
        </h3>
        <ul className="list-disc ml-6 text-red-700">
          {summary?.errors?.length > 0 ? (
            summary.errors.map((error: any, index: number) => (
              <li key={index} className="error-message bg-red-50 border-red-200 text-red-700 mb-1 p-2 rounded flex items-center gap-2">
                <svg className="icon-md text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.415 1.415M5.636 5.636l1.414 1.414M17.657 17.657l1.415 1.415M12 8v4m0 4h.01" /></svg>
                {error}
              </li>
            ))
          ) : (
            <li className="text-green-700 bg-green-50 border border-green-200 rounded p-2 flex items-center gap-2">
              <svg className="icon-md text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              No issues encountered during migration.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SummaryReport;