"""
Esquemas Strawberry: definen los tipos GraphQL para la API.
Separarlos de la base de datos es lo mismo en espíritu que separar
"atoms" de "organisms" en el frontend: cada capa tiene una responsabilidad.
"""
from typing import Literal, Optional
from dataclasses import dataclass
import strawberry

Priority = Literal["low", "medium", "high"]


@strawberry.type
@dataclass
class Task:
    id: int
    title: str
    priority: str  # "low", "medium", "high"
    done: bool
    created_at: str


@strawberry.input
@dataclass
class TaskCreateInput:
    title: str
    priority: str = "medium"


@strawberry.input
@dataclass
class TaskUpdateInput:
    title: Optional[str] = None
    priority: Optional[str] = None
    done: Optional[bool] = None
