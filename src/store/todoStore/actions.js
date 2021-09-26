import todoAPI from '../../core/todoAPI';

export default {
  async getAllTodos({ commit }) {
    const todos = await todoAPI.getAllTodos();
    commit('allTodos', todos);
  },
  async deleteTodoById({ commit }, id) {
    await todoAPI.deleteTodoById(id);
    commit('deleteTodo', id);
  },
  async updateTodoById({ commit }, payload) {
    await todoAPI.updateTodoById(payload.id, payload.data);
    commit('updateTodo', payload);
  },
  async createTodo({ commit }, payload) {
    const response = await todoAPI.createTodo(payload);
    commit('createTodo', {
      ...payload,
      id: response.id,
      completed: false,
    });
  },
};
