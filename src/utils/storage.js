// Pomocné funkce pro localStorage – žádné API volání, vše čistě lokální.

const PREFIX = 'maturprep:';

function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage error:', e);
  }
}

// ── Statistiky / gamifikace ─────────────────────────────────
export function getStats() {
  return get('stats', {
    xp: 0,
    level: 1,
    streak: 0,
    lastLogin: null,
    totalQuizzes: 0,
    totalWorkedExamples: 0,
    achievements: [],
    xpHistory: [],
  });
}
export function saveStats(stats) { set('stats', stats); }

// ── Barevný režim (light/dark) ──────────────────────────────
export function getTheme() {
  return get('theme', window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}
export function saveTheme(theme) { set('theme', theme); }

// ── Postup u jednotlivých témat ─────────────────────────────
// { [topicId]: { learnedSections: number[], quizBest: {correct,total}, examplesDone: number } }
export function getProgress() { return get('progress', {}); }
export function saveProgress(data) { set('progress', data); }

// ── Špatně zodpovězené kvízové otázky (pro režim "Opakuj chyby") ─
// [{ topicId, qIndex }] – qIndex je index otázky v poli topic.quiz
export function getWrongQuestions() { return get('wrongQuestions', []); }
export function saveWrongQuestions(list) { set('wrongQuestions', list); }

// ── Systém úrovní ───────────────────────────────────────────
const LEVELS = [
  { level: 1,  title: 'Nováček',       xpRequired: 0 },
  { level: 2,  title: 'Počtář',        xpRequired: 100 },
  { level: 3,  title: 'Student',       xpRequired: 300 },
  { level: 4,  title: 'Pilný student', xpRequired: 600 },
  { level: 5,  title: 'Řešitel',       xpRequired: 1000 },
  { level: 6,  title: 'Znalec',        xpRequired: 1500 },
  { level: 7,  title: 'Erudit',        xpRequired: 2200 },
  { level: 8,  title: 'Expert',        xpRequired: 3000 },
  { level: 9,  title: 'Maturant',      xpRequired: 4000 },
  { level: 10, title: 'Maturitní eso', xpRequired: 5500 },
];

export function getLevelInfo(xp) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  const progress = next
    ? Math.round(((xp - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100)
    : 100;
  return { current, next, progress };
}

// ── Achievements definice ────────────────────────────────────
export const ACHIEVEMENTS = [
  { id: 'first_topic',       icon: '📖', title: 'První téma', desc: 'Prošel/prošla jsi první téma' },
  { id: 'topics_5',          icon: '📚', title: 'Rozjeto', desc: '5 zvládnutých témat' },
  { id: 'topics_all',        icon: '🏆', title: 'Kompletní přehled', desc: 'Všechna zavedená témata zvládnuta' },
  { id: 'quiz_perfect',      icon: '🎯', title: 'Bez chybičky', desc: '100 % v kvízu u tématu' },
  { id: 'quiz_10',           icon: '🧠', title: 'Kvízomaniak', desc: '10 dokončených kvízů' },
  { id: 'example_first',     icon: '✏️', title: 'První příklad', desc: 'Dokončil/a jsi první řešený příklad krok za krokem' },
  { id: 'example_10',        icon: '📐', title: 'Počtář', desc: '10 vyřešených příkladů' },
  { id: 'streak_3',          icon: '✨', title: '3 dny v řadě', desc: 'Streak 3 dny' },
  { id: 'streak_7',          icon: '🔥', title: 'Týdenní streak', desc: 'Streak 7 dní' },
  { id: 'streak_30',         icon: '💎', title: 'Měsíční devotee', desc: 'Streak 30 dní' },
  { id: 'xp_500',            icon: '🌟', title: '500 XP', desc: 'Dosáhl/a 500 XP' },
  { id: 'xp_2000',           icon: '🚀', title: '2000 XP', desc: 'Dosáhl/a 2000 XP' },
  { id: 'mistakes_cleared',  icon: '🧹', title: 'Úklid chyb', desc: 'Opravil/a jsi všechny své chyby v kvízech' },
  { id: 'mock_exam_done',    icon: '⏱️', title: 'Zkušební test', desc: 'Dokončil/a jsi zkušební test načas' },
];
