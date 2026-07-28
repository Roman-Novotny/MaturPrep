import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, ChevronRight, RotateCcw, CheckCircle2, PenLine } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { MathText, Formula } from '../math/Formula.jsx';

export default function WorkedExample({ topic, onClose }) {
  const { recordWorkedExample } = useApp();
  const examples = topic.workedExamples || [];
  const [exIdx, setExIdx] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [completedSet, setCompletedSet] = useState(new Set());
  const [attempt, setAttempt] = useState('');

  if (examples.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="glass-dark rounded-2xl p-6 max-w-sm w-full text-center">
          <p className="text-slate-300 light:text-slate-600 text-sm mb-4">U tohoto tématu zatím není řešený příklad.</p>
          <button onClick={onClose} className="btn-primary w-full text-sm">Zavřít</button>
        </div>
      </motion.div>
    );
  }

  const example = examples[exIdx];
  const allRevealed = revealed >= example.steps.length;

  function revealNext() {
    setRevealed(r => {
      const nr = Math.min(r + 1, example.steps.length);
      if (nr === example.steps.length && !completedSet.has(exIdx)) {
        recordWorkedExample(topic.id);
        setCompletedSet(prev => new Set(prev).add(exIdx));
      }
      return nr;
    });
  }

  function resetExample() {
    setRevealed(0);
    setAttempt('');
  }

  function goToExample(i) {
    setExIdx(i);
    setRevealed(0);
    setAttempt('');
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} className="glass-dark rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] light:border-black/[0.08]">
          <h3 className="font-semibold text-white light:text-slate-900 text-sm flex items-center gap-2"><Calculator size={15} className="text-emerald-400" /> Řešený příklad: {topic.title}</h3>
          <button onClick={onClose} className="text-slate-500 light:text-slate-600 hover:text-slate-300 light:text-slate-600"><X size={16} /></button>
        </div>

        {examples.length > 1 && (
          <div className="flex gap-1.5 px-5 pt-3">
            {examples.map((_, i) => (
              <button
                key={i}
                onClick={() => goToExample(i)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 ${i === exIdx ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'glass text-slate-400 light:text-slate-500'}`}
              >
                {completedSet.has(i) && <CheckCircle2 size={10} />} Příklad {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="rounded-xl border border-white/10 light:border-black/10 bg-black/20 light:bg-black/[0.03] p-4">
            <p className="text-[11px] text-slate-500 light:text-slate-600 font-semibold uppercase mb-2">Zadání</p>
            <p className="prose-script"><MathText text={example.problem} /></p>
          </div>

          {revealed === 0 && (
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-[11px] text-blue-400 font-semibold uppercase mb-2 flex items-center gap-1.5"><PenLine size={11} /> Zkus to nejdřív sám (nepovinné)</p>
              <input
                value={attempt}
                onChange={e => setAttempt(e.target.value)}
                placeholder="Napiš svůj odhad výsledku..."
                className="ai-input w-full px-3 py-2 text-sm"
              />
              <p className="text-[11px] text-slate-500 light:text-slate-600 mt-2">Až budeš mít odpověď, porovnej si ji s postupem a výsledkem níže.</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-[11px] text-slate-500 light:text-slate-600 font-semibold uppercase">Postup řešení</p>
            <AnimatePresence initial={false}>
              {example.steps.slice(0, revealed).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 rounded-xl border border-white/10 light:border-black/10 bg-white/[0.02] light:bg-black/[0.02] p-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="prose-script text-sm"><MathText text={step} /></p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {allRevealed && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-emerald-400 font-semibold uppercase mb-1">Výsledek</p>
                  <Formula tex={example.answer} />
                </div>
                <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
              </div>
              {attempt.trim() && (
                <p className="text-xs text-slate-400 light:text-slate-500 mt-2 pt-2 border-t border-white/10 light:border-black/10">
                  Tvůj pokus: <span className="text-slate-300 light:text-slate-600">{attempt}</span> — sedí ti to?
                </p>
              )}
            </motion.div>
          )}
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-white/[0.06] light:border-black/[0.08]">
          {!allRevealed ? (
            <button onClick={revealNext} className="btn-primary text-sm flex items-center gap-1.5 flex-1 justify-center">
              Další krok <ChevronRight size={14} />
            </button>
          ) : (
            <button onClick={resetExample} className="btn-ghost text-sm flex items-center gap-1.5 flex-1 justify-center">
              <RotateCcw size={13} /> Projít znovu
            </button>
          )}
          {exIdx < examples.length - 1 && allRevealed && (
            <button onClick={() => goToExample(exIdx + 1)} className="btn-primary text-sm flex-1">Další příklad</button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
