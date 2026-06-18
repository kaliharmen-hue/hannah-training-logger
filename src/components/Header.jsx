export default function Header({ programme }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">{programme.clientName} Training Logger</p>
        <h1>{programme.sessionTitle}</h1>
      </div>
      <p>{new Date().toLocaleDateString('en-GB')}</p>
    </header>
  );
}
