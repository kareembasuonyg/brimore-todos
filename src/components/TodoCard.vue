<template>
  <a-row>
    <a-col :span="12" class="card-col"
      ><a-card
        :title="title"
        class="card"
        :bodyStyle="{ height: 0, padding: 0 }"
        :style="{ borderLeftColor: completed ? 'green' : 'red' }"
      >
        <template #extra>
          <!-- done button -->
          <a-button
            type="primary"
            class="complete-button"
            @click="completeTodo"
            v-if="!completed"
            >Done</a-button
          >
          <!-- dropdown -->
          <a-dropdown>
            <a-button type="primary" class="ant-dropdown-link" @click.prevent
              >More</a-button
            >
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a-button type="link" @click="openUpdateModal"
                    >Update</a-button
                  >
                </a-menu-item>
                <a-menu-item>
                  <a-button type="link" danger @click="openDeleteModal"
                    >Delete</a-button
                  >
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-card></a-col
    >
  </a-row>
  <!-- delete modal -->
  <a-modal
    v-model:visible="deleteVisible"
    title="Are you sure?"
    okText="Delete"
    okType="danger"
    @ok="deleteTodoById(id)"
  >
    <p>You are going to delete this Todo!</p>
  </a-modal>
  <!-- upddate modal -->
  <a-modal
    v-model:visible="updateVisible"
    title="Update todo"
    okText="Save"
    @ok="updateTodo"
  >
    <a-input v-model:value="updateValue" placeholder="Title" />
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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
