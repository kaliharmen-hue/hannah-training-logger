export default function CopySummaryButton({ disabled, status, onCopy }) {
  return (
    <div className="copy-panel">
      <button className="primary-button" disabled={disabled} onClick={onCopy}>
        Copy session for WhatsApp
      </button>
      <p className="status-text">{status}</p>
    </div>
  );
}
