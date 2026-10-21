export function getAllExercises(programme) {
  return programme.blocks.flatMap((block) =>
    block.exercises.flatMap((exercise) => exercise.options || [exercise]),
  );
}

export function getSelectedExercise(exercise, session) {
  if (!exercise.options) return exercise;
  return exercise.options.find((option) => option.id === session.selections?.[exercise.id])
    || exercise.options[0];
}

export function getSelectedExercises(programme, session) {
  return programme.blocks.filter((block) => !block.hidden).flatMap((block) =>
    block.exercises.map((exercise) => getSelectedExercise(exercise, session)),
  );
}
