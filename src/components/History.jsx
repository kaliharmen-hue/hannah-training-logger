export default function History({ history }) {
  const latest = history[0];

  return (
    <section className="history-section">
      <div className="section-heading">
        <h2>Training history</h2>
        <span>{history.length} saved</span>
      </div>

      {!latest ? (
        <p className="empty-state">No completed sessions yet.</p>
      ) : (
        <details className="history-item" open>
          <summary>
            <span>Last completed</span>
            <strong>{formatDateTime(latest.completedAt)}</strong>
          </summary>
          <pre>{latest.summary}</pre>
        </details>
      )}

      {history.slice(1, 6).map((session) => (
        <details className="history-item" key={session.id}>
          <summary>
            <span>{session.sessionTitle}</span>
            <strong>{formatDateTime(session.completedAt)}</strong>
          </summary>
          <pre>{session.summary}</pre>
        </details>
      ))}
    </section>
  );
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}
