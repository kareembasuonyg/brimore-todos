<template>
  <Dropdown>
    <Button
      type="primary"
      class="ant-dropdown-link"
      @click.prevent
      >More</Button
    >
    <template #overlay>
      <Menu>
        <MenuItem>
          <Button type="link" @click="openUpdateModal"
            >Update</Button
          >
        </MenuItem>
        <MenuItem>
          <Button
            type="link"
            danger
            @click="openDeleteModal"
            >Delete</Button
          >
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script>
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
