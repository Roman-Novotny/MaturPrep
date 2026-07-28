import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  getStats, saveStats, getLevelInfo, ACHIEVEMENTS,
  getProgress, saveProgress, getTheme, saveTheme,
} from '../utils/storage.js';
import { ALL_TOPICS } from '../data/mathTopics.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [stats, setStats] = useState(getStats);
  const [progress, setProgressState] = useState(getProgress);
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    checkStreak();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  function checkStreak() {
    setStats(prev => {
      const today = new Date().toDateString();
      if (prev.lastLogin === today) return prev;

      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = prev.lastLogin === yesterday ? prev.streak + 1 : 1;
      const newStats = { ...prev, lastLogin: today, streak: newStreak };

      if (newStreak > 1) toast(`🔥 Streak ${newStreak} dní!`, { icon: '🔥' });

      saveStats(newStats);
      return newStats;
    });
  }

  const addXP = useCallback((amount) => {
    setStats(prev => {
      const oldLevel = getLevelInfo(prev.xp).current.level;
      const newXp = prev.xp + amount;
      const newLevelInfo = getLevelInfo(newXp);
      const newLevel = newLevelInfo.current.level;

      const today = new Date().toISOString().split('T')[0];
      const xpHistory = [...(prev.xpHistory || [])];
      const todayEntry = xpHistory.find(e => e.date === today);
      if (todayEntry) todayEntry.xp += amount;
      else xpHistory.push({ date: today, xp: amount });

      const newStats = { ...prev, xp: newXp, level: newLevel, xpHistory: xpHistory.slice(-30) };

      if (newLevel > oldLevel) {
        toast.success(`🎉 Level up! Jsi teď ${newLevelInfo.current.title} (Level ${newLevel})`, { duration: 4000 });
      }
      if (newXp >= 500 && prev.xp < 500) unlockAchievement('xp_500');
      if (newXp >= 2000 && prev.xp < 2000) unlockAchievement('xp_2000');

      saveStats(newStats);
      return newStats;
    });
  }, []);

  const unlockAchievement = useCallback((id) => {
    setStats(prev => {
      if (prev.achievements.includes(id)) return prev;
      const achievement = ACHIEVEMENTS.find(a => a.id === id);
      if (!achievement) return prev;

      const newStats = { ...prev, achievements: [...prev.achievements, id] };
      saveStats(newStats);

      toast(`${achievement.icon} Achievement: ${achievement.title}`, {
        duration: 4000,
        style: { background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' },
      });

      return newStats;
    });
  }, []);

  const incrementStat = useCallback((key, amount = 1) => {
    setStats(prev => {
      const newStats = { ...prev, [key]: (prev[key] || 0) + amount };
      saveStats(newStats);
      return newStats;
    });
  }, []);

  const setProgress = useCallback((data) => {
    const val = typeof data === 'function' ? data(progress) : data;
    setProgressState(val);
    saveProgress(val);
  }, [progress]);

  const toggleSectionLearned = useCallback((topicId, idx, totalSections) => {
    setProgress(prev => {
      const entry = prev[topicId] || { learnedSections: [], quizBest: null, examplesDone: 0 };
      const set = new Set(entry.learnedSections);
      set.has(idx) ? set.delete(idx) : set.add(idx);
      const learnedSections = [...set];
      const next = { ...prev, [topicId]: { ...entry, learnedSections } };

      if (totalSections > 0 && learnedSections.length === totalSections) {
        unlockAchievement('first_topic');
        addXP(15);
        const masteredCount = Object.entries(next).filter(([id, p]) => {
          const t = ALL_TOPICS.find(x => x.id === id);
          return t && t.subtopics?.length > 0 && p.learnedSections?.length === t.subtopics.length;
        }).length;
        if (masteredCount >= 5) unlockAchievement('topics_5');
        const availableTopics = ALL_TOPICS.filter(t => !t.comingSoon);
        if (masteredCount >= availableTopics.length) unlockAchievement('topics_all');
      }
      return next;
    });
  }, [addXP, unlockAchievement, setProgress]);

  const recordQuizResult = useCallback((topicId, correct, total) => {
    setProgress(prev => {
      const entry = prev[topicId] || { learnedSections: [], quizBest: null, examplesDone: 0 };
      const best = entry.quizBest && entry.quizBest.correct / entry.quizBest.total >= correct / total
        ? entry.quizBest
        : { correct, total };
      return { ...prev, [topicId]: { ...entry, quizBest: best } };
    });
    incrementStat('totalQuizzes');
    if (correct === total) unlockAchievement('quiz_perfect');
    if ((stats.totalQuizzes || 0) + 1 >= 10) unlockAchievement('quiz_10');
    addXP(correct * 4 + 10);
  }, [addXP, incrementStat, unlockAchievement, setProgress, stats.totalQuizzes]);

  const recordWorkedExample = useCallback((topicId) => {
    setProgress(prev => {
      const entry = prev[topicId] || { learnedSections: [], quizBest: null, examplesDone: 0 };
      return { ...prev, [topicId]: { ...entry, examplesDone: (entry.examplesDone || 0) + 1 } };
    });
    incrementStat('totalWorkedExamples');
    unlockAchievement('example_first');
    if ((stats.totalWorkedExamples || 0) + 1 >= 10) unlockAchievement('example_10');
    addXP(20);
  }, [addXP, incrementStat, unlockAchievement, setProgress, stats.totalWorkedExamples]);

  const value = {
    stats, addXP, unlockAchievement, incrementStat,
    progress, setProgress, toggleSectionLearned, recordQuizResult, recordWorkedExample,
    levelInfo: getLevelInfo(stats.xp),
    theme, toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
