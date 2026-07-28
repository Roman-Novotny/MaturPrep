import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Flame, Star, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import { ALL_TOPICS, CATEGORY_COLORS } from '../data/mathTopics.js';
import { useApp } from '../contexts/AppContext.jsx';

export default function Dashboard() {
  const { stats, progress, levelInfo } = useApp();
  const navigate = useNavigate();

  const availableTopics = useMemo(() => ALL_TOPICS.filter(t => !t.comingSoon), []);

  const { masteredCount, totalCount, notStarted } = useMemo(() => {
    let mastered = 0;
    const rest = [];
    for (const t of availableTopics) {
      const p = progress[t.id];
      const done = p?.learnedSections?.length === t.subtopics.length && t.subtopics.length > 0;
      if (done) mastered++;
      else rest.push(t);
    }
    return { masteredCount: mastered, totalCount: availableTopics.length, notStarted: rest };
  }, [progress, availableTopics]);

  const categories = useMemo(() => {
    const map = {};
    for (const t of availableTopics) {
      if (!map[t.category]) map[t.category] = [];
      map[t.category].push(t);
    }
    return map;
  }, [availableTopics]);

  const suggested = notStarted.length > 0 ? notStarted[Math.floor(Math.random() * notStarted.length)] : null;
  const overallPct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      <Header title="Přehled" subtitle="Tvůj postup přípravy na maturitu z matematiky" />

      <div className="flex-1 overflow-y-auto p-6 space-y-5 max-w-3xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-white light:text-slate-900 flex items-center gap-2"><GraduationCap size={16} className="text-blue-400" /> Celkový postup</h2>
            <span className="text-2xl font-bold text-white light:text-slate-900">{masteredCount}<span className="text-slate-500 light:text-slate-600 text-base">/{totalCount}</span></span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/10 light:bg-black/10 mb-2">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all" style={{ width: `${overallPct}%` }} />
          </div>
          <p className="text-xs text-slate-500 light:text-slate-600">{overallPct}% zavedených témat zvládnuto (odškrtaný celý checklist). Další témata postupně přibývají.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-2xl p-4 text-center">
            <Star size={18} className="mx-auto mb-1.5 text-yellow-400" />
            <p className="text-lg font-bold text-white light:text-slate-900">{levelInfo.current.level}</p>
            <p className="text-[10px] text-slate-500 light:text-slate-600">{levelInfo.current.title}</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Flame size={18} className="mx-auto mb-1.5 text-orange-400" />
            <p className="text-lg font-bold text-white light:text-slate-900">{stats.streak}</p>
            <p className="text-[10px] text-slate-500 light:text-slate-600">dní v řadě</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Calculator size={18} className="mx-auto mb-1.5 text-emerald-400" />
            <p className="text-lg font-bold text-white light:text-slate-900">{stats.totalWorkedExamples || 0}</p>
            <p className="text-[10px] text-slate-500 light:text-slate-600">vyřešených příkladů</p>
          </div>
        </div>

        {Object.entries(categories).map(([category, topics]) => {
          const color = CATEGORY_COLORS[category] || '#3b82f6';
          const done = topics.filter(t => progress[t.id]?.learnedSections?.length === t.subtopics.length && t.subtopics.length > 0).length;
          const pct = Math.round((done / topics.length) * 100);
          return (
            <div key={category} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white light:text-slate-900">{category}</p>
                <span className="text-xs text-slate-500 light:text-slate-600">{done}/{topics.length}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 light:bg-black/10">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          );
        })}

        {suggested && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-blue-500/20">
            <p className="text-[11px] text-blue-400 font-semibold uppercase mb-1.5">Doporučené další téma</p>
            <h3 className="text-white light:text-slate-900 font-semibold mb-3">#{suggested.number} {suggested.title}</h3>
            <button onClick={() => navigate(`/temata?topic=${suggested.id}`)} className="btn-primary text-sm flex items-center gap-1.5">
              Otevřít <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {totalCount > 0 && masteredCount === totalCount && (
          <div className="glass rounded-2xl p-6 text-center border border-emerald-500/30">
            <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-400" />
            <p className="text-white light:text-slate-900 font-semibold">Všechna zavedená témata zvládnuta! 🏆</p>
            <p className="text-slate-400 light:text-slate-500 text-sm mt-1">Teď už jen procvičuj příklady a kvízy pro jistotu, než přibudou další témata.</p>
          </div>
        )}
      </div>
    </div>
  );
}
