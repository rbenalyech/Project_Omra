import './Placeholder.css';

export default function Placeholder({ id, number, title, subtitle, note }) {
  return (
    <section id={id} className="placeholder section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">{number}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="placeholder-card card">
          <span className="placeholder-icon">📝</span>
          <p className="placeholder-text">{note}</p>
        </div>
      </div>
    </section>
  );
}
