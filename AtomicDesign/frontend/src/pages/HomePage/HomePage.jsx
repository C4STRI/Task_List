import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Header from '../../organisms/Header/Header';
import TaskForm from '../../organisms/TaskForm/TaskForm';
import TaskList from '../../organisms/TaskList/TaskList';
import * as api from '../../api/tasks';

/**
 * PAGE: HomePage
 * La única capa que habla con la API (backend Python) y guarda estado real.
 * Ensambla el template con los organismos ya "vivos": con datos y handlers.
 * Si mañana quieres una segunda página (p.ej. "Archivadas"), reutilizas
 * los mismos organismos y el mismo template sin tocarlos.
 */
export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    api
      .fetchTasks()
      .then(setTasks)
      .catch(() => setError('No se pudo conectar con el backend en :8000'))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate({ title, priority }) {
    const optimistic = { id: Date.now(), title, priority, done: false, created_at: '' };
    setTasks((prev) => [optimistic, ...prev]);
    try {
      const saved = await api.createTask({ title, priority });
      setTasks((prev) => prev.map((t) => (t.id === optimistic.id ? saved : t)));
    } catch {
      setTasks((prev) => prev.filter((t) => t.id !== optimistic.id));
      setError('No se pudo guardar la tarea');
    }
  }

  async function handleToggle(id) {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    try {
      await api.updateTask(id, { done: !target.done });
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: target.done } : t)));
    }
  }

  async function handleDelete(id) {
    const confirmed = await Swal.fire({
      title: '¿Eliminar tarea?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e4572e',
      cancelButtonColor: '#d3d3d3',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirmed.isConfirmed) return;

    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await api.deleteTask(id);
      Swal.fire('¡Eliminada!', 'La tarea fue eliminada correctamente', 'success');
    } catch {
      setTasks(previous);
      Swal.fire('Error', 'No se pudo eliminar la tarea', 'error');
    }
  }

  function handleEdit(id) {
    setEditingTaskId(id);
    // Scroll al formulario para mejor UX
    const form = document.querySelector('.task-form');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleUpdate(id, changes) {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    const previous = tasks;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t))
    );
    try {
      await api.updateTask(id, changes);
    } catch {
      setTasks(previous);
      setError('No se pudo actualizar la tarea');
    }
  }

  function handleEditCancel() {
    setEditingTaskId(null);
  }

  const pending = tasks.filter((t) => !t.done).length;
  const editingTask = tasks.find((t) => t.id === editingTaskId) || null;

  return (
    <MainTemplate
      header={<Header total={tasks.length} pending={pending} />}
      form={
        <TaskForm
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          editingTask={editingTask}
          onEditCancel={handleEditCancel}
        />
      }
      list={
        loading ? null : (
          <>
            {error && <p style={{ color: '#e4572e', marginBottom: '1rem' }}>{error}</p>}
            <TaskList
              tasks={tasks}
              filter={filter}
              onFilterChange={setFilter}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </>
        )
      }
    />
  );
}
