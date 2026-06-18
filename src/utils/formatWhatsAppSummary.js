import { hasExerciseData } from './session';

export function formatWhatsAppSummary(programme, session) {
  const lines = [
    `${programme.clientName.toUpperCase()} TRAINING LOG`,
    '',
    `Date: ${formatDate(new Date())}`,
    `Session: ${programme.sessionTitle}`,
  ];

  programme.blocks.filter((block) => !block.hidden).forEach((block) => {
    const exerciseLines = [];

    block.exercises.forEach((exercise) => {
      const entry = session.exercises[exercise.id];
      if (!hasExerciseData(entry)) return;

      exerciseLines.push('', exercise.name);
      exerciseLines.push(...formatExerciseEntry(exercise, entry));

      if (entry.note?.trim()) {
        exerciseLines.push(`Notes: ${entry.note.trim()}`);
      }
    });

    if (exerciseLines.length) {
      lines.push('', (block.displayTitle || block.title).toUpperCase(), ...exerciseLines);
    }
  });

  if (session.generalNotes?.trim()) {
    lines.push('', 'GENERAL NOTES', session.generalNotes.trim());
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function formatExerciseEntry(exercise, entry) {
  if (exercise.inputType === 'rounds') {
    const roundSet = entry.sets?.[0];
    const lines = [];

    if (roundSet?.rounds) {
      lines.push(`Rounds completed: ${roundSet.rounds}`);
    }

    if (roundSet?.note?.trim()) {
      lines.push(`Notes: ${roundSet.note.trim()}`);
    }

    return lines;
  }

  if (exercise.inputType === 'ball_rounds') {
    const roundSet = entry.sets?.[0];
    const lines = [];

    if (roundSet?.ballWeight) {
      lines.push(`Ball weight: ${roundSet.ballWeight}`);
    }

    if (roundSet?.rounds) {
      lines.push(`Rounds completed: ${roundSet.rounds}`);
    }

    if (roundSet?.note?.trim()) {
      lines.push(`Notes: ${roundSet.note.trim()}`);
    }

    return lines;
  }

  if (exercise.inputType === 'notes_only') {
    const note = entry.sets?.[0]?.note?.trim();
    return note ? [`Notes: ${note}`] : [];
  }

  return (entry.sets || [])
    .map((set, index) => formatSet(exercise.inputType, set, index + 1))
    .filter(Boolean);
}

export function formatSet(inputType, set, setNumber) {
  const note = set.note?.trim();
  const noteSuffix = note ? ` (${note})` : '';

  switch (inputType) {
    case 'weight_reps':
      if (!set.kg && !set.reps && !note) return '';
      if (set.kg && set.reps) return `Set ${setNumber}: ${set.kg}kg x ${set.reps}${noteSuffix}`;
      if (set.kg) return `Set ${setNumber}: ${set.kg}kg${noteSuffix}`;
      if (set.reps) return `Set ${setNumber}: ${set.reps} reps${noteSuffix}`;
      return `Set ${setNumber}: ${note}`;
    case 'rest_pause': {
      if (!set.kg && !set.reps1 && !set.reps2 && !set.reps3 && !note) return '';
      const reps = [set.reps1, set.reps2, set.reps3].filter(Boolean).join(' + ');
      const load = set.kg ? `${set.kg}kg` : '';
      const detail = [load, reps].filter(Boolean).join(' x ');
      return `Extended set ${setNumber}: ${detail || note}${note && detail ? noteSuffix : ''}`;
    }
    case 'reps':
      if (!set.reps && !note) return '';
      return set.reps
        ? `Set ${setNumber}: ${set.reps} reps${noteSuffix}`
        : `Set ${setNumber}: ${note}`;
    case 'time':
      if (!set.time && !note) return '';
      return set.time
        ? `Set ${setNumber}: ${set.time}${noteSuffix}`
        : `Set ${setNumber}: ${note}`;
    case 'band_reps':
      if (!set.band && !set.repsOrTime && !note) return '';
      return `Set ${setNumber}: ${[set.band, set.repsOrTime]
        .filter(Boolean)
        .join(' - ')}${noteSuffix}`.trim();
    default:
      return note ? `Set ${setNumber}: ${note}` : '';
  }
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
