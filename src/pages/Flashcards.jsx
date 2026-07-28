import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Check, X, Play, RotateCcw, Shuffle } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import { ALL_TOPICS } from '../data/mathTopics.js';
import { useApp } from '../contexts/AppContext.jsx';
import { MathText } from '../components/math/Formula.jsx';

export default function Flashcards() {
  const { addXP } = useApp();
  const [scope, setScope] = useState('all'); // 'all' | category | topicId
  const [phase, setPhase] = useState('setup'); // setup | study | done
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState({ known: 0, unknown: 0 });

  const topicsWithCards = useMemo(() => ALL_TOPICS.filter(t => t.flashcards?.length > 0), []);
  const categories = useMemo(() => [...new Set(topicsWithCards.map(t => t.category))], [topicsWithCards]);

  function buildDeck() {
    let source = topicsWithCards;
    if (scope !== 'all' && categories.includes(scope)) source = source.filter(t => t.category === scope);
    else if (scope !== 'all' && !categories.includes(scope)) source = source.filter(t => t.id === scope);

    const cards = source.flatMap(t => t.flashcards.map(c => ({ ...c, topic: t.title })));
    if (cards.length === 0) return;
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setIdx(0);
    setFlipped(false);
    setResults({ known: 0, unknown: 0 });
    setPhase('study');
  }

  function mark(known) {
    const newResults = { known: results.known + (known ? 1 : 0), unknown: results.unknown + (known ? 0 : 1) };
    setResults(newResults);
    if (known) addXP(2);

    if (idx < deck.length - 1) {
      setIdx(p => p + 1);
      setFlipped(false);
    } else {
      addXP(15);
      setPhase('done');
    }
  }

  const current = deck[idx];
  const progressPct = deck.length ? Math.round((idx / deck.length) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      <Header title="Kartičky" subtitle={`${topicsWithCards.reduce((n, t) => n + t.flashcards.length, 0)} kartiček z ${topicsWithCards.length} témat`}>
        {phase === 'study' && (
          <button onClick={() => setPhase('setup')} className="btn-ghost text-xs flex items-center gap-1.5"><X size={13} /> Ukončit</button>
        )}
      </Header>

      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto">
              <div className="glass rounded-2xl p-5 border border-white/10 light:border-black/10">
                <h3 className="font-semibold text-white light:text-slate-900 text-sm mb-4 flex items-center gap-2"><Layers size={14} className="text-blue-400" /> Vyber okruh kartiček</h3>
                <div className="space-y-2 mb-4">
                  <button onClick={() => setScope('all')} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${scope === 'all' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' : 'glass text-slate-400 light:text-slate-500 hover:text-slate-200 light:text-slate-700'}`}>
                    Vše ({topicsWithCards.reduce((n, t) => n + t.flashcards.length, 0)} kartiček)
                  </button>
                  {categories.map(c => (
                    <button key={c} onClick={() => setScope(c)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${scope === c ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' : 'glass text-slate-400 light:text-slate-500 hover:text-slate-200 light:text-slate-700'}`}>
                      {c}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 light:text-slate-600 mb-2">Nebo konkrétní téma:</p>
                <select value={scope} onChange={e => setScope(e.target.value)} className="ai-input w-full px-3 py-2 text-sm mb-4">
                  <option value="all">— vyber téma —</option>
                  {topicsWithCards.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
                <button onClick={buildDeck} className="btn-primary w-full text-sm flex items-center justify-center gap-2"><Play size={14} /> Spustit</button>
                {topicsWithCards.length === 0 && (
                  <p className="text-xs text-amber-400/80 mt-3">Zatím nejsou u žádného tématu připravené kartičky.</p>
                )}
              </div>
            </motion.div>
          )}

          {phase === 'study' && current && (
            <motion.div key="study" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-500 light:text-slate-600">
                <span>{idx + 1} / {deck.length}</span>
                <span className="text-blue-400">{current.topic}</span>
                <span className="text-emerald-400">{results.known} ✓</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 light:bg-black/5 rounded-full mb-6">
                <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
              </div>

              <div className={`flip-card w-full cursor-pointer mb-6 ${flipped ? 'flipped' : ''}`} style={{ height: '220px' }} onClick={() => setFlipped(p => !p)}>
                <div className="flip-card-inner w-full h-full" style={{ position: 'relative' }}>
                  <div className="flip-card-front glass rounded-2xl border border-white/10 light:border-black/10 p-8 flex flex-col items-center justify-center" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <p className="text-[10px] text-slate-600 light:text-slate-400 mb-3 uppercase tracking-wider">Pojem / vzorec</p>
                    <p className="text-white light:text-slate-900 text-center font-semibold text-base leading-relaxed"><MathText text={current.front} /></p>
                    <p className="text-slate-700 light:text-slate-300 text-[10px] mt-4">Klikni pro odpověď</p>
                  </div>
                  <div className="flip-card-back glass rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 flex flex-col items-center justify-center" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <p className="text-[10px] text-blue-400 mb-3 uppercase tracking-wider">Odpověď</p>
                    <p className="text-white light:text-slate-900 text-center text-base leading-relaxed"><MathText text={current.back} /></p>
                  </div>
                </div>
              </div>

              {flipped && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <button onClick={() => mark(false)} className="flex-1 py-3 rounded-xl border border-red-500/25 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 font-medium text-sm">
                    <X size={16} /> Nevím
                  </button>
                  <button onClick={() => mark(true)} className="flex-1 py-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2 font-medium text-sm">
                    <Check size={16} /> Znám
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto text-center py-16">
              <p className="text-3xl font-bold text-white light:text-slate-900 mb-2">{results.known}/{deck.length}</p>
              <p className="text-slate-400 light:text-slate-500 text-sm mb-6">Kartičky dokončeny (+15 XP)</p>
              <div className="flex gap-2 justify-center">
                <button onClick={buildDeck} className="btn-ghost text-sm flex items-center gap-1.5"><Shuffle size={13} /> Znovu (zamíchat)</button>
                <button onClick={() => setPhase('setup')} className="btn-primary text-sm flex items-center gap-1.5"><RotateCcw size={13} /> Jiný okruh</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
