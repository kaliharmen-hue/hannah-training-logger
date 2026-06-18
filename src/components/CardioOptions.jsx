import { useMemo, useState } from 'react';
import CopySummaryButton from './CopySummaryButton.jsx';
import History from './History.jsx';
import { cardioOptions } from '../data/cardioOptions.js';
import {
  buildCompletedCardioSession,
  hasCardioOptionData,
  makeEmptyCardioSession,
} from '../utils/cardioSession.js';
import { formatCardioSummary } from '../utils/formatCardioSummary.js';
import {
  clearCurrentCardioSession,
  saveCompletedCardioSession,
} from '../utils/storage.js';

export default function CardioOptions({
  cardioSession,
  setCardioSession,
  cardioHistory,
  setCardioHistory,
  copyText,
}) {
  const [selectedOptionId, setSelectedOptionId] = useState(
    cardioOptions.options[0].id,
  );
  const [status, setStatus] = useState('Cardio progress saves automatically.');
  const selectedOption = cardioOptions.options.find(
    (option) => option.id === selectedOptionId,
  );
  const selectedEntry = cardioSession.options[selectedOptionId];
  const canCopy = useMemo(
    () => hasCardioOptionData(selectedEntry),
    [selectedEntry],
  );

  const updateField = (fieldId, value) => {
    setCardioSession((current) => ({
      ...current,
      options: {
        ...current.options,
        [selectedOptionId]: {
          ...current.options[selectedOptionId],
          fields: {
            ...current.options[selectedOptionId].fields,
            [fieldId]: value,
          },
        },
      },
    }));
  };

  const updateNotes = (value) => {
    setCardioSession((current) => ({
      ...current,
      options: {
        ...current.options,
        [selectedOptionId]: {
          ...current.options[selectedOptionId],
          notes: value,
        },
      },
    }));
  };

  const copyAndSave = async () => {
    const summary = formatCardioSummary(
      cardioOptions.clientName,
      selectedOption,
      selectedEntry,
    );

    try {
      await copyText(summary);
      const completed = buildCompletedCardioSession(
        selectedOption,
        selectedEntry,
        summary,
      );
      const nextHistory = saveCompletedCardioSession(completed);
      const emptySession = makeEmptyCardioSession(cardioOptions);

      setCardioHistory(nextHistory);
      setCardioSession(clearCurrentCardioSession(emptySession));
      setStatus(`Copied and saved ${selectedOption.label}.`);
    } catch {
      setStatus('Copy failed. Select the last cardio history entry and copy it manually.');
    }
  };

  return (
    <>
      <section className="session-intro">
        <p>Choose the cardio option completed today, fill in the key details, then copy the summary for WhatsApp.</p>
      </section>

      <div className="option-switcher" role="tablist" aria-label="Cardio options">
        {cardioOptions.options.map((option) => (
          <button
            key={option.id}
            className={option.id === selectedOptionId ? 'active' : ''}
            onClick={() => setSelectedOptionId(option.id)}
            type="button"
          >
            <span>{option.label}</span>
            <strong>{option.name}</strong>
          </button>
        ))}
      </div>

      <CardioOptionCard
        option={selectedOption}
        entry={selectedEntry}
        onFieldChange={updateField}
        onNotesChange={updateNotes}
      />

      <CopySummaryButton
        disabled={!canCopy}
        status={status}
        onCopy={copyAndSave}
      />

      <History history={cardioHistory} title="Cardio history" />
    </>
  );
}

function CardioOptionCard({ option, entry, onFieldChange, onNotesChange }) {
  return (
    <article className="exercise-card cardio-card">
      <div className="exercise-topline">
        <p className="eyebrow">{option.label}</p>
        <h3>{option.name}</h3>
        <span>{option.totalTime}</span>
      </div>

      <dl className="exercise-meta">
        <dt>Equipment</dt>
        <dd>{option.equipment}</dd>
      </dl>

      <div className="cardio-structure">
        <strong>Structure</strong>
        <ul>
          {option.structure.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="support-text">{option.instructions}</p>

      {option.progression ? (
        <p className="support-text">
          <strong>Progression:</strong> {option.progression}
        </p>
      ) : null}

      <div className="cardio-fields">
        {option.fields.map((field) => (
          <label className="field" key={field.id}>
            <span>{field.label}</span>
            {field.type === 'choice' ? (
              <select
                value={entry.fields[field.id] || ''}
                onChange={(event) => onFieldChange(field.id, event.target.value)}
              >
                <option value="">Choose</option>
                {field.options.map((optionLabel) => (
                  <option key={optionLabel} value={optionLabel}>
                    {optionLabel}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={entry.fields[field.id] || ''}
                onChange={(event) => onFieldChange(field.id, event.target.value)}
                placeholder={field.placeholder}
              />
            )}
          </label>
        ))}

        <label className="field full-width">
          <span>Notes</span>
          <textarea
            value={entry.notes || ''}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder={
              option.notesPlaceholder ||
              'How did it feel? Anything to change next time?'
            }
          />
        </label>
      </div>
    </article>
  );
}
