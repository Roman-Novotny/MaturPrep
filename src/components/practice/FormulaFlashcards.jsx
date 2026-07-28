import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import { MathText } from '../math/Formula.jsx';

export default function FormulaFlashcards({ cards }) {
  const [order, setOrder] = useState(cards.map((_, i) => i));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!cards || cards.length === 0) return null;
  const card = cards[order[idx]];

  function go(delta) {
    setFlipped(false);
    setIdx(p => (p + delta + order.length) % order.length);
  }

  function shuffle() {
    const arr = [...order].sort(() => Math.random() - 0.5);
    setOrder(arr);
    setIdx(0);
    setFlipped(false);
  }

  return (
    <div className="max-w-xs mx-auto">
      <div className={`flip-card w-full cursor-pointer mb-3 ${flipped ? 'flipped' : ''}`} style={{ height: '130px' }} onClick={() => setFlipped(p => !p)}>
        <div className="flip-card-inner w-full h-full" style={{ position: 'relative' }}>
          <div className="flip-card-front glass rounded-xl border border-white/10 light:border-black/10 p-4 flex items-center justify-center" style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <p className="text-white light:text-slate-900 text-center text-sm font-semibold"><MathText text={card.front} /></p>
          </div>
          <div className="flip-card-back glass rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-center justify-center" style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <p className="text-slate-200 light:text-slate-700 text-center text-xs leading-relaxed"><MathText text={card.back} /></p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => go(-1)} className="p-1.5 text-slate-500 light:text-slate-600 hover:text-slate-300"><ChevronLeft size={16} /></button>
        <span className="text-[11px] text-slate-600 light:text-slate-400">{idx + 1} / {order.length}</span>
        <button onClick={shuffle} className="p-1.5 text-slate-500 light:text-slate-600 hover:text-blue-300" title="Zamíchat"><Shuffle size={13} /></button>
        <button onClick={() => go(1)} className="p-1.5 text-slate-500 light:text-slate-600 hover:text-slate-300"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
