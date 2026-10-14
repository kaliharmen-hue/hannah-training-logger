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
        {
          id: 'warmUpSpeed',
          label: 'Warm-up speed',
          placeholder: 'e.g. 4.5 km/h',
        },
        {
          id: 'warmUpIncline',
          label: 'Warm-up incline',
          placeholder: 'e.g. 2%',
        },
        {
          id: 'hardSpeedRange',
          label: 'Hard interval speed range',
          placeholder: 'e.g. 5.5 to 6.2 km/h',
        },
        {
          id: 'hardInclineRange',
          label: 'Hard interval incline range',
          placeholder: 'e.g. 8 to 12%',
        },
        {
          id: 'easySpeed',
          label: 'Easy recovery speed',
          placeholder: 'e.g. 4.5 km/h',
        },
        {
          id: 'easyIncline',
          label: 'Easy recovery incline',
          placeholder: 'e.g. 2 to 4%',
        },
        {
          id: 'roundsCompleted',
          label: 'Rounds completed',
          placeholder: 'e.g. 10',
        },
        {
          id: 'speedInclineChanges',
          label: 'Did speed or incline change during the session?',
          placeholder: 'e.g. Incline increased from round 5',
        },
      ],
      notesPlaceholder:
        'e.g. Started at 8% incline, increased to 10% from round 5.',
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
        {
          id: 'roundsCompleted',
          label: 'Rounds completed',
          placeholder: 'e.g. 4',
        },
        {
          id: 'restAfterRound1',
          label: 'Rest after round 1',
          placeholder: 'e.g. 60 sec',
        },
        {
          id: 'restAfterRound2',
          label: 'Rest after round 2',
          placeholder: 'e.g. 75 sec',
        },
        {
          id: 'restAfterRound3',
          label: 'Rest after round 3',
          placeholder: 'e.g. 90 sec',
        },
        {
          id: 'restAfterRound4',
          label: 'Rest after round 4',
          placeholder: 'e.g. not needed',
        },
        {
          id: 'impactOption',
          label: 'What was low-impact option if used',
          placeholder: 'e.g. skipping / step jacks / marching',
        },
      ],
      notesPlaceholder:
        'e.g. Needed longer rest by round 3, squats felt fine, skipping felt heavy.',
    },
    {
      id: 'option-c-norwegian-4x4',
      label: 'Option C',
      name: 'Norwegian 4x4',
      equipment:
        'Treadmill, bike, rower or X trainer / Elliptical',
      totalTime: '33 to 38 minutes',
      structure: [
        '5 to 8 minutes warm-up',
        '4 minutes hard effort',
        '3 minutes easy active recovery between hard efforts',
        'Complete 4 hard efforts, with 3 recoveries between them',
        '3 to 5 minutes cool-down',
      ],
      instructions:
        'Aim for WHOOP Zone 4 towards the end of each 4-minute hard effort. Let your heart rate build gradually; you do not need to be in Zone 4 from the first second. You should be very short of breath, with speaking in full sentences difficult, but still able to finish the full 4 minutes and repeat all 4 efforts. Do not chase Zone 5. Use WHOOP alongside how the effort feels, rather than increasing the pace just to make the reading rise. Adjust speed or resistance / incline to keep the effort consistent. Keep moving easily during the 3-minute recoveries so your breathing settles before the next effort.',
      fields: [
        {
          id: 'activity',
          label: 'Activity/machine used',
          type: 'choice',
          options: ['Treadmill', 'Bike', 'Rower', 'X trainer / Elliptical'],
        },
        {
          id: 'warmUpSpeed',
          label: 'Warm-up speed',
          placeholder: 'e.g. 5 km/h, 60 rpm or 2:30/500m',
          paired: true,
        },
        {
          id: 'warmUpResistanceIncline',
          label: 'Warm-up Resistance / Incline',
          placeholder: 'e.g. 3% or level 4',
          paired: true,
        },
        {
          id: 'hardInterval1Speed',
          label: 'Hard interval 1 speed',
          placeholder: 'Speed / cadence / pace',
          paired: true,
        },
        {
          id: 'hardInterval1ResistanceIncline',
          label: 'Hard interval 1 Resistance / Incline',
          placeholder: 'e.g. 8% or level 6',
          paired: true,
        },
        {
          id: 'hardInterval2Speed',
          label: 'Hard interval 2 speed',
          placeholder: 'Speed / cadence / pace',
          paired: true,
        },
        {
          id: 'hardInterval2ResistanceIncline',
          label: 'Hard interval 2 Resistance / Incline',
          placeholder: 'e.g. 9% or level 6',
          paired: true,
        },
        {
          id: 'hardInterval3Speed',
          label: 'Hard interval 3 speed',
          placeholder: 'Speed / cadence / pace',
          paired: true,
        },
        {
          id: 'hardInterval3ResistanceIncline',
          label: 'Hard interval 3 Resistance / Incline',
          placeholder: 'e.g. 9% or level 6',
          paired: true,
        },
        {
          id: 'hardInterval4Speed',
          label: 'Hard interval 4 speed',
          placeholder: 'Speed / cadence / pace',
          paired: true,
        },
        {
          id: 'hardInterval4ResistanceIncline',
          label: 'Hard interval 4 Resistance / Incline',
          placeholder: 'e.g. 9% or level 6',
          paired: true,
        },
        {
          id: 'recoverySpeed',
          label: 'Recovery speed',
          placeholder: 'Speed / cadence / pace',
          paired: true,
        },
        {
          id: 'recoveryResistanceIncline',
          label: 'Recovery Resistance / Incline',
          placeholder: 'e.g. 2% or level 2',
          paired: true,
        },
        {
          id: 'intervalsCompleted',
          label: 'Intervals completed',
          placeholder: 'e.g. 4',
        },
        {
          id: 'effortConsistent',
          label: 'Did the effort stay consistent?',
          type: 'choice',
          options: ['Yes', 'Mostly', 'No'],
        },
      ],
      notesPlaceholder:
        'e.g. First two felt strong, last two needed slightly lower speed.',
    },
  ],
};
