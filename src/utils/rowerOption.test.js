import test from 'node:test';
import assert from 'node:assert/strict';
import { cardioOptions } from '../data/cardioOptions.js';
import { makeEmptyCardioSession, normaliseCardioSession, buildCompletedCardioSession } from './cardioSession.js';
import { formatCardioSummary } from './formatCardioSummary.js';
import { getCardioFieldOptions } from './cardioFieldOptions.js';

const option = cardioOptions.options.find((item) => item.id === 'option-d-rower-intervals');

test('existing cardio drafts survive adding a blank rower option', () => {
  const old = { options: { 'option-b-home-strength-cardio': { fields: { roundsCompleted: '4' }, notes: 'Saved notes' } } };
  const fresh = normaliseCardioSession(cardioOptions, old);
  assert.equal(fresh.options['option-b-home-strength-cardio'].fields.roundsCompleted, '4');
  assert.deepEqual(fresh.options[option.id], {
    fields: { roundsCompleted: '', workSeconds: '', recoverySeconds: '' }, notes: '',
  });
});

test('rower supports eight to twelve rounds and flexible work and recovery timings without resistance', () => {
  assert.ok(getCardioFieldOptions(option.fields[0]).includes('12'));
  assert.ok(getCardioFieldOptions(option.fields[1]).includes('75'));
  assert.ok(getCardioFieldOptions(option.fields[2]).includes('40'));
  assert.equal(option.fields.some((field) => /resistance/i.test(field.id)), false);
  const entry = makeEmptyCardioSession(cardioOptions).options[option.id];
  entry.fields = { roundsCompleted: '10', workSeconds: '60', recoverySeconds: '40' };
  entry.notes = 'Used phone timer';
  const summary = formatCardioSummary('Hannah', option, entry);
  assert.match(summary, /Option D: Rower Intervals/);
  assert.match(summary, /Rounds completed: 10/);
  assert.match(summary, /Work time per round \(seconds\): 60/);
  assert.match(summary, /Recovery time per round \(seconds\): 40/);
  assert.match(summary, /Used phone timer/);
  assert.equal(buildCompletedCardioSession(option, entry, summary).optionId, option.id);
});
