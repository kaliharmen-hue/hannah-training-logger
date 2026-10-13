import test from 'node:test';
import assert from 'node:assert/strict';
import { programme } from '../data/programme.js';
import { makeEmptySession, normaliseSession, buildCompletedSession } from './session.js';
import { getLastCompletedForExercise } from './storage.js';
import { formatWhatsAppSummary } from './formatWhatsAppSummary.js';
import { getPersonalBests } from './personalBests.js';

test('new programme starts blank and keeps completed entries available across blocks', () => {
  const oldEntry = { sets: [{ kg: '35', reps: '12' }], note: '' };
  const history = [
    { programmeId: programme.id, exercises: { 'lat-pulldown': { sets: [{ kg: '', reps: '' }] } } },
    { programmeId: 'previous-programme', exercises: { 'lat-pulldown': oldEntry } },
  ];
  const original = JSON.stringify(history);
  const fresh = normaliseSession(programme, {
    programmeId: 'previous-programme', exercises: { 'lat-pulldown': oldEntry }, generalNotes: 'Old notes',
  });
  assert.equal(fresh.exercises['lat-pulldown'].sets[0].kg, '');
  assert.equal(fresh.generalNotes, '');
  assert.equal(getLastCompletedForExercise(history, programme.id, 'lat-pulldown'), oldEntry);
  assert.equal(JSON.stringify(history), original);
});

test('all four blocks have the prescribed rounds and conditioning fields', () => {
  const fresh = makeEmptySession(programme);
  assert.deepEqual(programme.blocks.map((block) => block.exercises.length), [2, 3, 3, 3]);
  for (const [index, block] of programme.blocks.entries()) {
    for (const exercise of block.exercises) {
      assert.equal(fresh.exercises[exercise.id].sets.length, index === 0 ? 4 : 3);
      assert.equal(exercise.showNotes, false);
    }
  }
  assert.deepEqual(fresh.exercises['kb-swing'].sets[0], { kg: '', reps: '' });
  assert.deepEqual(fresh.exercises['bodyweight-squat-jump'].sets[0], { reps: '' });
  assert.deepEqual(fresh.exercises['alternating-db-snatch-from-floor'].sets[0], { kg: '', reps: '' });
});

test('WhatsApp summary includes logged conditioning and each-side reps and updates personal bests', () => {
  const session = makeEmptySession(programme);
  session.exercises['kb-swing'].sets[0] = { kg: '16', reps: '20' };
  session.exercises['bodyweight-squat-jump'].sets[0] = { reps: '10' };
  session.exercises['alternating-db-snatch-from-floor'].sets[0] = { kg: '8', reps: '6' };
  session.generalNotes = 'Felt strong today';
  const summary = formatWhatsAppSummary(programme, session);
  assert.match(summary, /Session: Solo Full-Body Metabolic/);
  assert.match(summary, /Set 1: 16kg x 20/);
  assert.match(summary, /Set 1: 10 reps/);
  assert.match(summary, /Set 1: 8kg x 6 es/);
  assert.match(summary, /GENERAL NOTES\nFelt strong today/);
  assert.doesNotMatch(summary, /Set 2:|Lat Pulldown/);
  const completed = buildCompletedSession(programme, session, summary);
  const bests = getPersonalBests([completed], programme);
  assert.equal(bests.find((exercise) => exercise.id === 'alternating-db-snatch-from-floor').records[0].value, 8);
});
