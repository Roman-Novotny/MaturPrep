import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Target } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { MathText } from '../math/Formula.jsx';

export default function TopicQuiz({ topic, onClose }) {
  const { recordQuizResult } = useApp();
  const quiz = topic.quiz || [];
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  if (quiz.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="glass-dark rounded-2xl p-6 max-w-sm w-full text-center">
          <p className="text-slate-300 light:text-slate-600 text-sm mb-4">U tohoto tématu zatím není kvíz.</p>
          <button onClick={onClose} className="btn-primary w-full text-sm">Zavřít</button>
        </div>
      </motion.div>
    );
  }

  const current = quiz[idx];

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.correctIndex) setCorrectCount(c => c + 1);
  }

  function next() {
    if (idx < quiz.length - 1) {
      setIdx(p => p + 1);
      setSelected(null);
    } else {
      recordQuizResult(topic.id, correctCount, quiz.length);
      setDone(true);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="glass-dark rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white light:text-slate-900 text-sm flex items-center gap-2"><Target size={14} className="text-blue-400" /> Kvíz: {topic.title}</h3>
          <button onClick={onClose} className="text-slate-500 light:text-slate-600 hover:text-slate-300 light:text-slate-600"><X size={16} /></button>
        </div>

        {!done ? (
          <>
            <div className="flex items-center justify-between mb-2 text-xs text-slate-500 light:text-slate-600">
              <span>{idx + 1} / {quiz.length}</span>
              <span className="text-emerald-400">{correctCount} ✓</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 light:bg-black/5 rounded-full mb-5">
              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all" style={{ width: `${(idx / quiz.length) * 100}%` }} />
            </div>

            <p className="text-white light:text-slate-900 text-sm font-medium mb-4 leading-relaxed"><MathText text={current.question} /></p>

            <div className="space-y-2 mb-4">
              {current.options.map((opt, i) => {
                const isCorrect = i === current.correctIndex;
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

            {selected !== null && (
              <button onClick={next} className="btn-primary w-full text-sm">
                {idx < quiz.length - 1 ? 'Další otázka' : 'Zobrazit výsledek'}
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-white light:text-slate-900 mb-1">{correctCount}/{quiz.length}</p>
            <p className="text-slate-400 light:text-slate-500 text-sm mb-5">{correctCount === quiz.length ? 'Bez chybičky! 🎯' : 'Dobrá práce, zkus to znovu pro lepší skóre.'}</p>
            <button onClick={onClose} className="btn-primary w-full text-sm">Zavřít</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
