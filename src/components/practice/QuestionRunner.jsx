import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { MathText } from '../math/Formula.jsx';

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.max(0, sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Sjednocený běh kvízu pro: kvíz u tématu, mix kvíz, opakování chyb i zkušební test.
// mode 'instant' – okamžitá zpětná vazba po každé otázce (jako klasický kvíz)
// mode 'exam'    – bez zpětné vazby za jízdy, volný pohyb mezi otázkami, časovač, souhrn na konci
export default function QuestionRunner({ questions, mode = 'instant', timeLimitSec = null, title, onClose }) {
  const { recordQuestionAnswer, addXP, incrementStat, unlockAchievement } = useApp();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimitSec || 0);
  const finishRef = useRef(() => {});

  function finish() {
    setDone(prevDone => {
      if (prevDone) return prevDone;
      let correct = 0;
      questions.forEach((q, i) => { if (answers[i] === q.correctIndex) correct++; });
      addXP(correct * 4 + (mode === 'exam' ? 20 : 10));
      incrementStat('totalQuizzes');
      if (correct === questions.length) unlockAchievement('quiz_perfect');
      if (mode === 'exam') unlockAchievement('mock_exam_done');
      return true;
    });
  }
  finishRef.current = finish;

  useEffect(() => {
    if (mode !== 'exam' || !timeLimitSec) return undefined;
    const iv = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(iv);
          finishRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [mode, timeLimitSec]);

  if (questions.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="glass-dark rounded-2xl p-6 max-w-sm w-full text-center">
          <p className="text-slate-300 light:text-slate-600 text-sm mb-4">Zatím tu není žádná otázka.</p>
          <button onClick={onClose} className="btn-primary w-full text-sm">Zavřít</button>
        </div>
      </motion.div>
    );
  }

  const q = questions[idx];
  const selected = answers[idx];
  const correctCount = questions.reduce((n, qq, i) => n + (answers[i] === qq.correctIndex ? 1 : 0), 0);

  function pick(i) {
    if (mode === 'instant' && selected !== undefined) return;
    setAnswers(prev => ({ ...prev, [idx]: i }));
    recordQuestionAnswer(q.topicId, q.qIndex, i === q.correctIndex);
  }

  function next() {
    if (idx < questions.length - 1) setIdx(idx + 1);
    else if (mode === 'instant') finish();
  }
  function prev() { if (idx > 0) setIdx(idx - 1); }

  if (done) {
    const wrong = questions
      .map((qq, i) => ({ qq, i }))
      .filter(({ qq, i }) => answers[i] !== qq.correctIndex);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} className="glass-dark rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <div className="px-6 py-5 text-center border-b border-white/[0.06] light:border-black/[0.08]">
            <p className="text-3xl font-bold text-white light:text-slate-900 mb-1">{correctCount}/{questions.length}</p>
            <p className="text-slate-400 light:text-slate-500 text-sm">
              {correctCount === questions.length ? 'Bez chybičky! 🎯' : wrong.length > 0 ? 'Podívej se, co ti ještě nejde:' : 'Hotovo'}
            </p>
          </div>
          {wrong.length > 0 && (
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {wrong.map(({ qq, i }) => (
                <div key={i} className="rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                  <p className="text-[10px] text-slate-500 light:text-slate-600 mb-1">{qq.topicTitle}</p>
                  <p className="text-sm text-slate-200 light:text-slate-700 mb-2"><MathText text={qq.question} /></p>
                  <p className="text-xs text-red-300"><MathText text={`Tvoje odpověď: ${answers[i] !== undefined ? qq.options[answers[i]] : '(nevyplněno)'}`} /></p>
                  <p className="text-xs text-emerald-300"><MathText text={`Správně: ${qq.options[qq.correctIndex]}`} /></p>
                </div>
              ))}
            </div>
          )}
          <div className="p-4 border-t border-white/[0.06] light:border-black/[0.08]">
            <button onClick={onClose} className="btn-primary w-full text-sm">Zavřít</button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="glass-dark rounded-2xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white light:text-slate-900 text-sm">{title}</h3>
          <div className="flex items-center gap-3">
            {mode === 'exam' && timeLimitSec != null && (
              <span className={`flex items-center gap-1 text-xs font-semibold tabular-nums ${timeLeft < 60 ? 'text-red-400' : 'text-slate-400 light:text-slate-500'}`}>
                <Clock size={13} /> {formatTime(timeLeft)}
              </span>
            )}
            <button onClick={onClose} className="text-slate-500 light:text-slate-600 hover:text-slate-300 light:text-slate-600"><X size={16} /></button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2 text-xs text-slate-500 light:text-slate-600">
          <span>{idx + 1} / {questions.length} {q.topicTitle && `· ${q.topicTitle}`}</span>
          {mode === 'instant' && <span className="text-emerald-400">{correctCount} ✓</span>}
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
            if (mode === 'instant' && selected !== undefined) {
              if (isCorrect) cls = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
              else if (isPicked) cls = 'border-red-500/40 bg-red-500/10 text-red-300';
              else cls = 'glass border-white/5 light:border-black/5 text-slate-500 light:text-slate-600';
            } else if (mode === 'exam' && isPicked) {
              cls = 'border-blue-500/50 bg-blue-500/10 text-blue-200';
            }
            return (
              <button key={i} onClick={() => pick(i)} disabled={mode === 'instant' && selected !== undefined} className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all flex items-center justify-between ${cls}`}>
                <span><MathText text={opt} /></span>
                {mode === 'instant' && selected !== undefined && isCorrect && <Check size={14} className="text-emerald-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {mode === 'instant' ? (
          selected !== undefined && (
            <button onClick={next} className="btn-primary w-full text-sm">
              {idx < questions.length - 1 ? 'Další otázka' : 'Zobrazit výsledek'}
            </button>
          )
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <button onClick={prev} disabled={idx === 0} className="btn-ghost text-sm flex items-center gap-1 disabled:opacity-40"><ChevronLeft size={14} /> Zpět</button>
              {idx < questions.length - 1 ? (
                <button onClick={next} className="btn-primary text-sm flex-1 flex items-center justify-center gap-1">Další <ChevronRight size={14} /></button>
              ) : (
                <button onClick={finish} className="btn-primary text-sm flex-1 flex items-center justify-center gap-1">Odevzdat test <ArrowRight size={14} /></button>
              )}
            </div>
            {idx < questions.length - 1 && (
              <button onClick={finish} className="text-[11px] text-slate-500 light:text-slate-600 hover:text-slate-300 w-full text-center">Odevzdat test už teď</button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
