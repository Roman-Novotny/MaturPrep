import React from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './contexts/AppContext.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Topics from './pages/Topics.jsx';
import Flashcards from './pages/Flashcards.jsx';
import Practice from './pages/Practice.jsx';
import Stats from './pages/Stats.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

function Page({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="h-full">
      {children}
    </motion.div>
  );
}

function TopicsRoute() {
  const [params] = useSearchParams();
  return <Topics initialTopicId={params.get('topic')} />;
}

function AppShell() {
  const { theme } = useApp();
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Page><Dashboard /></Page>} />
              <Route path="/temata" element={<Page><TopicsRoute /></Page>} />
              <Route path="/karticky" element={<Page><Flashcards /></Page>} />
              <Route path="/procvicovani" element={<Page><Practice /></Page>} />
              <Route path="/statistiky" element={<Page><Stats /></Page>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: theme === 'light' ? {
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(37,99,235,0.2)',
            color: '#0f1b2e',
            fontSize: '13px',
            backdropFilter: 'blur(20px)',
          } : {
            background: 'rgba(5,10,20,0.95)',
            border: '1px solid rgba(59,130,246,0.2)',
            color: '#e2e8f0',
            fontSize: '13px',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
