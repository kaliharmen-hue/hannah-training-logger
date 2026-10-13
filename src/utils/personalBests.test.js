import test from 'node:test';
import assert from 'node:assert/strict';
import { getPersonalBests } from './personalBests.js';
import { buildCompletedSession } from './session.js';

const programme = { id: 'new-block', blocks: [{ exercises: [
  { id: 'row', name: 'B2. DB Row', inputType: 'weight_reps' },
] }] };
const saved = (date, sets, programmeId = 'old-block') => ({
  completedAt: date, programmeId, exercises: { row: { sets } },
});

test('keeps heaviest weight for each completed rep count across programme changes', () => {
  const history = [
    saved('2026-10-13', [{ kg: '22', reps: '10' }, { kg: '24', reps: '8' }]),
    saved('2026-09-01', [{ kg: '20', reps: '10' }, { kg: '26', reps: '8' }]),
  ];
  const original = JSON.stringify(history);
  const [result] = getPersonalBests(history, programme);
  assert.deepEqual(result.records.map(({ label, value, completedAt }) => ({ label, value, completedAt })), [
    { label: '8 reps', value: 26, completedAt: '2026-09-01' },
    { label: '10 reps', value: 22, completedAt: '2026-10-13' },
  ]);
  assert.equal(JSON.stringify(history), original);
});

test('does not infer actual reps from targets or treat invalid and partial values as bests', () => {
  const [result] = getPersonalBests([saved('2026-10-13', [
    { kg: '20' }, { kg: '', reps: '12' }, { kg: 'abc', reps: '12' },
    { kg: '-10', reps: '12' }, { kg: '30', reps: 'invalid' }, { kg: '0', reps: '10' },
  ])], programme);
  assert.equal(result.records.length, 1);
  assert.equal(result.records[0].label, 'Reps not recorded');
  assert.equal(result.records[0].value, 20);
});

test('preserves names of removed exercises and keeps rest-pause separate', () => {
  const history = [saved('2026-09-01', [{ kg: '40', reps1: '12', reps2: '5', reps3: '3' }])];
  history[0].exerciseDetails = { row: { name: 'A1. Previous Row' } };
  const [result] = getPersonalBests(history, { blocks: [] });
  assert.equal(result.name, 'Previous Row');
  assert.equal(result.records[0].label, '12 + 5 + 3 reps (rest-pause)');
});

test('collects best reps, seconds and rounds and uses latest date for ties', () => {
  const [result] = getPersonalBests([
    saved('2026-10-13', [{ reps: '12', time: '20', rounds: '4' }]),
    saved('2026-09-01', [{ reps: '10', time: '20', rounds: '5' }]),
  ], programme);
  assert.deepEqual(result.records.map(({ value, unit, completedAt }) => ({ value, unit, completedAt })), [
    { value: 12, unit: 'reps', completedAt: '2026-10-13' },
    { value: 5, unit: 'rounds', completedAt: '2026-09-01' },
    { value: 20, unit: 'sec', completedAt: '2026-10-13' },
  ]);
});

test('completed sessions snapshot exercise details for future programmes', () => {
  const completed = buildCompletedSession(programme, { exercises: {}, generalNotes: '' }, 'summary');
  assert.equal(completed.exerciseDetails.row.name, 'B2. DB Row');
  assert.equal(completed.exerciseDetails.row.inputType, 'weight_reps');
});
