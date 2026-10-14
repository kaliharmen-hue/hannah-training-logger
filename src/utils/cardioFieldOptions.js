export function getCardioFieldOptions(field) {
  if (field.type !== 'number_picker') return field.options || [];
  const count = Math.round((field.max - field.min) / field.step) + 1;
  return Array.from({ length: count }, (_, index) =>
    String(Number((field.min + index * field.step).toFixed(3))),
  );
}
