import TaskCard from '../../molecules/TaskCard/TaskCard';
import FilterTabs from '../../molecules/FilterTabs/FilterTabs';
import Text from '../../atoms/Text/Text';
import './TaskList.css';

/**
 * ORGANISM: TaskList
 * Combina la molécula FilterTabs con una lista de la molécula TaskCard.
 * Conoce el concepto de "filtrar" pero delega el renderizado
 * de cada tarea individual a TaskCard.
 */
export default function TaskList({ tasks, filter, onFilterChange, onToggle, onDelete, onEdit }) {
  const filtered = tasks.filter((t) => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <section className="task-list">
      <div className="task-list__toolbar">
        <Text as="h2" variant="heading">Tareas</Text>
        <FilterTabs active={filter} onChange={onFilterChange} />
      </div>

      {filtered.length === 0 ? (
        <div className="task-list__empty">
          <Text as="p" variant="body">No hay tareas aquí todavía. Añade una arriba.</Text>
        </div>
      ) : (
        <ul className="task-list__items">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </ul>
      )}
    </section>
  );
}
