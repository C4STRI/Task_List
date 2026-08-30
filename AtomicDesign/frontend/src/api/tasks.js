/**
 * Capa de acceso a la API GraphQL. Ningún componente hace fetch() directamente:
 * todos pasan por aquí, igual que el backend centraliza el SQL en repository.py.
 */
const GRAPHQL_URL = 'http://localhost:8000/graphql';

async function graphqlRequest(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  
  if (!res.ok) throw new Error('Error en la solicitud GraphQL');
  
  const data = await res.json();
  if (data.errors) throw new Error(data.errors[0].message);
  
  return data.data;
}

export async function fetchTasks() {
  const query = `
    query {
      tasks {
        id
        title
        priority
        done
        createdAt
      }
    }
  `;
  const result = await graphqlRequest(query);
  return result.tasks;
}

export async function createTask({ title, priority }) {
  const query = `
    mutation CreateTask($title: String!, $priority: String!) {
      createTask(input: { title: $title, priority: $priority }) {
        id
        title
        priority
        done
        createdAt
      }
    }
  `;
  const result = await graphqlRequest(query, { title, priority });
  return result.createTask;
}

export async function updateTask(id, changes) {
  const query = `
    mutation UpdateTask($id: Int!, $input: TaskUpdateInput!) {
      updateTask(id: $id, input: $input) {
        id
        title
        priority
        done
        createdAt
      }
    }
  `;
  const result = await graphqlRequest(query, { id, input: changes });
  return result.updateTask;
}

export async function deleteTask(id) {
  const query = `
    mutation DeleteTask($id: Int!) {
      deleteTask(id: $id)
    }
  `;
  await graphqlRequest(query, { id });
}
