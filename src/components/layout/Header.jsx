import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';

export default function Header({ title, subtitle, children }) {
  const { theme, toggleTheme } = useApp();
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] light:border-black/[0.08] shrink-0">
      <div>
        <h1 className="text-lg font-bold text-white light:text-slate-900">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 light:text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {children}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
          className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 light:text-slate-500 hover:text-white light:hover:text-slate-900 hover:border-blue-500/50 transition-all shrink-0"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </div>
  );
}
