import { getAllExercises } from './exerciseOptions.js';

function number(value) {
  const text = String(value ?? '').trim();
  if (!/^\d+(?:[.,]\d+)?$/.test(text)) return null;
  const result = Number(text.replace(',', '.'));
  return Number.isFinite(result) && result > 0 ? result : null;
}

function exerciseName(name) {
  return name.replace(/^[A-Z]?\d+[A-Z]?\.\s*/i, '');
}

export function getPersonalBests(history, programme) {
  const current = Object.fromEntries(getAllExercises(programme).map((exercise) => [exercise.id, exercise]));
  const exercises = new Map();

  for (const session of history) {
    for (const [id, entry] of Object.entries(session.exercises || {})) {
      const details = session.exerciseDetails?.[id] || current[id];
      const name = exerciseName(details?.name || id.split('-').map((word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
      ).join(' '));
      const exercise = exercises.get(id) || { id, name, records: new Map() };

      const add = (key, label, value, unit) => {
        if (value === null) return;
        const previous = exercise.records.get(key);
        if (!previous || value > previous.value || (value === previous.value &&
          String(session.completedAt) > String(previous.completedAt))) {
          exercise.records.set(key, { key, label, value, unit, completedAt: session.completedAt });
        }
      };

      for (const set of entry.sets || []) {
        const kg = number(set.kg);
        const reps = number(set.reps);
        if (['reps1', 'reps2', 'reps3'].some((key) => key in set)) {
          // Rest-pause parts stay separate from uninterrupted sets.
          const parts = [set.reps1, set.reps2, set.reps3].map(number);
          if (kg !== null && parts.every((part) => part !== null)) {
            const pattern = parts.join(' + ');
            add(`rest-pause:${pattern}`, `${pattern} reps (rest-pause)`, kg, 'kg');
          }
        } else if ('kg' in set) {
          if (kg !== null && reps !== null) {
            add(`reps:${reps}`, `${reps} reps${details?.setLabel ? ` ${details.setLabel}` : ''}`, kg, 'kg');
          } else if (kg !== null && !String(set.reps ?? '').trim()) {
            add('weight', 'Reps not recorded', kg, 'kg');
          }
        } else if ('reps' in set) {
          add('reps', `Most reps${details?.setLabel ? ` ${details.setLabel}` : ''}`, reps, 'reps');
        }
        add('time', 'Longest hold', number(set.time), 'sec');
        add('rounds', 'Most rounds', number(set.rounds), 'rounds');
      }
      if (exercise.records.size) exercises.set(id, exercise);
    }
  }

  return [...exercises.values()].map((exercise) => ({
    ...exercise,
    records: [...exercise.records.values()].sort((a, b) =>
      a.key.localeCompare(b.key, 'en', { numeric: true }),
    ),
  })).sort((a, b) => a.name.localeCompare(b.name));
}
