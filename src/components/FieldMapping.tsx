import React, { useState } from 'react';

interface FieldMappingProps {
  fields: string[];
  onMappingChange: (mapping: Record<string, string>) => void;
}

const sitecoreFields = ['Title', 'Body', 'Author', 'Date', 'Media'];

const FieldMapping: React.FC<FieldMappingProps> = ({ fields, onMappingChange }) => {
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const handleChange = (wpField: string, scField: string) => {
    const newMapping = { ...mapping, [wpField]: scField };
    setMapping(newMapping);
    onMappingChange(newMapping);
  };

  return (
    <div className="dashboard-card">
      <div className="section-title flex items-center gap-2">
        <svg className="icon-md text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
         3. Map WordPress Fields to Sitecore Fields
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-lg mb-2" style={{background: 'var(--color-card)'}}>
        <table className="min-w-full text-xs rounded-2xl">
          <thead className="sticky top-0 z-10">
            <tr>
              <th>WordPress Field</th>
              <th>Sitecore Field</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((wpField, i) => (
              <tr key={wpField}>
                <td className="whitespace-nowrap">{wpField}</td>
                <td>
                  <select
                    className="border rounded px-2 py-1 bg-white focus:ring-2 focus:ring-purple-400 text-sm shadow-sm"
                    style={{background: 'var(--color-card)', color: 'var(--color-text)'}}
                    value={mapping[wpField] || ''}
                    onChange={e => handleChange(wpField, e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {sitecoreFields.map(scField => (
                      <option key={scField} value={scField}>{scField}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldMapping;
