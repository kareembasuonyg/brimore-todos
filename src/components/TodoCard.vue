<template>
  <Row>
    <Col :span="12" class="card-col"
      ><Card
        :title="title"
        class="card"
        :bodyStyle="{ height: 0, padding: 0 }"
        :style="{
          borderLeftColor: completed ? 'green' : 'red',
        }"
      >
        <template #extra>
          <!-- done button -->
          <Button
            type="primary"
            class="complete-button"
            @click="completeTodo(id)"
            v-if="!completed"
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
  >
    <p>You are going to delete this Todo!</p>
    <template #footer>
      <Button danger @click="deleteTodo(id)">Delete</Button>
    </template>
  </Modal>
  <!-- upddate modal -->
  <Modal
    v-model:visible="updateVisible"
    title="Update todo"
  >
    <template #footer>
      <Button @click="updateTodoWrap" type="primary" ghost
        >Save</Button
      >
    </template>
    <Input
      v-model:value="updateValue"
      placeholder="Title"
    />
  </Modal>
</template>

<script>
import {
  Button,
  Row,
  Col,
  Modal,
  Input,
  Card,
} from 'ant-design-vue';
import DropdownButton from './DropdownButton.vue';

export default {
  components: {
    Button,
    Row,
    Col,
    Modal,
    Input,
    Card,
    DropdownButton,
  },
  name: 'TodoCard',
  props: {
    title: String,
    id: Number,
    completed: Boolean,
    completeTodo: Function,
    updateTodo: Function,
    deleteTodo: Function,
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
    async updateTodoWrap() {
      if (this.finalUpdatedValue) {
        await this.updateTodo(
          this.id,
          this.finalUpdatedValue
        );
        this.updateVisible = false;
      }
    },
    openDeleteModal() {
      this.deleteVisible = true;
    },
    openUpdateModal() {
      this.updateVisible = true;
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
