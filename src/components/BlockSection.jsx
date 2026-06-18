import ExerciseCard from './ExerciseCard.jsx';

export default function BlockSection({
  block,
  session,
  history,
  programmeId,
  onSetChange,
  onExerciseNoteChange,
}) {
  return (
    <section className="block-section">
      <div className="block-heading">
        <h2>{block.title}</h2>
        {block.purpose ? <p>{block.purpose}</p> : null}
        {block.notes ? <p className="fine-print">{block.notes}</p> : null}
      </div>

      <div className="exercise-list">
        {block.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            entry={session.exercises[exercise.id]}
            history={history}
            programmeId={programmeId}
            onSetChange={onSetChange}
            onExerciseNoteChange={onExerciseNoteChange}
          />
        ))}
      </div>
    </section>
  );
}
