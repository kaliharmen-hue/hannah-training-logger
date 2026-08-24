export const programme = {
  id: 'hannah-solo-pull-posterior-metabolic-v1',
  clientName: 'Hannah',
  sessionTitle: 'Hannah Solo Day',
  notes:
    'Focus: Pull + Posterior Hypertrophy / Metabolic. Goal: quality muscle-building work with a metabolic finish.',
  generalNotesPrompt: 'How did you find this session today?',
  blocks: [
    {
      id: 'zone-1-floor-area',
      title: 'Zone 1: Floor Area',
      displayTitle: 'Floor Area',
      notes: 'Rest 60 to 75 seconds after both exercises.',
      exercises: [
        {
          id: 'barbell-hip-thrust',
          name: 'A1. Barbell Hip Thrust',
          target: '4 sets: 15, 12, 10, 8 reps',
          method: [
            'Increase the weight each set.',
            'The last 2 to 3 reps should feel challenging, but you should still be able to reach a full lockout.',
          ],
          inputType: 'weight_only',
          sets: 4,
          showNotes: false,
          setLabels: ['Set 1 - 15 reps', 'Set 2 - 12 reps', 'Set 3 - 10 reps', 'Set 4 - 8 reps'],
          cues: [
            'Ribs down',
            'Full hip extension',
            'Squeeze the glutes for 2 seconds at the top',
            'Keep the movement controlled',
          ],
          progression:
            'Try to increase the load on the final 2 sets, or improve the quality of the 2-second squeeze at the top.',
        },
        {
          id: 'rkc-plank',
          name: 'A2. RKC Plank',
          target: '3 x 15 seconds',
          method: [
            'Set the elbows slightly in front of the shoulders.',
            'Make fists and press the forearms firmly into the floor.',
            'Tuck the pelvis slightly so the ribs and pelvis move towards each other.',
            'Squeeze the glutes hard.',
            'Tighten the quads.',
            'Imagine pulling your elbows towards your toes and your toes towards your elbows without actually moving.',
            'Keep breathing while maintaining as much whole-body tension as possible.',
            'This should feel much harder than a normal plank.',
          ],
          inputType: 'time',
          sets: 3,
          showNotes: false,
          progression:
            'Once you can hold 15 seconds with full tension, progress to 20 seconds.',
        },
      ],
    },
    {
      id: 'zone-2-cable-area',
      title: 'Zone 2: Cable Area',
      displayTitle: 'Cable Area',
      notes: '3 rounds. Rest 45 to 60 seconds after the full round.',
      exercises: [
        {
          id: 'lat-pulldown',
          name: 'B1. Lat Pulldown',
          target: '3 sets x 8 to 10 reps',
          method:
            'The last 2 reps should feel challenging without losing control.',
          inputType: 'weight_reps',
          sets: 3,
          showNotes: false,
          cues: [
            'Keep shoulders down',
            'Keep wrists straight',
            'Pull elbows towards the ribs',
            'Control the return',
          ],
          progression:
            'Once you can complete 10 reps on all 3 sets cleanly, increase the weight.',
        },
        {
          id: 'single-arm-db-bench-row',
          name: 'B2. Single-Arm DB Bench Row',
          target: '3 sets x 10 to 12 reps each side',
          method: 'Take one dumbbell over to the cable area.',
          inputType: 'weight_reps',
          sets: 3,
          showNotes: false,
          setLabel: 'each side',
          cues: [
            'Support yourself on the bench',
            'Keep wrist neutral',
            'Keep the body still',
            'Pause briefly at the top',
            'Lower under control',
          ],
          progression:
            'Reach 12 controlled reps before increasing the dumbbell weight.',
        },
        {
          id: 'cable-face-pull',
          name: 'B3. Cable Face Pull',
          target: '3 sets x 12 to 15 reps',
          method:
            'Keep this lighter and controlled rather than trying to make it heavy.',
          inputType: 'weight_reps',
          sets: 3,
          showNotes: false,
          cues: [
            'Pull towards the upper face',
            'Keep shoulders down',
            'Try to get your thumbs behind your head',
            'Control the return',
          ],
          progression:
            'Build towards 15 clean reps before increasing the load.',
        },
      ],
    },
    {
      id: 'zone-3-dumbbell-bench-area',
      title: 'Zone 3: Dumbbell / Bench Area',
      displayTitle: 'Dumbbell / Bench Area',
      notes:
        '10-Minute Quality Block. Complete as many good-quality rounds as possible in 10 minutes. Rest when needed. The timer keeps running.',
      exercises: [
        {
          id: 'ten-minute-quality-block-rounds',
          name: '10-Minute Quality Block',
          target: 'Complete rounds',
          method:
            'Aim to improve either the number of quality rounds completed or the loads used over time, without rushing the movements.',
          inputType: 'rounds_only',
          sets: 1,
          showNotes: false,
        },
        {
          id: 'db-hammer-curl',
          name: 'C1. DB Hammer Curl',
          target: '10 reps',
          inputType: 'weight_only',
          sets: 1,
          showNotes: false,
          cues: [
            'Keep wrists neutral',
            'Keep elbows close to the body',
            'Avoid swinging',
            'Lower slowly',
          ],
          progression: 'Increase the weight once all 10 reps are controlled.',
        },
        {
          id: 'single-leg-db-rdl',
          name: 'C2. Single-Leg DB RDL',
          target: '8 reps each side',
          method:
            'Keep the weight moderate. This is about control rather than lifting as heavily as possible.',
          inputType: 'weight_only',
          sets: 1,
          showNotes: false,
          cues: [
            'Soft knee',
            'Keep hips square',
            'Reach the free leg backwards',
            'Keep the spine long',
            'Stop the range when you start to lose control',
          ],
          progression:
            'Improve balance, range and control first, then gradually increase the load.',
        },
        {
          id: 'side-plank-with-reach-through',
          name: 'C3. Side Plank with Reach-Through',
          target: '8 reps each side',
          inputType: 'reps',
          sets: 1,
          showNotes: false,
          cues: [
            'Keep hips lifted',
            'Stay long through the body',
            'Rotate through the upper body',
            'Do not let the hips drop',
          ],
          progression:
            'Make the movement slower and more controlled before increasing reps.',
        },
      ],
    },
  ],
};
