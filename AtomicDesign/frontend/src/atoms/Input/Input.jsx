import './Input.css';

/**
 * ATOM: Input
 * Un campo de texto controlado. No conoce el concepto de "formulario",
 * solo expone su valor y un manejador de cambio.
 */
export default function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  id,
}) {
  return (
    <input
      id={id}
      type={type}
      className="input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
