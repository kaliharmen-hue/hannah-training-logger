import test from 'node:test';
import assert from 'node:assert/strict';
import { cardioOptions } from '../data/cardioOptions.js';
import { makeEmptyCardioSession, normaliseCardioSession, buildCompletedCardioSession } from './cardioSession.js';
import { formatCardioSummary } from './formatCardioSummary.js';
import { getCardioFieldOptions } from './cardioFieldOptions.js';

const option = cardioOptions.options.find((item) => item.id === 'option-c-norwegian-4x4');

test('4x4 starts blank with machine dropdown and paired settings for each phase', () => {
  assert.deepEqual(option.fields.find((field) => field.id === 'activity').options,
    ['Treadmill', 'Bike', 'Rower', 'X trainer / Elliptical']);
  const entry = makeEmptyCardioSession(cardioOptions).options[option.id];
  for (const prefix of ['warmUp', 'hardInterval1', 'hardInterval2', 'hardInterval3', 'hardInterval4', 'recovery']) {
    assert.equal(entry.fields[`${prefix}Speed`], '');
    assert.equal(entry.fields[`${prefix}ResistanceIncline`], '');
  }
});

test('WhatsApp summary and saved entry retain separate speed and resistance values', () => {
  const entry = { fields: {
    activity: 'Bike', warmUpSpeed: '60 rpm', warmUpResistanceIncline: 'Level 3',
    hardInterval1Speed: '85 rpm', hardInterval1ResistanceIncline: 'Level 7',
    hardInterval2ResistanceIncline: 'Level 8', hardInterval4Speed: '80 rpm',
    recoverySpeed: '50 rpm', recoveryResistanceIncline: 'Level 2', intervalsCompleted: '4', effortConsistent: 'Mostly',
  }, notes: 'Reduced cadence on the last interval' };
  const summary = formatCardioSummary('Hannah', option, entry);
  assert.match(summary, /Activity: Bike/);
  assert.match(summary, /Warm-up: Speed: 60 rpm, Resistance \/ Incline: Level 3/);
  assert.match(summary, /1\. Speed: 85 rpm, Resistance \/ Incline: Level 7/);
  assert.match(summary, /2\. Resistance \/ Incline: Level 8/);
  assert.match(summary, /4\. Speed: 80 rpm/);
  assert.doesNotMatch(summary, /3\./);
  assert.match(summary, /Recovery setting: Speed: 50 rpm, Resistance \/ Incline: Level 2/);
  assert.match(summary, /Intervals completed: 4/);
  assert.equal(buildCompletedCardioSession(option, entry, summary).entry.fields.hardInterval1ResistanceIncline, 'Level 7');
});

test('updating the fields preserves existing drafts and their combined settings', () => {
  const saved = { options: { [option.id]: { fields: {
    activity: 'hill walk', warmUpSetting: '5 km/h at 3%', hardInterval1Setting: '6 km/h at 8%', recoverySetting: '4 km/h at 2%',
  }, notes: 'Existing notes' } } };
  const original = JSON.stringify(saved);
  const entry = normaliseCardioSession(cardioOptions, saved).options[option.id];
  assert.equal(entry.fields.activity, 'hill walk');
  assert.equal(entry.fields.warmUpSpeed, '');
  assert.match(formatCardioSummary('Hannah', option, entry), /Warm-up: 5 km\/h at 3%/);
  assert.match(formatCardioSummary('Hannah', option, entry), /1\. 6 km\/h at 8%/);
  assert.equal(JSON.stringify(saved), original);
});

test('number pickers offer precise decimal speeds and no floating-point artefacts', () => {
  const speeds = getCardioFieldOptions(option.fields.find((field) => field.id === 'warmUpSpeed'));
  assert.equal(speeds[0], '0');
  assert.equal(speeds.at(-1), '30');
  assert.ok(speeds.includes('5.8'));
  assert.equal(speeds.length, 301);
  assert.deepEqual(getCardioFieldOptions(option.fields.find((field) => field.id === 'intervalsCompleted')), ['0', '1', '2', '3', '4']);
});

test('numeric selections get units automatically, including zero incline', () => {
  const entry = { fields: { activity: 'Treadmill', settingType: 'Incline', warmUpSpeed: '4.5', warmUpResistanceIncline: '0' }, notes: '' };
  assert.match(formatCardioSummary('Hannah', option, entry), /Warm-up: Speed: 4.5 km\/h, Incline: 0%/);
  entry.fields.settingType = 'Resistance';
  entry.fields.warmUpResistanceIncline = '4';
  assert.match(formatCardioSummary('Hannah', option, entry), /Warm-up: Speed: 4.5 km\/h, Resistance: 4/);
});
