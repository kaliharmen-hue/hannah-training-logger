import { useMemo, useState } from 'react';
import { getPersonalBests } from '../utils/personalBests.js';

export default function PersonalBests({ history, programme }) {
  const [search, setSearch] = useState('');
  const bests = useMemo(() => getPersonalBests(history, programme), [history, programme]);
  const visible = bests.filter((exercise) => exercise.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <section className="bests-section">
      <div className="section-heading">
        <h2>Personal Bests</h2>
        <span>{bests.length} exercises</span>
      </div>
      <label className="field">
        <span>Find exercise</span>
        <input type="search" placeholder="Exercise name" value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>
      {!bests.length ? (
        <p className="empty-state">No recorded bests yet. Your saved gym sessions will appear here.</p>
      ) : !visible.length ? (
        <p className="empty-state">No exercises match your search.</p>
      ) : (
        <div className="exercise-list">
          {visible.map((exercise) => (
            <article className="exercise-card" key={exercise.id}>
              <div className="exercise-topline"><h3>{exercise.name}</h3></div>
              <table className="bests-table">
                <thead><tr><th scope="col">Reps / measure</th><th scope="col">Best</th><th scope="col">Date</th></tr></thead>
                <tbody>
                  {exercise.records.map((record) => (
                    <tr key={record.key}>
                      <th scope="row">{record.label}</th>
                      <td>{record.value} {record.unit}</td>
                      <td>{formatDate(record.completedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown' : new Intl.DateTimeFormat('en-GB').format(date);
}
