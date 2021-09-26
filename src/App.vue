<template>
  <div v-if="!error">
    <Row type="flex" justify="center">
      <Col :span="12" class="button-container-col">
        <div
          class="button-container"
          :style="{
            textAlign: allTodos.length <= 0 || !allTodos ? 'center' : 'left',
          }"
        >
          <Button type="primary" @click="openAddModal">Add todo</Button>
        </div>
      </Col>
      <!-- in case no items in the array -->
      <Col :span="24" v-if="allTodos.length <= 0 || !allTodos">
        <div>
          <TypographyTitle :level="5" class="text-center"
            >No Todos yet add one</TypographyTitle
          >
        </div>
      </Col>
    </Row>
    <todo-card
      v-for="item in allTodos"
      :key="item.id"
      :title="item.title"
      :id="+item.id"
      :completed="item.completed"
    ></todo-card>

    <!-- add todo modal -->
    <Modal
      v-model:visible="visible"
      title="Add todo"
      okText="Save"
      @ok="addTodo"
    >
      <Input v-model:value="title" placeholder="Title" />
    </Modal>
    <!-- loading -->
    <Spin v-if="loading" class="loader" />
  </div>
  <!-- in case error -->
  <div v-else>
    <div class="error-container">
      <div class="text-center">
        <TypographyTitle type="danger" :level="5">
          {{ error.message }}
        </TypographyTitle>
        <Button type="primary" @click="reload">Try again</Button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import {
  Button,
  Row,
  Col,
  Modal,
  Input,
  Spin,
  Typography,
} from 'ant-design-vue';
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
    Button,
    Row,
    Col,
    Modal,
    Input,
    Spin,
    TypographyTitle: Typography.Title,
  },

  async mounted() {
    await this.getAllTodos();
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
