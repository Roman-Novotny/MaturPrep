import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Calculator, Target, GraduationCap, RotateCcw, Clock } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import { ALL_TOPICS } from '../data/mathTopics.js';
import { useApp } from '../contexts/AppContext.jsx';
import { MathText } from '../components/math/Formula.jsx';
import WorkedExample from '../components/practice/WorkedExample.jsx';
import QuestionRunner from '../components/practice/QuestionRunner.jsx';

function drawTopic(categoryFilter) {
  const pool = (categoryFilter === 'all' ? ALL_TOPICS : ALL_TOPICS.filter(t => t.category === categoryFilter)).filter(t => !t.comingSoon);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildMixQuestions(count) {
  const withQuiz = ALL_TOPICS.filter(t => t.quiz?.length > 0);
  const all = withQuiz.flatMap(t => t.quiz.map((q, qIndex) => ({ ...q, topicId: t.id, topicTitle: t.title, qIndex })));
  return [...all].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function Practice() {
  const { wrongQuestions } = useApp();
  const [mode, setMode] = useState('draw'); // 'draw' | 'mix' | 'wrong' | 'exam'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [drawn, setDrawn] = useState(null);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [examKey, setExamKey] = useState(0);
  const [activeWrongQuestions, setActiveWrongQuestions] = useState([]);

  const categories = ['all', ...new Set(ALL_TOPICS.map(t => t.category))];
  const poolEmpty = drawTopic(categoryFilter) === null;

  function draw() {
    setDrawn(drawTopic(categoryFilter));
  }

  const mixQuestions = useMemo(() => buildMixQuestions(10), [runKey]);
  const examQuestions = useMemo(() => buildMixQuestions(20), [examKey]);

  const wrongQuestionItems = useMemo(() => {
    return wrongQuestions
      .map(w => {
        const topic = ALL_TOPICS.find(t => t.id === w.topicId);
        const q = topic?.quiz?.[w.qIndex];
        if (!topic || !q) return null;
        return { ...q, topicId: topic.id, topicTitle: topic.title, qIndex: w.qIndex };
      })
      .filter(Boolean);
  }, [wrongQuestions]);

  const MODES = [
    { id: 'draw', label: 'Losování tématu', icon: GraduationCap },
    { id: 'mix', label: 'Mix kvíz (10 otázek)', icon: Target },
    { id: 'wrong', label: `Opakuj chyby (${wrongQuestionItems.length})`, icon: RotateCcw },
    { id: 'exam', label: 'Zkušební test načas', icon: Clock },
  ];

  return (
    <div className="flex flex-col h-full">
      <Header title="Procvičování" subtitle="Losování, mix kvíz, opakování chyb i zkušební test načas" />

      <div className="flex gap-2 px-6 pt-4 border-b border-white/[0.06] light:border-black/[0.08] pb-3 flex-wrap">
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${mode === m.id ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' : 'glass text-slate-400 light:text-slate-500'}`}>
            <m.icon size={15} /> {m.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {mode === 'draw' && (
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
        )}

        {mode === 'mix' && (
          <div className="max-w-lg mx-auto glass rounded-2xl p-10 text-center">
            <Target size={36} className="mx-auto mb-4 text-blue-400 opacity-60" />
            <p className="text-slate-400 light:text-slate-500 text-sm mb-5">10 náhodných otázek napříč všemi zpracovanými tématy.</p>
            <button onClick={() => setRunKey(k => k + 1)} className="btn-primary text-sm">Spustit mix kvíz</button>
          </div>
        )}

        {mode === 'wrong' && (
          <div className="max-w-lg mx-auto glass rounded-2xl p-10 text-center">
            <RotateCcw size={36} className="mx-auto mb-4 text-blue-400 opacity-60" />
            {wrongQuestionItems.length > 0 ? (
              <>
                <p className="text-slate-400 light:text-slate-500 text-sm mb-5">Máš {wrongQuestionItems.length} otázek, které ti dřív nevyšly. Zkus je znovu — po správné odpovědi zmizí ze seznamu.</p>
                <button onClick={() => { setActiveWrongQuestions(wrongQuestionItems); setRunKey(k => k + 1); }} className="btn-primary text-sm">Opakovat chyby</button>
              </>
            ) : (
              <p className="text-slate-400 light:text-slate-500 text-sm">Zatím tu nemáš žádné chyby k opakování — buď jsi vše zvládl/a napoprvé, nebo jsi ještě žádný kvíz nezkoušel/a. 🎉</p>
            )}
          </div>
        )}

        {mode === 'exam' && (
          <div className="max-w-lg mx-auto glass rounded-2xl p-10 text-center">
            <Clock size={36} className="mx-auto mb-4 text-blue-400 opacity-60" />
            <p className="text-slate-400 light:text-slate-500 text-sm mb-2">20 otázek napříč všemi tématy, 1 minuta na otázku (20 minut celkem).</p>
            <p className="text-slate-500 light:text-slate-600 text-xs mb-5">Bez okamžité zpětné vazby — jako u ostré maturity. Výsledek a rozbor chyb uvidíš na konci.</p>
            <button onClick={() => setExamKey(k => k + 1)} className="btn-primary text-sm">Spustit zkušební test</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {exampleOpen && drawn && <WorkedExample topic={drawn} onClose={() => setExampleOpen(false)} />}
        {mode === 'mix' && runKey > 0 && (
          <QuestionRunner key={`mix-${runKey}`} questions={mixQuestions} mode="instant" title="Mix kvíz" onClose={() => setRunKey(0)} />
        )}
        {mode === 'wrong' && runKey > 0 && (
          <QuestionRunner key={`wrong-${runKey}`} questions={activeWrongQuestions} mode="instant" title="Opakuj chyby" onClose={() => setRunKey(0)} />
        )}
        {mode === 'exam' && examKey > 0 && (
          <QuestionRunner key={`exam-${examKey}`} questions={examQuestions} mode="exam" timeLimitSec={examQuestions.length * 60} title="Zkušební test" onClose={() => setExamKey(0)} />
        )}
      </AnimatePresence>
    </div>
  );
}
