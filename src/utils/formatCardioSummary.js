export function formatCardioSummary(clientName, option, entry) {
  if (option.id === 'option-a-gym-incline-walk-intervals') {
    return formatOptionASummary(clientName, option, entry);
  }
  if (option.id === 'option-b-home-strength-cardio') {
    return formatOptionBSummary(clientName, option, entry);
  }
  if (option.id === 'option-c-norwegian-4x4') {
    return formatOptionCSummary(clientName, option, entry);
  }

  const lines = [
    `${clientName.toUpperCase()} CARDIO LOG`,
    '',
    `Date: ${formatDate(new Date())}`,
    `${option.label}: ${option.name}`,
    `Equipment: ${option.equipment}`,
    `Total time: ${option.totalTime}`,
  ];

  const completedLines = option.fields
    .map((field) => {
      const value = entry.fields?.[field.id]?.trim();
      return value ? `${field.label}: ${value}` : '';
    })
    .filter(Boolean);

  if (completedLines.length) {
    lines.push('', 'COMPLETED', ...completedLines);
  }

  if (entry.notes?.trim()) {
    lines.push('', 'NOTES', entry.notes.trim());
  }

  return lines.join('\n').trim();
}

function formatOptionASummary(clientName, option, entry) {
  const field = (id) => entry.fields?.[id]?.trim();
  const notes = [field('speedInclineChanges'), entry.notes?.trim()]
    .filter(Boolean)
    .join(' ');
  const lines = [
    `${clientName.toUpperCase()} CARDIO LOG`,
    '',
    `Date: ${formatDate(new Date())}`,
    `${option.label.toUpperCase()} - ${option.name}`,
  ];

  const warmUp = formatSpeedInclineLine(
    'Warm-up',
    field('warmUpSpeed'),
    field('warmUpIncline'),
  );
  const hardIntervals = formatSpeedInclineLine(
    'Hard intervals',
    field('hardSpeedRange'),
    field('hardInclineRange'),
  );
  const easyRecoveries = formatSpeedInclineLine(
    'Easy recoveries',
    field('easySpeed'),
    field('easyIncline'),
  );

  if (warmUp) lines.push(warmUp);
  if (hardIntervals) lines.push(hardIntervals);
  if (easyRecoveries) lines.push(easyRecoveries);
  if (field('roundsCompleted')) {
    lines.push(`Rounds completed: ${field('roundsCompleted')}`);
  }
  if (notes) lines.push(`Notes: ${notes}`);

  return lines.join('\n').trim();
}

function formatSpeedInclineLine(label, speed, incline) {
  if (speed && incline) return `${label}: ${speed} at ${incline}`;
  if (speed) return `${label}: ${speed}`;
  if (incline) return `${label}: ${incline}`;
  return '';
}

function formatOptionBSummary(clientName, option, entry) {
  const field = (id) => entry.fields?.[id]?.trim();
  const restParts = [
    field('restAfterRound1') ? `R1 ${field('restAfterRound1')}` : '',
    field('restAfterRound2') ? `R2 ${field('restAfterRound2')}` : '',
    field('restAfterRound3') ? `R3 ${field('restAfterRound3')}` : '',
    field('restAfterRound4') ? `R4 ${field('restAfterRound4')}` : '',
  ].filter(Boolean);
  const lines = [
    `${clientName.toUpperCase()} CARDIO LOG`,
    '',
    `Date: ${formatDate(new Date())}`,
    `${option.label.toUpperCase()} - ${option.name}`,
  ];

  if (field('roundsCompleted')) {
    lines.push(`Rounds completed: ${field('roundsCompleted')}`);
  }
  if (restParts.length) {
    lines.push(`Rest: ${restParts.join(', ')}`);
  }
  if (field('impactOption')) {
    lines.push(`Low-impact option: ${field('impactOption')}`);
  }
  if (entry.notes?.trim()) {
    lines.push(`Notes: ${entry.notes.trim()}`);
  }

  return lines.join('\n').trim();
}

function formatOptionCSummary(clientName, option, entry) {
  const field = (id) => entry.fields?.[id]?.trim();
  const setting = (prefix) => {
    const speed = field(`${prefix}Speed`);
    const resistance = field(`${prefix}ResistanceIncline`);
    const type = field('settingType') || 'Resistance / Incline';
    const numeric = (value) => /^\d+(\.\d+)?$/.test(value || '');
    const parts = [
      speed ? `Speed: ${speed}${numeric(speed) ? ' km/h' : ''}` : '',
      resistance ? `${type}: ${resistance}${type === 'Incline' && numeric(resistance) ? '%' : ''}` : '',
    ].filter(Boolean);
    const previous = field(`${prefix}Setting`);
    if (parts.length) return parts.join(', ') + (previous ? ` (previously entered: ${previous})` : '');
    return previous;
  };
  const hardIntervals = [
    setting('hardInterval1'),
    setting('hardInterval2'),
    setting('hardInterval3'),
    setting('hardInterval4'),
  ];
  const lines = [
    `${clientName.toUpperCase()} CARDIO LOG`,
    '',
    `Date: ${formatDate(new Date())}`,
    `${option.label.toUpperCase()} - ${option.name}`,
  ];

  if (field('activity')) lines.push(`Activity: ${field('activity')}`);
  if (field('settingType')) lines.push(`Setting type: ${field('settingType')}`);
  if (setting('warmUp')) lines.push(`Warm-up: ${setting('warmUp')}`);

  if (hardIntervals.some(Boolean)) {
    lines.push('Hard intervals:');
    hardIntervals.forEach((interval, index) => {
      if (interval) lines.push(`${index + 1}. ${interval}`);
    });
  }

  if (setting('recovery')) {
    lines.push(`Recovery setting: ${setting('recovery')}`);
  }
  if (field('intervalsCompleted')) {
    lines.push(`Intervals completed: ${field('intervalsCompleted')}`);
  }
  if (field('effortConsistent')) {
    lines.push(`Effort stayed consistent: ${field('effortConsistent')}`);
  }
  if (entry.notes?.trim()) {
    lines.push(`Notes: ${entry.notes.trim()}`);
  }

  return lines.join('\n').trim();
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
