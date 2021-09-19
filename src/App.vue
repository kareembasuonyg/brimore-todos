<template>
  <div v-if="!error">
    <a-row type="flex" justify="center">
      <a-col :span="12" class="button-container-col">
        <div
          class="button-container"
          :style="{
            textAlign: allTodos.length <= 0 || !allTodos ? 'center' : 'left',
          }"
        >
          <a-button type="primary" @click="openAddModal">Add todo</a-button>
        </div>
      </a-col>
      <!-- in case no items in the array -->
      <a-col :span="24" v-if="allTodos.length <= 0 || !allTodos">
        <div>
          <a-typography-title :level="5" class="text-center"
            >No Todos yet add one</a-typography-title
          >
        </div>
      </a-col>
    </a-row>
    <todo-card
      v-for="item in allTodos"
      :key="item.id"
      :title="item.title"
      :id="+item.id"
      :completed="item.completed"
    ></todo-card>

    <!-- add todo modal -->
    <a-modal
      v-model:visible="visible"
      title="Add todo"
      okText="Save"
      @ok="addTodo"
    >
      <a-input v-model:value="title" placeholder="Title" />
    </a-modal>
    <!-- loading -->
    <a-spin v-if="loading" class="loader" />
  </div>
  <!-- in case error -->
  <div v-else>
    <div class="error-container">
      <div class="text-center">
        <a-typography-title type="danger" :level="5">
          {{ error.message }}
        </a-typography-title>
        <a-button type="primary" @click="reload">Try again</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TodoCard from './components/TodoCard.vue';

export default {
  name: 'App',
  data() {
    return {
      visible: false,
      title: '',
    };
  },
  components: {
    TodoCard,
  },

  mounted() {
    this.getAllTodos();
  },
  methods: {
    ...mapActions('todoStore', ['getAllTodos', 'createTodo']),
    openAddModal() {
      this.visible = true;
    },
    async addTodo() {
      await this.createTodo({
        title: this.title,
      });
      this.visible = false;
    },
    reload() {
      window.location.reload();
    },
  },
  computed: {
    ...mapGetters('todoStore', ['allTodos']),
    ...mapGetters(['loading', 'error']),
  },
};
</script>

<style scoped>
.loader {
  background-color: rgba(255, 255, 255, 0.803);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-center {
  text-align: center;
}
.button-container {
  margin-top: 5px;
  width: 100%;
}
.button-container-col {
  margin: 0 auto;
}

.error-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  display: block;
}
</style>
