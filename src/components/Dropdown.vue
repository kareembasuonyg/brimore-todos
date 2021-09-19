<template>
  <a-dropdown>
    <a-button type="primary" class="ant-dropdown-link" @click.prevent
      >More</a-button
    >
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a-button type="link" @click="openUpdateModal">Update</a-button>
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

<script>
export default {
  name: 'Dropdown',
  props: {
    openDeleteModal: Function,
    openUpdateModal: Function,
  },
};
</script>

<style></style>
