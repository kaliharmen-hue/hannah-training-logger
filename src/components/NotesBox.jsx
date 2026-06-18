export default function NotesBox({ value, onChange }) {
  return (
    <section className="notes-section">
      <label className="field full-width">
        <span>General notes</span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Hip felt fine, ran out of time, weight felt easy..."
        />
      </label>
    </section>
  );
}
