import React from 'react';

const Sidebar: React.FC = () => (
  <aside className="hidden md:flex flex-col w-64 h-full" style={{background: 'var(--color-card)', borderRight: '1px solid #e5e7eb', boxShadow: '0 1px 4px 0 rgba(30, 64, 175, 0.04)'}}>
    <nav className="flex flex-col gap-6">
      <a href="#" className="flex items-center gap-3 font-medium transition rounded-lg px-3 py-2" style={{color: 'var(--color-text)'}}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
        Dashboard
      </a>
      <a href="#" className="flex items-center gap-3 font-medium transition rounded-lg px-3 py-2" style={{color: 'var(--color-text)'}}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
        Migrations
      </a>
      <a href="#" className="flex items-center gap-3 font-medium transition rounded-lg px-3 py-2" style={{color: 'var(--color-text)'}}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
        Reports
      </a>
      <a href="#" className="flex items-center gap-3 font-medium transition rounded-lg px-3 py-2" style={{color: 'var(--color-text)'}}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        Settings
      </a>
    </nav>
  </aside>
);

export default Sidebar;
