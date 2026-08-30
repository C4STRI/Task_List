import Checkbox from '../../atoms/Checkbox/Checkbox';
import Badge from '../../atoms/Badge/Badge';
import Text from '../../atoms/Text/Text';
import Button from '../../atoms/Button/Button';
import './TaskCard.css';

/**
 * MOLECULE: TaskCard
 * Combina Checkbox + Badge + Text + Button en la unidad visual
 * que representa UNA tarea. Este es el "elemento firma" del diseño:
 * una tarjeta con forma de ticket perforado.
 */
export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  return (
    <li className={`task-card task-card--${task.priority} ${task.done ? 'is-done' : ''}`}>
      <span className="task-card__perforation" aria-hidden="true" />
      <Checkbox checked={task.done} onChange={() => onToggle(task.id)} />
      <div className="task-card__body">
        <Text as="span" variant="heading" className="task-card__title">
          {task.title}
        </Text>
        <Text as="span" variant="meta">
          #{String(task.id).padStart(3, '0')}
        </Text>
      </div>
      <Badge tone={task.priority} />
      <div className="task-card__actions">
        <Button variant="ghost" onClick={() => onEdit(task.id)}>
          Editar
        </Button>
        <Button variant="ghost" onClick={() => onDelete(task.id)}>
          Eliminar
        </Button>
      </div>
    </li>
  );
}
