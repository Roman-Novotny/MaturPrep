import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Calculator, Target, GraduationCap, Check, X } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import { ALL_TOPICS } from '../data/mathTopics.js';
import { useApp } from '../contexts/AppContext.jsx';
import { MathText } from '../components/math/Formula.jsx';
import WorkedExample from '../components/practice/WorkedExample.jsx';

function drawTopic(categoryFilter) {
  const pool = (categoryFilter === 'all' ? ALL_TOPICS : ALL_TOPICS.filter(t => t.category === categoryFilter)).filter(t => !t.comingSoon);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function MixedQuiz({ onClose }) {
  const { recordQuizResult } = useApp();
  const [questions] = useState(() => {
    const withQuiz = ALL_TOPICS.filter(t => t.quiz?.length > 0);
    const all = withQuiz.flatMap(t => t.quiz.map(q => ({ ...q, topicId: t.id, topicTitle: t.title })));
    return [...all].sort(() => Math.random() - 0.5).slice(0, 10);
  });
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 max-w-sm mx-auto text-center">
        <p className="text-slate-300 light:text-slate-600 text-sm mb-4">Zatím není dost otázek pro mix kvíz.</p>
        <button onClick={onClose} className="btn-primary w-full text-sm">Zpět</button>
      </div>
    );
  }

  const q = questions[idx];

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctIndex) setCorrect(c => c + 1);
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(p => p + 1);
      setSelected(null);
    } else {
      const byTopic = {};
      questions.forEach(qq => { byTopic[qq.topicId] = (byTopic[qq.topicId] || 0) + 1; });
      Object.keys(byTopic).forEach(tid => recordQuizResult(tid, correct, questions.length));
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="glass rounded-2xl p-6 max-w-sm mx-auto text-center">
        <p className="text-3xl font-bold text-white light:text-slate-900 mb-2">{correct}/{questions.length}</p>
        <p className="text-slate-400 light:text-slate-500 text-sm mb-5">Mix kvíz dokončen</p>
        <button onClick={onClose} className="btn-primary w-full text-sm">Zpět</button>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-2 text-xs text-slate-500 light:text-slate-600">
        <span>{idx + 1} / {questions.length} · {q.topicTitle}</span>
        <span className="text-emerald-400">{correct} ✓</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 light:bg-black/5 rounded-full mb-5">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>
      <p className="text-white light:text-slate-900 text-sm font-medium mb-4 leading-relaxed"><MathText text={q.question} /></p>
      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isPicked = i === selected;
          let cls = 'glass border-white/10 light:border-black/10 text-slate-300 light:text-slate-600 hover:border-blue-500/30';
          if (selected !== null) {
            if (isCorrect) cls = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
            else if (isPicked) cls = 'border-red-500/40 bg-red-500/10 text-red-300';
            else cls = 'glass border-white/5 light:border-black/5 text-slate-500 light:text-slate-600';
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={selected !== null} className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all flex items-center justify-between ${cls}`}>
              <span><MathText text={opt} /></span>
              {selected !== null && isCorrect && <Check size={14} className="text-emerald-400 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>
      {selected !== null && <button onClick={next} className="btn-primary w-full text-sm">{idx < questions.length - 1 ? 'Další otázka' : 'Zobrazit výsledek'}</button>}
    </div>
  );
}

export default function Practice() {
  const [mode, setMode] = useState('draw'); // 'draw' | 'mix'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [drawn, setDrawn] = useState(null);
  const [exampleOpen, setExampleOpen] = useState(false);

  const categories = ['all', ...new Set(ALL_TOPICS.map(t => t.category))];
  const poolEmpty = drawTopic(categoryFilter) === null;

  function draw() {
    setDrawn(drawTopic(categoryFilter));
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Procvičování" subtitle="Vylosuj si téma a řeš příklad krok za krokem, nebo si dej rychlý mix kvíz" />

      <div className="flex gap-2 px-6 pt-4 border-b border-white/[0.06] light:border-black/[0.08] pb-3">
        <button onClick={() => setMode('draw')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${mode === 'draw' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' : 'glass text-slate-400 light:text-slate-500'}`}>
          <GraduationCap size={15} /> Losování tématu
        </button>
        <button onClick={() => setMode('mix')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${mode === 'mix' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' : 'glass text-slate-400 light:text-slate-500'}`}>
          <Target size={15} /> Mix kvíz (10 otázek)
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {mode === 'draw' ? (
          <div className="max-w-lg mx-auto">
            <div className="flex gap-1.5 mb-4 justify-center flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${categoryFilter === c ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' : 'glass text-slate-400 light:text-slate-500'}`}>
                  {c === 'all' ? 'Vše' : c}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!drawn ? (
                <motion.div key="predraw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass rounded-2xl p-10 text-center">
                  <Shuffle size={36} className="mx-auto mb-4 text-blue-400 opacity-60" />
                  <p className="text-slate-400 light:text-slate-500 text-sm mb-5">Vylosuj si náhodné téma ze zpracovaných a zkus vyřešit příklad.</p>
                  <button onClick={draw} className="btn-primary text-sm">Vylosovat téma</button>
                </motion.div>
              ) : (
                <motion.div key={drawn.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-6 text-center">
                  <p className="text-[11px] text-slate-500 light:text-slate-600 uppercase font-semibold mb-2">{drawn.category} · Téma č. {drawn.number}</p>
                  <h2 className="text-lg font-bold text-white light:text-slate-900 mb-4">{drawn.title}</h2>
                  {drawn.summary && <p className="text-sm text-slate-400 light:text-slate-500 mb-5"><MathText text={drawn.summary} /></p>}
                  <div className="flex gap-2 justify-center flex-wrap">
                    {drawn.workedExamples?.length > 0 && (
                      <button onClick={() => setExampleOpen(true)} className="btn-primary text-sm flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg,#059669,#10b981)' }}>
                        <Calculator size={14} /> Řešit příklad
                      </button>
                    )}
                    <button onClick={draw} className="btn-ghost text-sm flex items-center gap-1.5"><Shuffle size={13} /> Losovat znovu</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {poolEmpty && drawn === null && (
              <p className="text-center text-xs text-amber-400/80 mt-4">V této kategorii zatím není zpracované téma.</p>
            )}
          </div>
        ) : (
          <MixedQuiz onClose={() => setMode('draw')} />
        )}
      </div>

      <AnimatePresence>
        {exampleOpen && drawn && <WorkedExample topic={drawn} onClose={() => setExampleOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
