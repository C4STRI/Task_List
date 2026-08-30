import './Text.css';

/**
 * ATOM: Text
 * Centraliza la tipografía: cualquier texto de la app pasa por aquí
 * en vez de que cada componente invente su propio font-size.
 */
export default function Text({ as = 'p', variant = 'body', children, className = '' }) {
  const Tag = as;
  return <Tag className={`text text--${variant} ${className}`}>{children}</Tag>;
}
