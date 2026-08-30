import './Button.css';

/**
 * ATOM: Button
 * La unidad más pequeña e indivisible de interacción.
 * No sabe nada sobre "tareas": solo sabe ser un botón.
 */
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
