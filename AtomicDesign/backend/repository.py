"""
Capa de repositorio: toda la interacción con SQL vive aquí.
main.py nunca escribe SQL directamente; solo llama a estas funciones.
"""
from database import get_connection
from schemas import Task, TaskCreateInput, TaskUpdateInput


def row_to_task(row) -> Task:
    return Task(
        id=row["id"],
        title=row["title"],
        priority=row["priority"],
        done=bool(row["done"]),
        created_at=row["created_at"],
    )


def list_tasks() -> list[Task]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM tasks ORDER BY done ASC, id DESC").fetchall()
    conn.close()
    return [row_to_task(r) for r in rows]


def create_task(data: TaskCreateInput) -> Task:
    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO tasks (title, priority) VALUES (?, ?)",
        (data.title, data.priority),
    )
    conn.commit()
    new_id = cursor.lastrowid
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    return row_to_task(row)


def update_task(task_id: int, data: TaskUpdateInput) -> Task | None:
    conn = get_connection()
    existing = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if existing is None:
        conn.close()
        return None

    fields = {k: v for k, v in vars(data).items() if v is not None}
    if fields:
        columns = ", ".join(f"{key} = ?" for key in fields)
        values = list(fields.values())
        # SQLite guarda booleanos como 0/1
        values = [int(v) if isinstance(v, bool) else v for v in values]
        values.append(task_id)
        conn.execute(f"UPDATE tasks SET {columns} WHERE id = ?", values)
        conn.commit()

    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    conn.close()
    return row_to_task(row)


def delete_task(task_id: int) -> bool:
    conn = get_connection()
    cursor = conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return cursor.rowcount > 0
