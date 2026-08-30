"""
Conexión a la base de datos (SQLite).
Se mantiene deliberadamente simple: una sola tabla, sin ORM pesado,
para que el foco del ejercicio siga siendo la arquitectura, no el ORM.
"""
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "taskflow.db"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    """Crea la tabla de tareas si no existe."""
    conn = get_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS tasks (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            title       TEXT NOT NULL,
            priority    TEXT NOT NULL DEFAULT 'medium',
            done        INTEGER NOT NULL DEFAULT 0,
            created_at  TEXT NOT NULL DEFAULT (datetime('now'))
        )
        """
    )
    conn.commit()
    conn.close()
