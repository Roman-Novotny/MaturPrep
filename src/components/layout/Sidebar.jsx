import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ScrollText, Layers, Calculator, BarChart2,
  Flame, Star, ChevronLeft, ChevronRight, GraduationCap, Zap, Sigma,
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';

const NAV_ITEMS = [
  { to: '/',          icon: LayoutDashboard, label: 'Přehled',       color: '#3b82f6' },
  { to: '/temata',     icon: ScrollText,      label: 'Témata',        color: '#f59e0b' },
  { to: '/karticky',   icon: Layers,          label: 'Kartičky',      color: '#ec4899' },
  { to: '/procvicovani', icon: Calculator,    label: 'Procvičování',  color: '#10b981' },
  { to: '/vzorce',     icon: Sigma,           label: 'Vzorce',        color: '#06b6d4' },
  { to: '/statistiky', icon: BarChart2,       label: 'Statistiky',    color: '#a855f7' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { stats, levelInfo } = useApp();
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen glass-dark border-r border-white/[0.06] light:border-black/[0.08] shrink-0 z-10"
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06] light:border-black/[0.08]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0 glow-sm">
          <GraduationCap size={18} className="text-white light:text-slate-900" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }}>
              <div className="font-bold text-white light:text-slate-900 text-sm leading-tight">MaturPrep</div>
              <div className="text-[10px] text-blue-400 font-medium">Matematika k maturitě</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label, color }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <NavLink key={to} to={to} end={to === '/'}>
              <motion.div whileHover={{ x: 2 }} className={`nav-item ${isActive ? 'active' : ''}`} title={collapsed ? label : undefined}>
                <Icon size={17} style={{ color: isActive ? color : undefined }} className="shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="truncate text-[13px]">
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.06] light:border-black/[0.08] p-3">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              <div className="glass rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Star size={13} className="text-yellow-400" />
                    <span className="text-[11px] font-semibold text-white light:text-slate-900">{levelInfo.current.title}</span>
                  </div>
                  <span className="text-[10px] text-blue-400 font-bold">Lv.{levelInfo.current.level}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 light:bg-black/10">
                  <motion.div className="xp-bar h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${levelInfo.progress}%` }} transition={{ duration: 0.8 }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-500 light:text-slate-600">{stats.xp} XP</span>
                  {levelInfo.next && <span className="text-[10px] text-slate-500 light:text-slate-600">{levelInfo.next.xpRequired} XP</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 px-1">
                <div className="flex items-center gap-1">
                  <Flame size={13} className="text-orange-400" />
                  <span className="text-[11px] text-orange-300 font-semibold">{stats.streak}d streak</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Zap size={12} className="text-yellow-400" />
                  <span className="text-[11px] text-yellow-300">{stats.achievements?.length || 0} ach.</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
              <div className="text-[10px] font-bold text-blue-400">{levelInfo.current.level}</div>
              <Flame size={14} className="text-orange-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full glass border border-white/10 light:border-black/10 flex items-center justify-center text-slate-400 light:text-slate-500 hover:text-white light:text-slate-900 hover:border-blue-500/50 transition-all z-20"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}
