import { getLastCompletedForExercise } from '../utils/storage';
import { formatExerciseEntry } from '../utils/formatWhatsAppSummary';

export default function ExerciseCard({
  exercise,
  entry,
  history,
  programmeId,
  onSetChange,
  onExerciseNoteChange,
}) {
  const lastEntry = getLastCompletedForExercise(history, programmeId, exercise.id);
  const lastLines = lastEntry ? formatExerciseEntry(exercise, lastEntry) : [];

  return (
    <article className="exercise-card">
      <div className="exercise-topline">
        <h3>{exercise.name}</h3>
        <span>{exercise.target}</span>
      </div>

      <dl className="exercise-meta">
        {exercise.tempo ? (
          <>
            <dt>Tempo</dt>
            <dd>{exercise.tempo}</dd>
          </>
        ) : null}
        {exercise.rest ? (
          <>
            <dt>Rest</dt>
            <dd>{exercise.rest}</dd>
          </>
        ) : null}
      </dl>

      {exercise.method ? <MethodBlock method={exercise.method} /> : null}

      {exercise.cues?.length ? (
        <div className="cue-list">
          {exercise.cues.map((cue) => (
            <span key={cue}>{cue}</span>
          ))}
        </div>
      ) : null}

      {exercise.progression ? (
        <p className="support-text">
          <strong>Progression:</strong> {exercise.progression}
        </p>
      ) : null}

      {exercise.modification ? (
        <p className="support-text">
          <strong>Modify:</strong> {exercise.modification}
        </p>
      ) : null}

      <LastTime lines={lastLines} note={lastEntry?.note} />

      <div className="set-list">
        {(entry?.sets || []).map((set, index) => (
          <SetInputs
            key={index}
            exercise={exercise}
            set={set}
            setIndex={index}
            onSetChange={onSetChange}
          />
        ))}
      </div>

      {exercise.inputType !== 'notes_only' ? (
        <label className="field full-width">
          <span>Exercise notes</span>
          <input
            value={entry?.note || ''}
            onChange={(event) =>
              onExerciseNoteChange(exercise.id, event.target.value)
            }
            placeholder="Optional"
          />
        </label>
      ) : null}
    </article>
  );
}

