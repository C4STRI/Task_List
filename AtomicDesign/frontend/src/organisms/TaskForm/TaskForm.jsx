import { useState, useEffect } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import './TaskForm.css';

const PRIORITIES = ['low', 'medium', 'high'];
const PRIORITY_LABEL = { low: 'Baja', medium: 'Media', high: 'Alta' };

/**
 * ORGANISM: TaskForm
 * Aquí sí vive la lógica de negocio: "crear una tarea" o "editar una tarea".
 * Combina una molécula (FormField) y átomos (Button, Text),
 * y expone eventos hacia arriba: onCreate o onUpdate.
 */
export default function TaskForm({ onCreate, onUpdate, editingTask, onEditCancel }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  // Cuando se recibe una tarea a editar, rellenar el formulario
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    
    if (editingTask) {
      onUpdate(editingTask.id, { title: trimmed, priority });
      onEditCancel();
    } else {
      onCreate({ title: trimmed, priority });
    }
    setTitle('');
    setPriority('medium');
  }

  function handleCancel() {
    setTitle('');
    setPriority('medium');
    onEditCancel();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <FormField
        id="task-title"
        label={editingTask ? 'Editar tarea' : 'Nueva tarea'}
        value={title}
        onChange={setTitle}
        placeholder={editingTask ? 'Actualizar descripción de la tarea' : 'Ej: Revisar el pull request de diseño'}
      />

      <div className="task-form__priority">
        <Text as="span" variant="meta">Prioridad</Text>
        <div className="task-form__priority-options">
          {PRIORITIES.map((p) => (
            <button
              type="button"
              key={p}
              className={`task-form__pill task-form__pill--${p} ${priority === p ? 'is-active' : ''}`}
              onClick={() => setPriority(p)}
            >
              {PRIORITY_LABEL[p]}
            </button>
          ))}
        </div>
      </div>

      <div className="task-form__actions">
        <Button type="submit" variant="accent">
          {editingTask ? 'Guardar cambios' : 'Añadir tarea'}
        </Button>
        {editingTask && (
          <Button type="button" variant="ghost" onClick={handleCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
