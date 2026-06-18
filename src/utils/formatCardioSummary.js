export function formatCardioSummary(clientName, option, entry) {
  if (option.id === 'option-a-gym-incline-walk-intervals') {
    return formatOptionASummary(clientName, option, entry);
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
    `${option.label.toUpperCase()} – ${option.name}`,
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

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
