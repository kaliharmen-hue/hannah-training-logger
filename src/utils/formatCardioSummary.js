export function formatCardioSummary(clientName, option, entry) {
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

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
