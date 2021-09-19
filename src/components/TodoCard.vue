<template>
  <a-row>
    <a-col :span="12" class="card-col"
      ><a-card
        title="Default size card"
        class="card"
        :bodyStyle="{ height: 0, padding: 0 }"
      >
        <template #extra>
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
          <!-- done -->
          <a-button type="primary" class="complete-button" @click.prevent
            >Done</a-button
          >
        </template>
      </a-card></a-col
    >
  </a-row>
  <!-- delete modal -->
  <a-modal
    v-model:visible="deleteVisible"
    title="Are you sure?"
    okText="Delete"
    okType="danger primary"
  >
    <p>You are going to delete this Todo!</p>
  </a-modal>
  <!-- upddate modal -->
  <a-modal v-model:visible="updateVisible" title="Update todo" okText="Save">
    <a-input v-model:value="updateValue" placeholder="Title" />
  </a-modal>
</template>

<script>
export default {
  props: {
    title: String,
    loading: Boolean,
  },
  data() {
    return {
      deleteVisible: false,
      updateVisible: false,
      updateValue: '',
    };
  },
  methods: {
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
}
.complete-button {
  background-color: rgb(50, 159, 90);
  margin: 0 5px;
}
</style>
