const currentKey = 'hannahLogger.currentSession';
const historyKey = 'hannahLogger.history';
const backupKey = 'hannahLogger.backups';
const currentCardioKey = 'hannahLogger.currentCardioSession';
const cardioHistoryKey = 'hannahLogger.cardioHistory';
const cardioBackupKey = 'hannahLogger.cardioBackups';

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadCurrentSession() {
  return readJson(currentKey, null);
}

export function saveCurrentSession(session) {
  const nextSession = { ...session, updatedAt: new Date().toISOString() };
  writeJson(currentKey, nextSession);
  saveBackup(nextSession);
  return nextSession;
}

export function clearCurrentSession(emptySession) {
  writeJson(currentKey, emptySession);
  return emptySession;
}

export function loadHistory() {
  return readJson(historyKey, []);
}

export function saveCompletedSession(completedSession) {
  const history = loadHistory();
  const nextHistory = [completedSession, ...history];
  writeJson(historyKey, nextHistory);
  return nextHistory;
}

export function getLastCompletedForExercise(history, programmeId, exerciseId) {
  const session = history.find(
    (entry) => entry.programmeId === programmeId && entry.exercises?.[exerciseId],
  );

  return session?.exercises?.[exerciseId] || null;
}

export function loadCurrentCardioSession() {
  return readJson(currentCardioKey, null);
}

export function saveCurrentCardioSession(session) {
  const nextSession = { ...session, updatedAt: new Date().toISOString() };
  writeJson(currentCardioKey, nextSession);
  saveNamedBackup(cardioBackupKey, nextSession);
  return nextSession;
}

export function clearCurrentCardioSession(emptySession) {
  writeJson(currentCardioKey, emptySession);
  return emptySession;
}

export function loadCardioHistory() {
  return readJson(cardioHistoryKey, []);
}

export function saveCompletedCardioSession(completedSession) {
  const history = loadCardioHistory();
  const nextHistory = [completedSession, ...history];
  writeJson(cardioHistoryKey, nextHistory);
  return nextHistory;
}

function saveBackup(session) {
  saveNamedBackup(backupKey, session);
}

function saveNamedBackup(key, session) {
  const backups = readJson(key, []);
  const nextBackups = [
    { savedAt: new Date().toISOString(), session },
    ...backups,
  ].slice(0, 10);

  writeJson(key, nextBackups);
}
