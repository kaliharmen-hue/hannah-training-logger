export default function Tabs({ activeTab, onChange }) {
  return (
    <nav className="tab-bar" aria-label="Main areas">
      <button
        className={activeTab === 'gym' ? 'active' : ''}
        onClick={() => onChange('gym')}
        type="button"
      >
        Gym Session
      </button>
      <button
        className={activeTab === 'cardio' ? 'active' : ''}
        onClick={() => onChange('cardio')}
        type="button"
      >
        Cardio Options
      </button>
    </nav>
  );
}
