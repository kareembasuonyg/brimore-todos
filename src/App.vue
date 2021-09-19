<template>
  <todo-card
    v-for="item in allTodos"
    :key="item.id"
    :title="item.title"
  ></todo-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TodoCard from './components/TodoCard.vue';

export default {
  name: 'App',
  components: {
    TodoCard,
  },

  mounted() {
    this.getAllTodos();
  },
  methods: {
    ...mapActions('todoStore', ['getAllTodos']),
  },
  computed: {
    ...mapGetters('todoStore', ['allTodos']),
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
