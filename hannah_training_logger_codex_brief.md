# Hannah Training Logger App - Codex Build Brief

## Project Aim

Build a simple, mobile-first training logger that allows a client to follow a prescribed training session, record what they actually completed, add notes, and copy the completed session into a WhatsApp message for the coach.

This should be a reusable logger structure, but the programme content should be easy to update for Hannah every 4 weeks by editing a single programme data file.

The app should be simple, fast, and practical to use in a gym on a phone.

---

## Core Build Principle

Separate the app logic from the programme content.

The logger system should stay the same across future programme blocks. The exercises, zones, sets, reps, cues, notes, and progression guidance should live in a separate editable programme data file.

Future updates should only require changing the programme data file, not rebuilding the app components.

---

## Scope for Version 1

Build a local-only web app.

No login, no database, no cloud sync, no admin panel, and no exercise library are needed for V1.

Use local storage so the client does not lose entered data if the browser is refreshed or closed. Make sure automatic back-ups are made.

---

## User Flow

1. Client opens the app on her phone.
2. The current training session is displayed.
3. Exercises are grouped into zones.
4. Each exercise shows target sets/reps, key cues, and progression notes.
5. Client enters what she completed for each set.
6. Client adds optional notes.
7. Client taps a button to copy the session summary.
8. Client pastes the copied summary into WhatsApp and sends it to the coach.

---

## App Layout

The app should have a clean, mobile-first layout.

Suggested structure:

1. Header
2. Session title
3. Exercise blocks / zones
4. Exercise cards
5. General notes box
6. Copy to WhatsApp button
7. Previous session history / last completed data

The design should be simple, readable, and easy to use quickly between sets.

---

## Programme Data File

Create one editable programme data file, for example:

```text
src/data/programme.js
```

or:

```text
src/data/programme.json
```

This file should contain all programme content, including:

- client name
- session title
- blocks/zones
- exercise names
- target sets and reps
- tempo where needed
- rest where needed
- exercise cues
- progression notes
- modification notes where needed
- input type
- number of sets

The app should render the session dynamically from this file.

Do not hard-code exercises directly into React/Vue/app components.

---

## Programme Data Structure

The programme file should be easy for Codex to update from plain English programme notes.

Use a clear structure similar to this:

```js
export const programme = {
  clientName: 'Hannah',
  sessionTitle: 'Solo Gym Session',
  blocks: [
    {
      title: 'Zone 1 - Leg Press Area',
      notes: 'Stay in this area and complete all exercises before moving on.',
      exercises: [
        {
          name: 'Leg Press',
          target: '4 sets: 12, 10, 8, 15 back-off',
          tempo: '3 sec lowering',
          rest: '60-90 sec',
          inputType: 'weight_reps',
          sets: 4,
          cues: [
            'Whole foot on the plate',
            'Big toe, little toe, heel',
            'Do not roll onto the outside edge'
          ],
          progression: 'Add load when all reps are clean and hip feels fine.',
          modification: 'Reduce depth if the front of the hip pinches.'
        },
        {
          name: 'Push-Ups',
          target: '3 sets x 6-12 reps',
          tempo: 'Controlled lowering',
          rest: '45-75 sec',
          inputType: 'reps',
          sets: 3,
          cues: [
            'Keep ribs down',
            'Hold a strong plank position',
            'Lower with control'
          ],
          progression: 'Add reps before making the exercise harder.',
          modification: 'Use an incline if full push-ups lose quality.'
        }
      ]
    }
  ]
};
```

The exact names and structure can be adjusted if needed, but the data file must stay simple and easy to update.

---

## Supported Input Types

The logger should support different exercise input types because not every exercise uses kg.

Required input types:

### 1. weight_reps

For exercises such as leg press, dumbbell press, cable exercises, machines, dumbbell lunges.

Fields per set:

- kg
- reps
- optional note

### 2. reps

For bodyweight exercises such as push-ups.

Fields per set:

- reps
- optional note

### 3. time

For planks, holds, carries, intervals, or timed finishers.

Fields per set:

- time completed
- optional note

### 4. band_reps

For banded work such as band abductions or lateral walks.

Fields per set:

- band used
- reps or time
- optional note

### 5. rounds

For finishers or circuits.

Fields:

- rounds completed
- optional note

### 6. notes_only

For optional sections where the client only needs to write what happened.

---

## Exercise Card Requirements

Each exercise should display:

- exercise name
- target sets/reps
- tempo if supplied
- rest if supplied
- short cues
- progression note
- modification note if supplied
- input fields based on input type
- previous session data for that exercise, if available

The previous session data should be displayed clearly but not clutter the screen.

Example:

```text
Last time:
Set 1: 90kg x 10
Set 2: 90kg x 10
Set 3: 90kg x 10
```

---

## Set Logging

Each set should allow the client to enter the relevant data.

Example for weight_reps:

