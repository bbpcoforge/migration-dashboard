import React from 'react';

const MigrateNowButton: React.FC<{ onClick: () => void; disabled?: boolean }> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary flex items-center gap-2 text-lg shadow-lg px-8 py-3 mt-2"
    >
      <svg className="icon-md text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      Migrate to Sitecore
    </button>
  );
};

export default MigrateNowButton;