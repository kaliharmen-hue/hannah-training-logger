import test from 'node:test';
import assert from 'node:assert/strict';
import { programme } from '../data/programme.js';
import { makeEmptySession, normaliseSession, buildCompletedSession, hasSessionData } from './session.js';
import { getSelectedExercise } from './exerciseOptions.js';
import { formatWhatsAppSummary } from './formatWhatsAppSummary.js';
import { getPersonalBests } from './personalBests.js';
import { getLastCompletedForExercise } from './storage.js';

const chestSlot = programme.blocks[1].exercises[2];
const curlSlot = programme.blocks[2].exercises[0];

test('defaults to first options and creates separate three-set logs with appropriate fields', () => {
  const session = makeEmptySession(programme);
  assert.equal(getSelectedExercise(chestSlot, session).id, 'low-incline-db-chest-press');
  assert.equal(getSelectedExercise(curlSlot, session).id, 'lying-leg-curl');
  assert.equal(session.exercises['single-arm-cable-chest-press'].sets.length, 3);
  assert.deepEqual(session.exercises['swiss-ball-leg-curl'].sets, [{ reps: '' }, { reps: '' }, { reps: '' }]);
  assert.equal(hasSessionData(session, programme), false);
});

test('selection and separate draft values survive refresh and invalid selections fall back safely', () => {
  const session = makeEmptySession(programme);
  session.selections[chestSlot.id] = 'single-arm-cable-chest-press';
  session.exercises['low-incline-db-chest-press'].sets[0] = { kg: '12', reps: '15' };
  session.exercises['single-arm-cable-chest-press'].sets[0] = { kg: '8', reps: '10' };
  const restored = normaliseSession(programme, JSON.parse(JSON.stringify(session)));
  assert.equal(getSelectedExercise(chestSlot, restored).id, 'single-arm-cable-chest-press');
  assert.equal(restored.exercises['low-incline-db-chest-press'].sets[0].kg, '12');
  assert.equal(restored.exercises['single-arm-cable-chest-press'].sets[0].kg, '8');
  restored.selections[chestSlot.id] = 'not-an-option';
  assert.equal(getSelectedExercise(chestSlot, restored).id, 'low-incline-db-chest-press');
});

test('summary, history, Last time and personal bests use the selected variations only', () => {
  const session = makeEmptySession(programme);
  session.selections[chestSlot.id] = 'single-arm-cable-chest-press';
  session.selections[curlSlot.id] = 'swiss-ball-leg-curl';
  session.exercises['single-arm-cable-chest-press'].sets[0] = { kg: '8', reps: '10' };
  session.exercises['low-incline-db-chest-press'].sets[0] = { kg: '20', reps: '12' };
  session.exercises['swiss-ball-leg-curl'].sets[0] = { reps: '18' };
  const summary = formatWhatsAppSummary(programme, session);
  assert.match(summary, /B3\. Single-Arm Cable Chest Press\nSet 1: 8kg x 10 es/);
  assert.match(summary, /C1\. Swiss Ball Leg Curl\nSet 1: 18 reps/);
  assert.doesNotMatch(summary, /Low-Incline|Lying Leg Curl|20kg/);
  const completed = buildCompletedSession(programme, session, summary);
  assert.equal(completed.exercises['low-incline-db-chest-press'], undefined);
  assert.equal(completed.exerciseDetails['swiss-ball-leg-curl'].inputType, 'reps');
  assert.equal(getLastCompletedForExercise([completed], programme.id, 'lying-leg-curl'), null);
  assert.equal(getLastCompletedForExercise([completed], programme.id, 'swiss-ball-leg-curl').sets[0].reps, '18');
  assert.deepEqual(getPersonalBests([completed], programme).map((exercise) => exercise.id).sort(),
    ['single-arm-cable-chest-press', 'swiss-ball-leg-curl']);
});

test('unselected draft data does not enable saving an otherwise blank session', () => {
  const session = makeEmptySession(programme);
  session.exercises['single-arm-cable-chest-press'].sets[0] = { kg: '10', reps: '12' };
  assert.equal(hasSessionData(session, programme), false);
  session.selections[chestSlot.id] = 'single-arm-cable-chest-press';
  assert.equal(hasSessionData(session, programme), true);
});
