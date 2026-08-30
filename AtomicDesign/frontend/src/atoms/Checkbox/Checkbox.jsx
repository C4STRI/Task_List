import './Checkbox.css';

/**
 * ATOM: Checkbox
 * Casilla de marcado circular. Solo sabe si está marcada o no.
 */
export default function Checkbox({ checked, onChange, label }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox__dot" aria-hidden="true" />
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
