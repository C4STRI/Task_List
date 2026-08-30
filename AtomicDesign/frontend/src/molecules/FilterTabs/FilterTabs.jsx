import './FilterTabs.css';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendientes' },
  { id: 'done', label: 'Hechas' },
];

/**
 * MOLECULE: FilterTabs
 * Un grupo de botones relacionados que actúan como una sola unidad
 * de control (selección exclusiva).
 */
export default function FilterTabs({ active, onChange }) {
  return (
    <div className="filter-tabs" role="tablist">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          role="tab"
          aria-selected={active === f.id}
          className={`filter-tabs__tab ${active === f.id ? 'is-active' : ''}`}
          onClick={() => onChange(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
