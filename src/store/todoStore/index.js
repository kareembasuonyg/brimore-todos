import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: () => ({
    todos: [],
  }),
  mutations,
  actions,
  getters: {
    allTodos(state) {
      return state.todos;
    },
  },
};
