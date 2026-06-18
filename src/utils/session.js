export function makeEmptySession(programme) {
  const exercises = {};

  programme.blocks.forEach((block) => {
    block.exercises.forEach((exercise) => {
      exercises[exercise.id] = {
        sets: Array.from({ length: exercise.sets || 1 }, () =>
          makeEmptySet(exercise.inputType),
        ),
        note: '',
      };
    });
  });

  return {
    programmeId: programme.id,
    updatedAt: new Date().toISOString(),
    exercises,
    generalNotes: '',
  };
}

export function makeEmptySet(inputType) {
  switch (inputType) {
    case 'weight_reps':
      return { kg: '', reps: '' };
    case 'rest_pause':
      return { kg: '', reps1: '', reps2: '', reps3: '' };
    case 'reps':
      return { reps: '' };
    case 'time':
      return { time: '' };
    case 'band_reps':
      return { band: '', repsOrTime: '' };
    case 'rounds':
      return { rounds: '' };
    case 'ball_rounds':
      return { ballWeight: '', rounds: '' };
    case 'slam_ball_rounds':
      return { done: false, ballWeight: '' };
    case 'notes_only':
      return { note: '' };
    default:
      return { note: '' };
  }
}

export function normaliseSession(programme, session) {
  if (!session || session.programmeId !== programme.id) {
    return makeEmptySession(programme);
  }

  const fresh = makeEmptySession(programme);

  programme.blocks.forEach((block) => {
    block.exercises.forEach((exercise) => {
      const saved = session.exercises?.[exercise.id];
      if (!saved) return;

      fresh.exercises[exercise.id] = {
        note: saved.note || '',
        sets: fresh.exercises[exercise.id].sets.map((emptySet, index) => ({
          ...emptySet,
          ...(saved.sets?.[index] || {}),
        })),
      };
    });
  });

  fresh.generalNotes = session.generalNotes || '';
  fresh.updatedAt = session.updatedAt || fresh.updatedAt;
  return fresh;
}

export function hasExerciseData(entry) {
  return Boolean(
    entry?.note?.trim() ||
      entry?.sets?.some((set) =>
        Object.entries(set).some(([key, value]) =>
          key === 'ballWeight' && 'done' in set && !set.done
            ? false
            : typeof value === 'boolean'
              ? value
              : String(value || '').trim(),
        ),
      ),
  );
}

export function hasSessionData(session) {
  return Boolean(
    session?.generalNotes?.trim() ||
      Object.values(session?.exercises || {}).some(hasExerciseData),
  );
}

export function buildCompletedSession(programme, session, summary) {
  return {
    id: crypto.randomUUID?.() || `${Date.now()}`,
    programmeId: programme.id,
    clientName: programme.clientName,
    sessionTitle: programme.sessionTitle,
    completedAt: new Date().toISOString(),
    exercises: session.exercises,
    generalNotes: session.generalNotes,
    summary,
  };
}
