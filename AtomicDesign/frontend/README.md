# TaskFlow — proyecto de aprendizaje: Atomic Design + backend en Python

Un gestor de tareas minimalista pensado para **estudiar la arquitectura Atomic Design**
en el frontend, conectado a un backend real en **Python (Strawberry GraphQL + SQLite)**.

```
taskflow/
├── backend/          → API GraphQL en Python (Strawberry)
└── frontend/          → React con estructura Atomic Design
```

## ¿Qué es Atomic Design?

Es una forma de organizar componentes de UI en 5 niveles, de lo más simple a lo más
complejo, inspirada en la química (átomos → moléculas → organismos):

| Nivel | Qué es | En este proyecto |
|---|---|---|
| **Atoms** (átomos) | Componentes indivisibles. No saben nada del negocio. | `Button`, `Input`, `Badge`, `Checkbox`, `Text` |
| **Molecules** (moléculas) | Varios átomos combinados con un propósito simple. | `FormField`, `TaskCard`, `FilterTabs` |
| **Organisms** (organismos) | Secciones completas, con lógica y contenido real. | `Header`, `TaskForm`, `TaskList` |
| **Templates** (plantillas) | El esqueleto/layout de la página, sin datos reales. | `MainTemplate` |
| **Pages** (páginas) | El template relleno con datos reales (llama a la API). | `HomePage` |

La regla de oro: **las capas de abajo nunca conocen a las de arriba**. Un `Button`
no sabe que existe `TaskForm`; `TaskForm` no sabe que existe `HomePage`. Esto hace
que cada pieza sea reutilizable y fácil de probar por separado.

```
Atoms → Molecules → Organisms → Templates → Pages
(más simple, más reutilizable)      (más complejo, más específico)
```

## Cómo se refleja en el backend

El backend usa el mismo principio de "una responsabilidad por capa", aunque con
otros nombres (es la arquitectura típica de una API GraphQL):

```
backend/
├── main.py         → Schema GraphQL (equivalente a las "Pages": conectan todo)
├── repository.py   → Acceso a datos / SQL (equivalente a la lógica de negocio)
├── schema.py       → Tipos y resolvers de Strawberry
└── database.py     → Conexión a SQLite
```

`main.py` nunca escribe SQL directamente, igual que `HomePage.jsx` nunca hace
un `document.querySelector`: cada capa delega en la siguiente.

## Cómo correrlo

### 1. Backend (Python + Strawberry GraphQL)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # En Windows: venv\Scripts\activate
pip install -r requirements.txt
strawberry server
```

Quedará corriendo en `http://localhost:8000`. Puedes explorar la API GraphQL
interactiva en `http://localhost:8000/graphql`.

### 2. Frontend (React + Vite)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Quedará corriendo en `http://localhost:5173`.

## Idea para seguir aprendiendo

1. Abre `frontend/src/atoms/Button/Button.jsx` y agrega una variante nueva (por
   ejemplo `"danger"`), luego úsala en `TaskCard`.
2. Crea una molécula nueva, `TaskCounter`, combinando `Text` + `Badge`.
3. Crea un segundo organismo `EmptyState` y reutilízalo en otra página.
4. En el backend, agrega un campo `due_date` siguiendo el mismo camino:
   `schemas.py` → `repository.py` → `main.py`.
