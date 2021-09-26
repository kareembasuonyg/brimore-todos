import { http } from './http';

// global url
const url = 'https://jsonplaceholder.typicode.com';
// CRUD
const getAllTodos = async () => {
  const props = {
    url: `${url}/todos`,
  };
  try {
    const todos = await http('get', props);
    return todos.data;
  } catch (e) {
    return null;
  }
};
const getTodoById = async (id) => {
  const props = {
    url: `${url}/todos/${id}`,
  };
  try {
    const todos = await http('get', props);
    return todos.data;
  } catch (e) {
    return null;
  }
};
const createTodo = async (data) => {
  const props = {
    url: `${url}/todos`,
    data: JSON.stringify(data),
  };
  try {
    const todos = await http('post', props);
    return todos.data;
  } catch (e) {
    return null;
  }
};
const updateTodoById = async (id, data) => {
  const props = {
    url: `${url}/todos/${id}`,
    data: JSON.stringify(data),
  };
  try {
    const todos = await http('put', props);
    return todos.data;
  } catch (e) {
    return null;
  }
};
const deleteTodoById = async (id) => {
  const props = {
    url: `${url}/todos/${id}`,
  };
  try {
    const todos = await http('delete', props);
    return todos.data;
  } catch (e) {
    return null;
  }
};

// export
export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
