import React from 'react';
import QuestionRunner from './QuestionRunner.jsx';

export default function TopicQuiz({ topic, onClose }) {
  const questions = (topic.quiz || []).map((q, qIndex) => ({
    ...q,
    topicId: topic.id,
    topicTitle: topic.title,
    qIndex,
  }));

  return <QuestionRunner questions={questions} mode="instant" title={`Kvíz: ${topic.title}`} onClose={onClose} />;
}
