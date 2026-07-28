import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, BookOpen, ChevronRight, CheckCircle2, Circle,
  Tag, GraduationCap, Sigma, Target, Calculator, Layers, Clock,
} from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import { ALL_TOPICS, CATEGORY_COLORS } from '../data/mathTopics.js';
import { useApp } from '../contexts/AppContext.jsx';
import { Formula, MathText } from '../components/math/Formula.jsx';
import TopicQuiz from '../components/practice/TopicQuiz.jsx';
import FormulaFlashcards from '../components/practice/FormulaFlashcards.jsx';
import WorkedExample from '../components/practice/WorkedExample.jsx';

const DIFF_COLORS = { easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444' };
const DIFF_LABELS = { easy: 'Lehké', medium: 'Střední', hard: 'Těžké' };

function DiffBadge({ diff }) {
  const color = DIFF_COLORS[diff];
  return (
    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full border"
      style={{ color, borderColor: color + '50', background: color + '15' }}>
      {DIFF_LABELS[diff]}
    </span>
  );
}

export default function Topics({ initialTopicId }) {
  const { progress, toggleSectionLearned } = useApp();
  const [selectedTopic, setSelectedTopic] = useState(() => ALL_TOPICS.find(t => t.id === initialTopicId) || null);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Vše');
  const [quizOpen, setQuizOpen] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);

  const categories = ['Vše', ...new Set(ALL_TOPICS.map(t => t.category))];

  const filtered = ALL_TOPICS.filter(t => {
    const matchCat = catFilter === 'Vše' || t.category === catFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.title.toLowerCase().includes(q) || t.terms.some(term => term.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  function selectTopic(t) {
    setSelectedTopic(t);
  }

  const color = selectedTopic ? (CATEGORY_COLORS[selectedTopic.category] || '#3b82f6') : '#3b82f6';
  const topicProgress = selectedTopic ? (progress[selectedTopic.id] || { learnedSections: [] }) : null;
  const learnedCount = topicProgress?.learnedSections?.length || 0;
  const total = selectedTopic?.subtopics.length || 0;

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Maturitní témata"
        subtitle={`${ALL_TOPICS.length} témat · ${ALL_TOPICS.filter(t => !t.comingSoon).length} zpracováno, zbytek postupně přibývá`}
      />

      <div className="flex gap-1.5 px-6 pt-4 border-b border-white/[0.06] light:border-black/[0.08] pb-3 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${catFilter === c ? 'text-white light:text-slate-900' : 'glass text-slate-400 light:text-slate-500'}`}
            style={catFilter === c ? { background: (CATEGORY_COLORS[c] || '#3b82f6') + '25', color: CATEGORY_COLORS[c] || '#3b82f6', border: `1px solid ${(CATEGORY_COLORS[c] || '#3b82f6')}50` } : {}}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 shrink-0 flex flex-col border-r border-white/[0.06] light:border-black/[0.08] overflow-hidden">
          <div className="p-3 space-y-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 light:text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Hledat téma nebo pojem..." className="ai-input w-full pl-8 pr-3 py-2 text-xs" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
            {filtered.map(topic => {
              const isSelected = selectedTopic?.id === topic.id;
              const topicColor = CATEGORY_COLORS[topic.category] || '#3b82f6';
              const p = progress[topic.id];
              const done = p?.learnedSections?.length || 0;
              const pct = topic.subtopics.length > 0 ? Math.round(done / topic.subtopics.length * 100) : 0;
              return (
                <motion.button
                  key={topic.id}
                  onClick={() => selectTopic(topic)}
                  whileHover={{ x: 2 }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all border ${isSelected ? 'border-opacity-60' : 'border-transparent hover:border-white/10 light:border-black/10'}`}
                  style={isSelected ? { background: topicColor + '18', borderColor: topicColor + '50' } : { background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold mt-0.5 shrink-0" style={{ color: topicColor + 'aa' }}>#{topic.number}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium leading-tight ${isSelected ? 'text-white light:text-slate-900' : 'text-slate-300 light:text-slate-600'}`}>{topic.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {topic.comingSoon ? (
                          <span className="text-[9px] text-slate-500 light:text-slate-500 flex items-center gap-0.5"><Clock size={8} /> připravuje se</span>
                        ) : (
                          <>
                            <DiffBadge diff={topic.difficulty} />
                            {pct === 100 && <CheckCircle2 size={10} className="text-emerald-400" />}
                          </>
                        )}
                      </div>
                      {pct > 0 && (
                        <div className="mt-1.5">
                          <div className="w-full h-1 rounded-full bg-white/10 light:bg-black/10">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: topicColor }} />
                          </div>
                        </div>
                      )}
                    </div>
                    {isSelected && <ChevronRight size={12} style={{ color: topicColor }} className="shrink-0 mt-0.5" />}
                  </div>
                </motion.button>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-slate-600 light:text-slate-400">
                <BookOpen size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs">Nic nenalezeno</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!selectedTopic ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-4 text-slate-600 light:text-slate-400">
                <GraduationCap size={48} className="opacity-20" />
                <p className="text-sm">Vyber téma ze seznamu vlevo</p>
                <p className="text-xs text-slate-700 light:text-slate-300">Každé zpracované téma obsahuje vzorce, řešené příklady, kartičky a kvíz</p>
              </motion.div>
            ) : selectedTopic.comingSoon ? (
              <motion.div key={selectedTopic.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-3 text-slate-600 light:text-slate-400 p-6 text-center">
                <Clock size={40} className="opacity-30" />
                <h2 className="text-white light:text-slate-900 font-semibold">#{selectedTopic.number} {selectedTopic.title}</h2>
                <p className="text-xs max-w-xs">Tohle téma se teprve připravuje. Zatím pokračuj u zpracovaných témat vlevo (bez ikony hodin).</p>
              </motion.div>
            ) : (
              <motion.div key={selectedTopic.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="p-6 space-y-5 max-w-4xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: color + '20', color, border: `1px solid ${color}40` }}>
                    {selectedTopic.number}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl font-bold text-white light:text-slate-900 leading-tight">{selectedTopic.title}</h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] px-2 py-0.5 rounded-full glass text-slate-400 light:text-slate-500">{selectedTopic.category}</span>
                      <DiffBadge diff={selectedTopic.difficulty} />
                    </div>
                  </div>
                </div>

                {selectedTopic.summary && (
                  <div className="glass rounded-2xl p-4 space-y-3">
                    <p className="text-sm text-slate-200 light:text-slate-700 leading-relaxed"><MathText text={selectedTopic.summary} /></p>
                    <div className="flex gap-2 flex-wrap">
                      {selectedTopic.workedExamples?.length > 0 && (
                        <button onClick={() => setExampleOpen(true)} className="btn-primary text-xs flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg,#059669,#10b981)' }}>
                          <Calculator size={13} /> Řešený příklad
                        </button>
                      )}
                      {selectedTopic.quiz?.length > 0 && (
                        <button onClick={() => setQuizOpen(true)} className="btn-ghost text-xs flex items-center gap-1.5">
                          <Target size={13} /> Kvíz ({selectedTopic.quiz.length} otázek)
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {selectedTopic.formulas?.length > 0 && (
                  <div className="glass rounded-2xl p-4">
                    <p className="text-[11px] text-slate-500 light:text-slate-600 font-semibold uppercase mb-2.5 flex items-center gap-1.5"><Sigma size={11} /> Klíčové vzorce</p>
                    <div className="space-y-2.5">
                      {selectedTopic.formulas.map((f, i) => (
                        <div key={i} className="rounded-xl border border-white/10 light:border-black/10 bg-white/[0.02] light:bg-black/[0.02] p-3">
                          <p className="text-[11px] text-slate-500 light:text-slate-600 mb-1">{f.name}</p>
                          <Formula tex={f.latex} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="glass rounded-2xl p-4">
                  <p className="text-[11px] text-slate-500 light:text-slate-600 font-semibold uppercase mb-2.5 flex items-center gap-1.5"><Tag size={11} /> Klíčové pojmy</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTopic.terms.map(term => (
                      <span key={term} className="text-[11px] px-2 py-1 rounded-lg" style={{ background: color + '15', color: color + 'dd', border: `1px solid ${color}30` }}>
                        {term}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedTopic.flashcards?.length > 0 && (
                  <div className="glass rounded-2xl p-4">
                    <p className="text-[11px] text-slate-500 light:text-slate-600 font-semibold uppercase mb-2.5 flex items-center gap-1.5"><Layers size={11} /> Kartičky k tématu</p>
                    <FormulaFlashcards cards={selectedTopic.flashcards} />
                  </div>
                )}

                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[11px] text-slate-500 light:text-slate-600 font-semibold uppercase flex items-center gap-1.5"><CheckCircle2 size={11} /> Co umím ({learnedCount}/{total})</p>
                  </div>
                  {total > 0 && (
                    <div className="w-full h-1.5 rounded-full bg-white/10 light:bg-black/10 mb-3">
                      <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(learnedCount / total * 100)}%`, background: color }} />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    {selectedTopic.subtopics.map((sub, i) => {
                      const checked = topicProgress?.learnedSections?.includes(i);
                      return (
                        <button key={sub} onClick={() => toggleSectionLearned(selectedTopic.id, i, total)} className="w-full flex items-center gap-2.5 text-left hover:bg-white/[0.03] light:bg-black/[0.03] px-2 py-1.5 rounded-lg transition-all group">
                          {checked ? <CheckCircle2 size={14} style={{ color }} className="shrink-0" /> : <Circle size={14} className="text-slate-600 light:text-slate-400 shrink-0 group-hover:text-slate-500 light:text-slate-600 transition-colors" />}
                          <span className={`text-xs transition-colors ${checked ? 'line-through text-slate-600 light:text-slate-400' : 'text-slate-300 light:text-slate-600'}`}>{sub}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {quizOpen && selectedTopic && <TopicQuiz topic={selectedTopic} onClose={() => setQuizOpen(false)} />}
        {exampleOpen && selectedTopic && <WorkedExample topic={selectedTopic} onClose={() => setExampleOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
