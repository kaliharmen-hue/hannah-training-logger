export function formatCardioSummary(clientName, option, entry) {
  if (option.id === 'option-a-gym-incline-walk-intervals') {
    return formatOptionASummary(clientName, option, entry);
  }
  if (option.id === 'option-b-home-strength-cardio') {
    return formatOptionBSummary(clientName, option, entry);
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
    lines.push(`Skipping/low-impact option: ${field('impactOption')}`);
  }
  if (field('swingsCrisp')) {
    lines.push(`Swings crisp: ${field('swingsCrisp')}`);
  }
  if (field('gobletSquatHipComfort')) {
    lines.push(`Goblet squats hip comfort: ${field('gobletSquatHipComfort')}`);
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
