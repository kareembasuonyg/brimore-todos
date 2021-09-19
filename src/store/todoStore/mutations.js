export default {
  allTodos(state, payload) {
    state.todos = payload;
  },
  deleteTodo(state, id) {
    state.todos = state.todos.filter((item) => item.id !== id);
  },
  updateTodo(state, payload) {
    const todoItemIndex = state.todos.findIndex(
      (item) => item.id === payload.id
    );
    if (payload.body.title) {
      state.todos[todoItemIndex].title = payload.body.title;
    } else {
      state.todos[todoItemIndex].completed = payload.body.completed;
    }
  },
  createTodo(state, payload) {
    state.todos.unshift(payload);
  },
};
