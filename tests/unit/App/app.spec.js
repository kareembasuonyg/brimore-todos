import { mount } from '@vue/test-utils';
import axios from 'axios';
import App from '../../../src/App.vue';
import vuexStore from '../../../src/store/index';
import httpConfig from '../../../src/core/http';

httpConfig(vuexStore);
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

jest.mock('axios');
describe('Testing rendering todos cards', () => {
  // =============================================
  test('Render correct length', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuexStore],
      },
    });
    axios.get.mockResolvedValueOnce({
      data: [
        {
          completed: false,
          id: 1,
          title: 'delectus aut autem',
          userId: 1,
        },
      ],
    });
    await vuexStore.dispatch('todoStore/getAllTodos');
    const todos = wrapper.findAll('[data-test="todo-card"]');
    expect(todos).toHaveLength(1);
  });
  // =============================================
  test('If no todos', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuexStore],
      },
    });
    axios.get.mockResolvedValueOnce({
      data: [],
    });
    await wrapper.vm.getAllTodos();
    const todos = vuexStore.getters['todoStore/allTodos'];
    expect(todos).toHaveLength(0);
  });
});
describe('Todo card buttons', () => {
  // =============================================
  test('Add todo', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuexStore],
      },
      data() {
        return { title: 'this is test', visible: true };
      },
    });
    axios.get.mockResolvedValueOnce({
      data: [
        {
          completed: false,
          id: 1,
          title: 'delectus aut autem',
          userId: 1,
        },
      ],
    });
    axios.post.mockResolvedValueOnce({
      data: [
        {
          completed: false,
          id: 1,
          title: 'delectus aut autem',
          userId: 1,
        },
      ],
    });
    await vuexStore.dispatch('todoStore/getAllTodos');
    const todosLength = vuexStore.getters['todoStore/allTodos'].length;
    await wrapper.vm.addTodo();
    const UpdatedTodosLength = vuexStore.getters['todoStore/allTodos'];
    expect(UpdatedTodosLength).toHaveLength(todosLength + 1);
  });
});
describe('Error Case', () => {
  // =============================================
  test('If error occurred', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuexStore],
      },
    });
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('error')));
    await wrapper.vm.getAllTodos();
    const { error } = vuexStore.getters;
    expect(error).not.toBe(null);
  });
});
