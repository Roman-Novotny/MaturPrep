import React, { useMemo, useState } from 'react';
import { Search, Sigma } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import { ALL_TOPICS, CATEGORY_COLORS } from '../data/mathTopics.js';
import { Formula } from '../components/math/Formula.jsx';

export default function FormulaSheet() {
  const [search, setSearch] = useState('');

  const topicsWithFormulas = useMemo(() => ALL_TOPICS.filter(t => t.formulas?.length > 0), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return topicsWithFormulas;
    return topicsWithFormulas
      .map(t => {
        const topicMatches = t.title.toLowerCase().includes(q) || t.terms.some(term => term.toLowerCase().includes(q));
        const matchingFormulas = t.formulas.filter(f => f.name.toLowerCase().includes(q));
        if (topicMatches) return t;
        if (matchingFormulas.length > 0) return { ...t, formulas: matchingFormulas };
        return null;
      })
      .filter(Boolean);
  }, [topicsWithFormulas, search]);

  const byCategory = useMemo(() => {
    const map = {};
    for (const t of filtered) {
      if (!map[t.category]) map[t.category] = [];
      map[t.category].push(t);
    }
    return map;
  }, [filtered]);

  const totalFormulas = topicsWithFormulas.reduce((n, t) => n + t.formulas.length, 0);

  return (
    <div className="flex flex-col h-full">
      <Header title="Vzorce" subtitle={`${totalFormulas} vzorců z ${topicsWithFormulas.length} témat — vše na jednom místě`} />

      <div className="p-4 border-b border-white/[0.06] light:border-black/[0.08]">
        <div className="relative max-w-md mx-auto">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 light:text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Hledat vzorec, téma nebo pojem..."
            className="ai-input w-full pl-8 pr-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {Object.entries(byCategory).map(([category, topics]) => (
            <div key={category}>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: CATEGORY_COLORS[category] }}>{category}</h2>
              <div className="space-y-4">
                {topics.map(t => (
                  <div key={t.id} className="glass rounded-2xl p-4">
                    <p className="text-sm font-semibold text-white light:text-slate-900 mb-3 flex items-center gap-1.5">
                      <Sigma size={13} style={{ color: CATEGORY_COLORS[category] }} /> {t.title}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {t.formulas.map((f, i) => (
                        <div key={i} className="rounded-xl border border-white/10 light:border-black/10 bg-white/[0.02] light:bg-black/[0.02] p-3">
                          <p className="text-[11px] text-slate-500 light:text-slate-600 mb-1">{f.name}</p>
                          <Formula tex={f.latex} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-600 light:text-slate-400">
              <Sigma size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nic nenalezeno</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