function MethodBlock({ method }) {
  if (Array.isArray(method)) {
    return (
      <div className="method-block">
        <strong>Method</strong>
        <ul>
          {method.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <p className="support-text">
      <strong>Method:</strong> {method}
    </p>
  );
}

function LastTime({ lines, note }) {
  if (!lines.length && !note?.trim()) {
    return <p className="last-time empty">Last time: no previous data yet</p>;
  }

  return (
    <div className="last-time">
      <strong>Last time</strong>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {note?.trim() ? <p>Notes: {note.trim()}</p> : null}
    </div>
  );
}

function SetInputs({ exercise, set, setIndex, onSetChange }) {
  const update = (field, value) => {
    onSetChange(exercise.id, setIndex, field, value);
  };

  if (exercise.inputType === 'rounds') {
    return (
      <div className="set-row single">
        <label className="field">
          <span>Rounds completed</span>
          <input
            inputMode="numeric"
            value={set.rounds || ''}
            onChange={(event) => update('rounds', event.target.value)}
            placeholder="0"
          />
        </label>
        <label className="field">
          <span>Notes</span>
          <input
            value={set.note || ''}
            onChange={(event) => update('note', event.target.value)}
            placeholder="Optional"
          />
        </label>
      </div>
    );
  }

  if (exercise.inputType === 'ball_rounds') {
    return (
      <div className="set-row single">
        <label className="field">
          <span>Ball weight</span>
          <input
            inputMode="decimal"
            value={set.ballWeight || ''}
            onChange={(event) => update('ballWeight', event.target.value)}
            placeholder="0kg"
          />
        </label>
        <label className="field">
          <span>Rounds completed</span>
          <input
            inputMode="numeric"
            value={set.rounds || ''}
            onChange={(event) => update('rounds', event.target.value)}
            placeholder="0"
          />
        </label>
        <label className="field">
          <span>Notes</span>
          <input
            value={set.note || ''}
            onChange={(event) => update('note', event.target.value)}
            placeholder="Optional"
          />
        </label>
      </div>
    );
  }

  if (exercise.inputType === 'slam_ball_rounds') {
    return (
      <div className="set-row slam-ball-row">
        <label className="round-check">
          <input
            type="checkbox"
            checked={Boolean(set.done)}
            onChange={(event) => update('done', event.target.checked)}
          />
          <span>Round {setIndex + 1}</span>
        </label>
        <label className="field">
          <span>Ball weight</span>
          <input
            inputMode="decimal"
            value={set.ballWeight || ''}
            onChange={(event) => update('ballWeight', event.target.value)}
            placeholder="0kg"
          />
        </label>
      </div>
    );
  }

  if (exercise.inputType === 'notes_only') {
    return (
      <label className="field full-width">
        <span>Notes</span>
        <textarea
          value={set.note || ''}
          onChange={(event) => update('note', event.target.value)}
          placeholder="Write what happened"
        />
      </label>
    );
  }

  return (
    <div className={`set-row ${exercise.inputType === 'rest_pause' ? 'rest-pause-row' : ''}`}>
      <span className="set-number">Set {setIndex + 1}</span>
      {renderMainFields(exercise.inputType, set, update)}
    </div>
  );
}

function renderMainFields(inputType, set, update) {
  if (inputType === 'weight_reps') {
    return (
      <>
        <label className="field compact">
          <span>Kg</span>
          <input
            inputMode="decimal"
            value={set.kg || ''}
            onChange={(event) => update('kg', event.target.value)}
            placeholder="0"
          />
        </label>
        <label className="field compact">
          <span>Reps</span>
          <input
            inputMode="numeric"
            value={set.reps || ''}
            onChange={(event) => update('reps', event.target.value)}
            placeholder="0"
          />
        </label>
      </>
    );
  }

  if (inputType === 'rest_pause') {
    return (
      <>
        <label className="field compact">
          <span>Kg</span>
          <input
            inputMode="decimal"
            value={set.kg || ''}
            onChange={(event) => update('kg', event.target.value)}
            placeholder="0"
          />
        </label>
        <label className="field compact">
          <span>Reps 1</span>
          <input
            inputMode="numeric"
            value={set.reps1 || ''}
            onChange={(event) => update('reps1', event.target.value)}
            placeholder="12-15"
          />
        </label>
        <label className="field compact">
          <span>Reps 2</span>
          <input
            inputMode="numeric"
            value={set.reps2 || ''}
            onChange={(event) => update('reps2', event.target.value)}
            placeholder="4-6"
          />
        </label>
        <label className="field compact">
          <span>Reps 3</span>
          <input
            inputMode="numeric"
            value={set.reps3 || ''}
            onChange={(event) => update('reps3', event.target.value)}
            placeholder="3-5"
          />
        </label>
      </>
    );
  }

  if (inputType === 'reps') {
    return (
      <label className="field compact">
        <span>Reps</span>
        <input
          inputMode="numeric"
          value={set.reps || ''}
          onChange={(event) => update('reps', event.target.value)}
          placeholder="0"
        />
      </label>
    );
  }

  if (inputType === 'time') {
    return (
      <label className="field compact">
        <span>Time</span>
        <input
          value={set.time || ''}
          onChange={(event) => update('time', event.target.value)}
          placeholder="20 sec"
        />
      </label>
    );
  }

  if (inputType === 'band_reps') {
    return (
      <>
        <label className="field compact">
          <span>Band</span>
          <input
            value={set.band || ''}
            onChange={(event) => update('band', event.target.value)}
            placeholder="Light"
          />
        </label>
        <label className="field compact">
          <span>Reps/time</span>
          <input
            value={set.repsOrTime || ''}
            onChange={(event) => update('repsOrTime', event.target.value)}
            placeholder="20"
          />
        </label>
      </>
    );
  }

  return null;
}
