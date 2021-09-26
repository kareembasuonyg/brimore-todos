<template>
  <Dropdown>
    <Button
      type="primary"
      class="ant-dropdown-link"
      @click.prevent
      data-test="more-button"
      >More</Button
    >
    <template #overlay>
      <Menu>
        <MenuItem>
          <Button
            type="link"
            @click="openUpdateModal"
            data-test="update-todo-button"
            >Update</Button
          >
        </MenuItem>
        <MenuItem>
          <Button
            type="link"
            danger
            @click="openDeleteModal"
            data-test="delete-todo-button"
            >Delete</Button
          >
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script>
/*eslint-disable */
import { Button, Dropdown, Menu } from 'ant-design-vue';

export default {
  name: 'DropdownButton',
  props: {
    openDeleteModal: Function,
    openUpdateModal: Function,
  },
  components: {
    Button,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
  },
};
</script>

<style></style>
