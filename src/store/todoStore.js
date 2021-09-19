import todoAPI from '../core/todoAPI';

export default {
  namespaced: true,
  state: () => ({
    todos: [],
  }),
  mutations: {
    allTodos(state, payload) {
      state.todos = payload;
    },
  },
  actions: {
    getAllTodos({ commit }) {
      const todos = todoAPI.getAllTodos();
      console.log('🚀 ~ file: todoStore.js ~ line 15 ~ getAllTodos ~ todos', todos);
      commit('allTodos', []);
    },
  },
  getters: {},
};
