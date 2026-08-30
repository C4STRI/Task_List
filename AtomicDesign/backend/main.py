"""
Punto de entrada de la API GraphQL.
Queries y Mutations para las tareas.
"""
from typing import Optional
import strawberry
from strawberry.asgi import GraphQL
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route

import repository as repo
from database import init_db
from schemas import Task, TaskCreateInput, TaskUpdateInput


@strawberry.type
class Query:
    @strawberry.field
    def tasks(self) -> list[Task]:
        """Obtiene todas las tareas."""
        return repo.list_tasks()

    @strawberry.field
    def task(self, id: int) -> Optional[Task]:
        """Obtiene una tarea por ID."""
        tasks = repo.list_tasks()
        return next((t for t in tasks if t.id == id), None)

    @strawberry.field
    def health(self) -> str:
        """Verifica que la API está activa."""
        return "ok"


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_task(self, input: TaskCreateInput) -> Task:
        """Crea una nueva tarea."""
        return repo.create_task(input)

    @strawberry.mutation
    def update_task(self, id: int, input: TaskUpdateInput) -> Optional[Task]:
        """Actualiza una tarea existente."""
        return repo.update_task(id, input)

    @strawberry.mutation
    def delete_task(self, id: int) -> bool:
        """Elimina una tarea."""
        return repo.delete_task(id)


schema = strawberry.Schema(query=Query, mutation=Mutation)

# Crear aplicación ASGI con Strawberry GraphQL
graphql_app = GraphQL(schema)

# Crear aplicación Starlette con middleware CORS
app = Starlette()

# Middleware CORS: permite que el frontend (Vite, puerto 5173) y cloudflared accedan a la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://include-resort-fares-lamps.trycloudflare.com",
        "https://toward-beats-certification-drew.trycloudflare.com",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar base de datos al arrancar
@app.on_event("startup")
def on_startup() -> None:
    init_db()

# Montar el GraphQL en /graphql
app.mount("/graphql", graphql_app)
