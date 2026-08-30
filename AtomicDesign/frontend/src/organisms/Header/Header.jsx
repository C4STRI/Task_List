import Text from '../../atoms/Text/Text';
import './Header.css';

/**
 * ORGANISM: Header
 * Una sección completa e identificable de la interfaz.
 * Compuesto solo de átomos, pero ya tiene contenido y contexto propios.
 */
export default function Header({ total, pending }) {
  return (
    <header className="app-header">
      <div>
        <Text as="h1" variant="display">TaskFlow</Text>
        <Text as="p" variant="body">Tu lista de tareas</Text>
      </div>
      <div className="app-header__stats">
        <div className="app-header__stat">
          <Text as="span" variant="display" className="app-header__stat-number">{pending}</Text>
          <Text as="span" variant="meta">pendientes</Text>
        </div>
        <div className="app-header__stat">
          <Text as="span" variant="display" className="app-header__stat-number">{total}</Text>
          <Text as="span" variant="meta">en total</Text>
        </div>
      </div>
    </header>
  );
}
