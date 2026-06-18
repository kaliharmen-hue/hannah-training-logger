import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import BlockSection from './components/BlockSection.jsx';
import NotesBox from './components/NotesBox.jsx';
import CopySummaryButton from './components/CopySummaryButton.jsx';
import History from './components/History.jsx';
import CardioOptions from './components/CardioOptions.jsx';
import { programme } from './data/programme.js';
import { cardioOptions } from './data/cardioOptions.js';
import { formatWhatsAppSummary } from './utils/formatWhatsAppSummary.js';
import { normaliseCardioSession } from './utils/cardioSession.js';
import {
  buildCompletedSession,
  hasSessionData,
  makeEmptySession,
  normaliseSession,
} from './utils/session.js';
import {
  clearCurrentSession,
  loadCardioHistory,
  loadCurrentCardioSession,
  loadCurrentSession,
  loadHistory,
  saveCompletedSession,
  saveCurrentCardioSession,
  saveCurrentSession,
} from './utils/storage.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('gym');
  const [session, setSession] = useState(() =>
    normaliseSession(programme, loadCurrentSession()),
  );
  const [history, setHistory] = useState(() => loadHistory());
  const [cardioSession, setCardioSession] = useState(() =>
    normaliseCardioSession(cardioOptions, loadCurrentCardioSession()),
  );
  const [cardioHistory, setCardioHistory] = useState(() => loadCardioHistory());
  const [status, setStatus] = useState('Your progress saves automatically.');

  const canCopy = useMemo(() => hasSessionData(session), [session]);

  useEffect(() => {
    saveCurrentSession(session);
  }, [session]);

  useEffect(() => {
    saveCurrentCardioSession(cardioSession);
  }, [cardioSession]);

  const updateSet = (exerciseId, setIndex, field, value) => {
    setSession((current) => {
      const exercise = current.exercises[exerciseId];
      const sets = exercise.sets.map((set, index) =>
        index === setIndex ? { ...set, [field]: value } : set,
      );

      return {
        ...current,
        exercises: {
          ...current.exercises,
          [exerciseId]: { ...exercise, sets },
        },
      };
    });
  };

  const updateExerciseNote = (exerciseId, value) => {
    setSession((current) => ({
      ...current,
      exercises: {
        ...current.exercises,
        [exerciseId]: {
          ...current.exercises[exerciseId],
          note: value,
        },
      },
    }));
  };

  const updateGeneralNotes = (value) => {
    setSession((current) => ({ ...current, generalNotes: value }));
  };

  const copyAndSave = async () => {
    const summary = formatWhatsAppSummary(programme, session);

    try {
      await copyText(summary);
      const completedSession = buildCompletedSession(programme, session, summary);
      const nextHistory = saveCompletedSession(completedSession);
      const emptySession = makeEmptySession(programme);

      setHistory(nextHistory);
      setSession(clearCurrentSession(emptySession));
      setStatus('Copied and saved. Today is now shown as Last time.');
    } catch {
      setStatus('Copy failed. Select the last history entry and copy it manually.');
    }
  };

  return (
    <main className="app-shell">
      <Header programme={programme} />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'gym' ? (
        <>
          <section className="session-intro">
            <p>{programme.notes}</p>
          </section>

          {programme.blocks.map((block) => (
            <BlockSection
              key={block.id}
              block={block}
              session={session}
              history={history}
              programmeId={programme.id}
              onSetChange={updateSet}
              onExerciseNoteChange={updateExerciseNote}
            />
          ))}

          <NotesBox value={session.generalNotes} onChange={updateGeneralNotes} />

          <CopySummaryButton
            disabled={!canCopy}
            status={status}
            onCopy={copyAndSave}
          />

          <History history={history} />
        </>
      ) : (
        <CardioOptions
          cardioSession={cardioSession}
          setCardioSession={setCardioSession}
          cardioHistory={cardioHistory}
          setCardioHistory={setCardioHistory}
          copyText={copyText}
        />
      )}
    </main>
  );
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
