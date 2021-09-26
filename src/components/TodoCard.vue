<template>
  <Row>
    <Col :span="12" class="card-col"
      ><Card
        :title="title"
        class="card"
        :bodyStyle="{ height: 0, padding: 0 }"
        :style="{ borderLeftColor: completed ? 'green' : 'red' }"
        data-test="todo-card"
      >
        <template #extra>
          <!-- done button -->
          <Button
            type="primary"
            class="complete-button"
            @click="completeTodo"
            v-if="!completed"
            data-test="complete-todo"
            >Done</Button
          >
          <!-- dropdown -->
          <dropdown-button
            :openDeleteModal="openDeleteModal"
            :openUpdateModal="openUpdateModal"
          ></dropdown-button>
        </template> </Card
    ></Col>
  </Row>
  <!-- delete modal -->
  <Modal
    v-model:visible="deleteVisible"
    title="Are you sure?"
    data-test="delete-todo"
  >
    <p>You are going to delete this Todo!</p>

    <template #footer>
      <Button danger data-test="delete-todo" @click="deleteTodoById(id)"
        >Delete</Button
      >
    </template>
  </Modal>
  <!-- upddate modal -->
  <Modal v-model:visible="updateVisible" title="Update todo">
    <template #footer>
      <Button data-test="update-todo" @click="updateTodo" type="primary" ghost
        >Save</Button
      >
    </template>
    <Input v-model:value="updateValue" placeholder="Title" />
  </Modal>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import { Button, Row, Col, Modal, Input, Card, Menu } from 'ant-design-vue';
import DropdownButton from './DropdownButton.vue';

export default {
  components: {
    Button,
    Row,
    Col,
    Modal,
    Input,
    Card,
    Menu,
    MenuItem: Menu.Item,
    DropdownButton,
  },
  name: 'TodoCard',
  props: {
    title: String,
    id: Number,
    completed: Boolean,
  },
  data() {
    return {
      deleteVisible: false,
      updateVisible: false,
      finalUpdatedValue: null,
    };
  },
  computed: {
    updateValue: {
      set(value) {
        this.finalUpdatedValue = value;
      },
      get() {
        return this.finalUpdatedValue !== null
          ? this.finalUpdatedValue
          : this.title;
      },
    },
  },
  methods: {
    ...mapActions('todoStore', ['deleteTodoById', 'updateTodoById']),
    openDeleteModal() {
      this.deleteVisible = true;
    },
    openUpdateModal() {
      this.updateVisible = true;
    },
    async updateTodo() {
      if (this.finalUpdatedValue) {
        await this.updateTodoById({
          id: this.id,
          body: {
            title: this.finalUpdatedValue,
          },
        });
        this.updateVisible = false;
      }
    },
    async completeTodo() {
      await this.updateTodoById({
        id: this.id,
        body: {
          completed: true,
        },
      });
    },
  },
};
</script>

<style scoped>
.card-col {
  margin: 20px auto;
}
.card {
  width: 100%;
  border-left-width: 3px;
}
.complete-button {
  background-color: rgb(50, 159, 90);
  margin: 0 5px;
}
</style>
