import './Badge.css';

/**
 * ATOM: Badge
 * Una etiqueta visual pequeña. Recibe un "tone" genérico (no "priority"),
 * así se puede reutilizar para cualquier otro estado en el futuro.
 */
const LABELS = { low: 'Baja', medium: 'Media', high: 'Alta' };

export default function Badge({ tone = 'medium' }) {
  return <span className={`badge badge--${tone}`}>{LABELS[tone] ?? tone}</span>;
}
