import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import { useApp } from '../contexts/AppContext.jsx';
import { ACHIEVEMENTS } from '../utils/storage.js';

export default function Stats() {
  const { stats } = useApp();
  const unlocked = stats.achievements || [];
  const maxXp = Math.max(...(stats.xpHistory || []).map(h => h.xp), 10);

  return (
    <div className="flex flex-col h-full">
      <Header title="Statistiky" subtitle={`${unlocked.length}/${ACHIEVEMENTS.length} achievementů`} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white light:text-slate-900 mb-4">XP za posledních 14 dní</h3>
          <div className="flex items-end gap-1.5 h-28">
            {(stats.xpHistory || []).slice(-14).map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-500" style={{ height: `${Math.max(4, (h.xp / maxXp) * 100)}%` }} title={`${h.date}: ${h.xp} XP`} />
              </div>
            ))}
            {(!stats.xpHistory || stats.xpHistory.length === 0) && (
              <p className="text-xs text-slate-600 light:text-slate-400 m-auto">Zatím žádná aktivita</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white light:text-slate-900">{stats.xp}</p>
            <p className="text-xs text-slate-500 light:text-slate-600">celkem XP</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white light:text-slate-900">{stats.totalQuizzes || 0}</p>
            <p className="text-xs text-slate-500 light:text-slate-600">dokončených kvízů</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white light:text-slate-900">{stats.totalWorkedExamples || 0}</p>
            <p className="text-xs text-slate-500 light:text-slate-600">vyřešených příkladů</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white light:text-slate-900 mb-3">Achievementy</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ACHIEVEMENTS.map(a => {
              const done = unlocked.includes(a.id);
              return (
                <motion.div key={a.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-2xl p-4 border ${done ? 'achievement-toast' : 'glass border-white/10 light:border-black/10 opacity-50'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{done ? a.icon : <Lock size={16} className="text-slate-600 light:text-slate-400" />}</span>
                    <p className="text-sm font-semibold text-white light:text-slate-900">{a.title}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 light:text-slate-600">{a.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
