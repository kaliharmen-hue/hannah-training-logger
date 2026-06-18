export const cardioOptions = {
  clientName: 'Hannah',
  title: 'Cardio Options',
  options: [
    {
      id: 'option-a-gym-incline-walk-intervals',
      label: 'Option A',
      name: 'Gym Incline Walk Intervals',
      equipment: 'Treadmill or suitable gym cardio machine',
      totalTime: '20 minutes',
      structure: [
        '5 minutes easy warm-up',
        '10 rounds: 30 seconds strong effort / 60 seconds easy',
        '2 to 3 minutes easy cool-down',
      ],
      instructions:
        'Use a strong but controlled effort during the 30-second intervals. It should feel challenging, but not like a sprint. Use the easy intervals to recover enough to repeat the next round well.',
      fields: [
        { id: 'speed', label: 'Speed', placeholder: 'e.g. 5.8 km/h' },
        { id: 'incline', label: 'Incline', placeholder: 'e.g. 8%' },
        { id: 'roundsCompleted', label: 'Rounds completed', placeholder: '0' },
      ],
    },
    {
      id: 'option-b-home-strength-cardio',
      label: 'Option B',
      name: 'Home Strength-Cardio',
      equipment:
        '12kg kettlebell, heavy glute band, small resistance bands, skipping rope, timer/stopwatch',
      totalTime: 'Around 20 minutes, depending on rest taken',
      structure: [
        '4 rounds:',
        '40 seconds kettlebell swings',
        '40 seconds band lateral walk',
        '40 seconds skipping or low-impact step jacks',
        '40 seconds kettlebell goblet squat',
        'Rest as needed before starting the next round',
      ],
      instructions:
        'Time your rest between rounds and record how long you needed before starting the next round. Keep swings crisp and powerful. Keep goblet squats controlled and only squat to a range that feels comfortable through the hip. Use low-impact step jacks or marching instead of skipping if jumping does not feel good.',
      progression:
        'Start with 4 rounds. Progress by improving consistency and control first. Over time, aim to need slightly less rest between rounds or complete the same work with better quality. Do not reduce rest if form or hip comfort worsens.',
      fields: [
        { id: 'roundsCompleted', label: 'Rounds completed', placeholder: '0' },
        {
          id: 'restBetweenRounds',
          label: 'Rest between rounds',
          placeholder: 'e.g. 90 sec',
        },
        {
          id: 'impactOption',
          label: 'Skipping or low-impact option',
          placeholder: 'e.g. skipping',
        },
      ],
    },
    {
      id: 'option-c-norwegian-4x4',
      label: 'Option C',
      name: 'Norwegian 4x4',
      equipment:
        'Treadmill, bike, rower, outdoor hill, or suitable cardio machine',
      totalTime: '28 to 35 minutes',
      structure: [
        '5 to 8 minutes warm-up',
        '4 minutes hard effort',
        '3 minutes easy recovery',
        'Repeat hard/recovery intervals for 4 total hard efforts',
        '3 to 5 minutes cool-down',
      ],
      instructions:
        'Hard but controlled. The 4-minute efforts should feel challenging, but not like a sprint. The goal is to complete all 4 intervals with consistent effort.',
      fields: [
        {
          id: 'activity',
          label: 'Activity/machine used',
          placeholder: 'e.g. treadmill',
        },
        {
          id: 'intervalsCompleted',
          label: 'Intervals completed',
          placeholder: '0',
        },
      ],
    },
  ],
};
