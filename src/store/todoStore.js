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
    async getAllTodos({ commit }) {
      const todos = await todoAPI.getAllTodos();
      console.log('🚀 ~ file: todoStore.js ~ line 15 ~', todos);
      commit('allTodos', todos);
    },
  },
  getters: {
    allTodos(state) {
      return state.todos;
    },
  },
};