| Set | Kg | Reps | Note |
|---|---|---|---|
| 1 | input | input | input |
| 2 | input | input | input |
| 3 | input | input | input |

The note field should be optional.

The app should allow unfinished exercises or blank fields without breaking the summary.

---

## General Notes Box

At the bottom of the session, include one general notes box.

This is where the client can add anything useful, such as:

- hip felt fine
- front hip pinched
- grip went on lunges
- ran out of time
- skipped finisher
- felt tired today
- weight felt too easy
- machine was unavailable

This should be a free-text notes box.

---

## Copy to WhatsApp Button

Add a clear button at the bottom:

```text
Copy session for WhatsApp
```

When clicked, it should copy a clean plain-text summary of the completed session.

The copied text should be formatted so it can be pasted directly into WhatsApp.

Example format:

```text
HANNAH TRAINING LOG

Date: 18/06/2026
Session: Solo Gym Session

ZONE 1 - LEG PRESS AREA

Leg Press
Set 1: 90kg x 10
Set 2: 90kg x 10
Set 3: 90kg x 10
Set 4: 80kg x 15
Notes: Felt controlled. No hip pain.

Push-Ups
Set 1: 10 reps
Set 2: 10 reps
Set 3: 9 reps

ZONE 2 - CABLE AREA

Lat Pulldown
Set 1: 30kg x 10
Set 2: 30kg x 10
Set 3: 30kg x 10

GENERAL NOTES
Hard today. Focused on form. Hip felt okay. Ran out of time for finisher.
```

Only include data that has been entered. Blank fields should be skipped or shown cleanly.

---

## Previous Data Display Behaviour

When the client opens the session, each exercise should show the previous completed data for that exercise as a reference.

The previous data should appear as "Last time" information near the exercise card.

Today's input fields should start blank so the client can enter the current session.

Entering today's numbers should not delete the previous session from history. Once the current session is saved/copied, it becomes the new "Last time" data for the next session.

The app should therefore support:

- viewing the previous completed data
- entering new data for the current session
- saving the current session as a new history entry
- using the most recent completed session as the next "Last time" reference

---

## Local Storage

Use browser local storage for:

- current in-progress session data
- previous completed session data
- simple training history

If the client refreshes or closes the browser, the entered data should not disappear.

---

## Training History

Include a simple training history section.

It should show previous completed sessions with dates.

The client should be able to view the last session summary.

The app should also show previous data under each exercise so the client can see what she did last time.

Keep this simple. No graphs are needed for V1.

---

## Programme Update Workflow

The app should be built so future programme updates are simple.

Every 4 weeks, the coach will provide new programme details in plain English, including:

- zone/block
- exercise name
- sets
- reps
- tempo
- rest
- cues
- progression notes
- input type
- modification notes where needed

Codex should then update only the programme data file.

The main logger components should not need to change when exercises are swapped.

---

## Example Future Update Instruction

The app should be structured so the coach can later give Codex an instruction like this:

```text
Update Hannah's programme data file with this new 4-week solo gym session.
Keep the logger structure the same.
Replace the existing exercises with the programme below.

Zone 1 - Leg Press Area
1a) Leg Press
4 sets: 12, 10, 8, 15 back-off
Input: kg + reps
Cue: whole foot on plate, big toe/little toe/heel
Progression: add load when all reps are clean and hip feels fine

1b) Push-Ups
3 sets x 6-12
Input: reps only
Cue: ribs down, strong plank position
Progression: add reps before making harder

Zone 2 - Cable Area
...
```

Codex should be able to update the programme file without changing the logger system.

---

## UI Requirements

The UI should be:

- mobile-first
- simple
- fast to use
- readable in a gym
- easy to tap between sets
- uncluttered
- minimal typing beyond weights, reps, and notes

Use clear spacing and large enough input fields for phone use.

---

## Technical Requirements

Use a simple modern front-end setup.

Preferred options:

- React with Vite
- plain local storage
- no backend
- no authentication
- no database

Keep the file structure clean and easy to understand.

Suggested structure:

```text
src/
  data/
    programme.js
  components/
    ExerciseCard.jsx
    BlockSection.jsx
    NotesBox.jsx
    CopySummaryButton.jsx
    History.jsx
  utils/
    storage.js
    formatWhatsAppSummary.js
  App.jsx
```

Adjust file names if needed, but keep the programme data separate from the components.

---

## Formatting Rules

Use British English in visible copy.

Use clear, simple language.

Avoid fitness jargon where possible.

Keep cues short.

---

## Acceptance Criteria

The build is successful when:

1. The app opens on mobile and displays the full session.
2. Exercises are grouped by blocks/zones.
3. Exercise data comes from the programme data file.
4. The client can enter set-by-set training data.
5. The client can add general notes.
6. Data persists after refresh.
7. The previous session can be viewed.
8. Previous exercise data is visible when completing the session again.
9. The WhatsApp copy button creates a clean plain-text summary.
10. Future programme updates can be made by editing only the programme data file.
