import ExerciseCard from './ExerciseCard.jsx';
import { getSelectedExercise } from '../utils/exerciseOptions.js';

export default function BlockSection({
  block,
  session,
  history,
  programmeId,
  onSetChange,
  onExerciseNoteChange,
  onExerciseSelectionChange,
}) {
  return (
    <section className="block-section">
      <div className="block-heading">
        <h2>{block.displayTitle || block.title}</h2>
        {block.purpose ? <p>{block.purpose}</p> : null}
        {block.notes ? <p className="fine-print">{block.notes}</p> : null}
      </div>

      <div className="exercise-list">
        {block.exercises.map((slot) => {
          const exercise = getSelectedExercise(slot, session);
          return (
            <ExerciseCard
              key={slot.id}
              selector={slot.options ? (
                <label className="field exercise-selector">
                  <span>{slot.name} exercise</span>
                  <select value={exercise.id} onChange={(event) => onExerciseSelectionChange(slot.id, event.target.value)}>
                    {slot.options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
                  </select>
                </label>
              ) : null}
              exercise={exercise}
              entry={session.exercises[exercise.id]}
              history={history}
              programmeId={programmeId}
              onSetChange={onSetChange}
              onExerciseNoteChange={onExerciseNoteChange}
            />
          );
        })}
      </div>
    </section>
  );
}
