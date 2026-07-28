# MaturPrep

Webová appka na procvičování k maturitě z matematiky. Bez AI, bez backendu — vše
statické, postup a gamifikace (XP, streak, achievementy) v localStorage.

## Stack

React 19 + Vite + Tailwind + Framer Motion + lucide-react + react-router-dom +
react-hot-toast + KaTeX (vzorce).

## Struktura

- `src/data/mathTopics.js` — maturitní témata (skeleton + postupně doplňovaná plná témata:
  vzorce, klíčové pojmy, checklist, řešené příklady krok za krokem, kvíz, kartičky)
- `src/components/math/Formula.jsx` — přímé renderování LaTeXu přes `katex.renderToString`
  (bez `react-katex` — jeho nested katex verze se v tomto Vite bundlu rozbíjela)
- `src/components/practice/` — TopicQuiz, FormulaFlashcards, WorkedExample (krokové řešení)
- `src/pages/` — Dashboard, Topics, Flashcards, Practice, Stats

## Vývoj

```
npm install
npm run dev
```

## Build

```
npm run build
```
