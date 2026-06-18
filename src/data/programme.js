export const programme = {
  id: 'hannah-solo-gym-anterior-push-metabolic-v1',
  clientName: 'Hannah',
  sessionTitle: 'Solo Gym Session',
  notes:
    'Focus: anterior / push-biased metabolic session. Goal: fat loss, body recomposition, shoulders/chest/arms, quads, high output, minimal equipment faff.',
  generalNotesPrompt:
    'Record anything useful here, especially hip comfort, energy, anything that felt awkward, and whether the session felt manageable within the time available.',
  blocks: [
    {
      id: 'zone-1-leg-press-area',
      title: 'Zone - Leg Press Area',
      displayTitle: 'Leg Press Area',
      purpose: 'Heavy lower-body and trunk work without moving around the gym.',
      notes: 'Rest 75 to 90 seconds before repeating the block.',
      exercises: [
        {
          id: 'leg-press-rest-pause',
          name: 'Leg Press Rest-Pause',
          target: '2 to 3 extended sets',
          method: [
            '12 to 15 reps',
            'Rest 20 seconds',
            '4 to 6 reps',
            'Rest 20 seconds',
            '3 to 5 reps',
          ],
          inputType: 'rest_pause',
          sets: 3,
          cues: [
            'Whole foot on the plate',
            'Big toe, little toe, heel',
            'Control the lowering',
            'Do not let knees collapse in',
            'Stop just before the pelvis tucks under',
            'Keep the reps smooth, not rushed',
          ],
          progression:
            'Start by completing 2 clean extended sets. Build towards 3 extended sets. Once 3 extended sets are strong and controlled, increase load slightly.',
        },
        {
          id: 'rotating-plank',
          name: 'Rotating Plank',
          target: '40 to 60 seconds',
          inputType: 'time',
          sets: 3,
          cues: [
            'Move with control',
            'Rotate through the ribs, not just the arm',
            'Keep hips steady',
            'Do not sag through the lower back',
            'Keep breathing',
          ],
          progression:
            'First build from 40 seconds to 60 seconds with good control. Once 60 seconds is solid, progress by slowing the rotations down. Aim for fewer, cleaner rotations rather than rushing more reps. Optional next step: add a brief pause at the top of each rotation.',
        },
      ],
    },
    {
      id: 'zone-2-cable-rack-area',
      title: 'Zone - Cable Rack Area',
      displayTitle: 'Cable Rack Area',
      purpose: 'Cable and shoulder work with minimal set-up changes.',
      notes: 'Rest 40 to 60 seconds.',
      exercises: [
        {
          id: 'cable-chest-press',
          name: 'Cable Chest Press',
          target: '3 sets x 10 to 12 reps',
          method:
            'Constant tension. Do not fully relax at the back of each rep. Keep the chest working throughout. Set cable to chest height with handles.',
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Set the cable at chest height and leave it there',
            'Keep ribs down',
            'Press forwards, not upwards',
            'Control the return',
            'Do not let shoulders roll forwards',
            'Keep stance strong and steady',
          ],
          progression:
            'Add reps first. Once all sets reach 12 clean reps with control, increase the weight slightly.',
        },
        {
          id: 'db-lateral-raise',
          name: 'DB Lateral Raise',
          target: '3 sets x 12 to 15 reps',
          method: [
            'On the final set only, add partial reps:',
            '12 to 15 full reps',
            'Then 5 to 8 small partial reps at the bottom/mid-range',
          ],
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Keep neck relaxed',
            'Soft elbows',
            'Do not swing',
            'Stop around shoulder height',
            'Control the lowering',
          ],
          progression:
            'Build all sets towards 15 clean reps. Once the final set reaches 15 full reps plus controlled partials, increase the dumbbell weight slightly.',
        },
      ],
    },
    {
      id: 'zone-3-db-area',
      title: 'Zone 3 - DB Area',
      hidden: true,
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
      title: 'Zone - Machine Area',
      displayTitle: 'Machine Area',
      purpose: 'Quad-focused machine work paired with trunk control.',
      notes: 'Rest 40 to 60 seconds.',
      exercises: [
        {
          id: 'leg-extension-1-5-reps',
          name: 'Leg Extension 1.5 Reps',
          target: '3 sets x 8 to 10 reps',
          method: [
            'Each rep is:',
            'Lift all the way up',
            'Lower halfway down',
            'Lift back up',
            'Lower all the way down',
            'That counts as 1 rep.',
          ],
          inputType: 'weight_reps',
          sets: 3,
          cues: [
            'Pause briefly at the top',
            'Control the lowering',
            'Keep hips heavy in the seat',
            'Do not swing the weight',
            'Use a lighter load than normal because the 1.5 reps will be harder',
          ],
          progression:
            'Build towards 10 clean 1.5 reps on each set. Once all 3 sets reach 10 controlled reps, increase the weight slightly.',
        },
        {
          id: 'dead-bug',
          name: 'Dead Bug',
          target: '3 sets x 8 to 10 each side',
          inputType: 'reps',
          sets: 3,
          cues: [
            'Keep ribs down',
            'Keep lower back gently heavy into the floor',
            'Move slowly',
            'Exhale as the arm and leg move away',
            'Do not let the pelvis rock',
          ],
          progression:
            'Start with 8 each side. Build to 10 each side. Once 10 each side is controlled, slow the movement down or add a longer exhale rather than rushing more reps.',
          setLabel: 'each side',
        },
      ],
    },
    {
      id: 'zone-5-optional-conditioning-area',
      title: 'Zone - Conditioning Area',
      displayTitle: 'Conditioning Area',
      purpose: 'High-output finisher.',
      exercises: [
        {
          id: 'slam-ball-intervals',
          name: 'Slam Ball Intervals',
          target: '6 to 8 rounds',
          method: ['20 seconds slams', '40 seconds rest'],
          inputType: 'slam_ball_rounds',
          sets: 8,
          cues: [
            'Brace before each slam',
            'Use the whole body, not just arms',
            'Keep reps powerful',
            'Stop if hip pain increases',
            'Quality over frantic reps',
          ],
          progression:
            'Start with 6 rounds. Build to 8 rounds. Once 8 rounds are strong and controlled, progress by using a slightly heavier ball or improving power/consistency, not by rushing the reps.',
        },
      ],
    },
  ],
};
