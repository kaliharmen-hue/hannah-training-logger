export const programme = {
  id: 'hannah-solo-gym-placeholder-v1',
  clientName: 'Hannah',
  sessionTitle: 'Solo Gym Session',
  notes:
    "Placeholder programme for testing the app layout. Replace this file with Hannah's final programme when ready.",
  blocks: [
    {
      id: 'zone-1-leg-press-area',
      title: 'Zone 1 - Leg Press Area',
      purpose: 'Heavy lower-body work without moving around the gym.',
      exercises: [
        {
          id: 'leg-press',
          name: 'Leg Press',
          target: '4 sets: 12, 10, 8, 15 back-off',
          tempo: 'Controlled 3 second lowering',
          rest: '60-90 seconds',
          inputType: 'weight_reps',
          sets: 4,
          cues: [
            'Whole foot on the plate',
            'Big toe, little toe, heel',
            'Do not roll onto the outside edge of the foot',
          ],
          progression:
            'Add load when all reps are clean, controlled and hip feels fine.',
        },
        {
          id: 'push-ups',
          name: 'Push-Ups',
          target: '3 sets x 6-12 reps',
          rest: '45-60 seconds',
          inputType: 'reps',
          sets: 3,
          cues: [
            'Strong plank position',
            'Ribs down',
            'Lower with control',
          ],
          progression:
            'Add reps first. Make the exercise harder only when all sets are clean.',
        },
      ],
    },
    {
      id: 'zone-2-cable-rack-area',
      title: 'Zone 2 - Cable Rack Area',
      purpose: 'Complete cable work before moving to another area.',
      exercises: [
        {
          id: 'lat-pulldown',
          name: 'Lat Pulldown',
          target: '3 sets x 10-12 reps',
          rest: '60 seconds',
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Pull elbows down towards pockets',
            'Keep ribs down',
            'Do not lean back excessively',
          ],
          progression: 'Add load when all sets reach 12 reps with control.',
        },
        {
          id: 'cable-glute-kickback',
          name: 'Cable Glute Kickback',
          target: '3 sets x 10-15 each side',
          rest: '45-60 seconds',
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Keep pelvis still',
            'Squeeze glute at the top',
            'Do not arch lower back',
          ],
          progression: 'Add reps first, then load.',
          setLabel: 'per side',
        },
      ],
    },
    {
      id: 'zone-3-db-area',
      title: 'Zone 3 - DB Area',
      purpose: 'Dumbbell, bench, bodyweight and band exercises.',
      exercises: [
        {
          id: 'reverse-lunge',
          name: 'Reverse Lunge',
          target: '3 sets x 8-10 each side',
          rest: '60-90 seconds',
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Front foot heavy',
            'Big toe, little toe, heel',
            'Step back quietly',
            'Keep pelvis level',
          ],
          progression:
            'Add reps first. Add load only when both sides stay controlled.',
          setLabel: 'per side',
        },
        {
          id: 'db-lateral-raise',
          name: 'DB Lateral Raise',
          target: '3 sets x 12-15 reps',
          rest: '45-60 seconds',
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Soft elbows',
            'Lift to shoulder height',
            'Keep neck relaxed',
          ],
          progression: 'Add reps before increasing weight.',
        },
        {
          id: 'band-abductions',
          name: 'Band Abductions',
          target: '3 sets x 20-50 reps',
          rest: '45 seconds',
          inputType: 'band_reps',
          sets: 3,
          cues: [
            'Stay tall',
            'Move from the side glutes',
            'Do not rock through the body',
          ],
          progression:
            'Increase reps or band tension when control is good.',
        },
      ],
    },
    {
      id: 'zone-4-machine-area',
      title: 'Zone 4 - Machine Area',
      purpose: 'Future progression or exercise swaps when variety is needed.',
      notes:
        'Available equipment: Leg Extension, Leg Curl, Standing Glute Machine.',
      exercises: [
        {
          id: 'seated-or-lying-leg-curl',
          name: 'Seated or Lying Leg Curl',
          target: '3 sets x 10-15 reps',
          rest: '60 seconds',
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Control the lowering',
            'Keep hips still',
            'Do not rush the reps',
          ],
          progression: 'Add reps first, then load.',
        },
      ],
    },
    {
      id: 'zone-5-optional-conditioning-area',
      title: 'Zone 5 - Optional Conditioning Area',
      purpose: 'Optional finishers.',
      exercises: [
        {
          id: 'slam-ball-finisher',
          name: 'Slam Ball Finisher',
          target: '6 rounds: 20 seconds work / 40 seconds rest',
          inputType: 'rounds',
          cues: [
            'Powerful but controlled',
            'Brace before each slam',
            'Stop if hip pain increases',
          ],
          progression:
            'Add rounds or increase work time only if recovery is good.',
        },
      ],
    },
  ],
};
