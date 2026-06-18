export function makeEmptyCardioSession(cardioOptions) {
  const options = {};

  cardioOptions.options.forEach((option) => {
    options[option.id] = {
      fields: option.fields.reduce(
        (values, field) => ({ ...values, [field.id]: '' }),
        {},
      ),
      notes: '',
    };
  });

  return {
    updatedAt: new Date().toISOString(),
    options,
  };
}

export function normaliseCardioSession(cardioOptions, session) {
  const fresh = makeEmptyCardioSession(cardioOptions);
  if (!session?.options) return fresh;

  cardioOptions.options.forEach((option) => {
    fresh.options[option.id] = {
      fields: {
        ...fresh.options[option.id].fields,
        ...(session.options[option.id]?.fields || {}),
      },
      notes: session.options[option.id]?.notes || '',
    };
  });

  fresh.updatedAt = session.updatedAt || fresh.updatedAt;
  return fresh;
}

export function hasCardioOptionData(entry) {
  return Boolean(
    entry?.notes?.trim() ||
      Object.values(entry?.fields || {}).some((value) =>
        String(value || '').trim(),
      ),
  );
}

export function buildCompletedCardioSession(option, entry, summary) {
  return {
    id: crypto.randomUUID?.() || `${Date.now()}`,
    optionId: option.id,
    optionLabel: option.label,
    sessionName: option.name,
    completedAt: new Date().toISOString(),
    entry,
    summary,
  };
}
