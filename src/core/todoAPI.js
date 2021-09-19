import http from './http';

// global url
const url = 'https://jsonplaceholder.typicode.com';
// CRUD
const getAllTodos = async () => {
  const props = {
    url: `${url}/todos`,
  };
  const todos = await http('get', props);
  return todos.data;
};
const getTodoById = async (id) => {
  const props = {
    url: `${url}/todos/${id}`,
  };
  const todos = await http('get', props);
  return todos.data;
};
const creatTodo = async (data) => {
  const props = {
    url: `${url}/todos`,
    data: JSON.stringify(data),
  };
  const todos = await http('post', props);
  return todos.data;
};
const updateTodo = async (id, data) => {
  const props = {
    url: `${url}/todos/${id}`,
    data: JSON.stringify(data),
  };
  const todos = await http('put', props);
  return todos.data;
};
const deleteTodo = async (id) => {
  const props = {
    url: `${url}/todos/${id}`,
  };
  const todos = await http('delete', props);
  return todos.data;
};

// export
export default {
  getAllTodos,
  getTodoById,
  creatTodo,
  updateTodo,
  deleteTodo,
};
