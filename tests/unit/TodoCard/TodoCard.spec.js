import { mount } from '@vue/test-utils';
import TodoCard from '../../../src/components/TodoCard.vue';
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
jest.mock('axios', () => ({
  get: jest.fn(() => ({
    data: [
      {
        completed: false,
        id: 1,
        title: 'delectus aut autem',
        userId: 1,
      },
    ],
  })),
  post: jest.fn(() => ({
    data: {
      completed: false,
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
    },
  })),
}));
describe('Todo card buttons', () => {
  // =============================================
  test('Delete button acts correctly', async () => {
    const wrapper = mount(TodoCard, {
      global: {
        plugins: [vuexStore],
      },
    });
    await wrapper.vm.deleteTodoById(1);
    const todos = vuexStore.getters['todoStore/allTodos'];
    expect(todos).toHaveLength(0);
  });
  //   =============================================
  test('Update button acts correctly', async () => {
    const wrapper = mount(TodoCard, {
      global: {
        plugins: [vuexStore],
      },
      data() {
        return { finalUpdatedValue: 'this is test update' };
      },
      props: {
        id: 1,
      },
    });
    await vuexStore.dispatch('todoStore/createTodo', {
      title: 'delectus aut autem',
    });

    await wrapper.vm.updateTodo();
    const todos = vuexStore.getters['todoStore/allTodos'];
    expect(todos[0].title).toBe('this is test update');
  });
  //   =============================================
  test('Update button acts correctly with null values', async () => {
    const wrapper = mount(TodoCard, {
      global: {
        plugins: [vuexStore],
      },
      data() {
        return { finalUpdatedValue: null };
      },
      props: {
        id: 1,
      },
    });
    await vuexStore.dispatch('todoStore/createTodo', {
      title: 'delectus aut autem',
    });

    await wrapper.vm.updateTodo();
    const todos = vuexStore.getters['todoStore/allTodos'];
    expect(todos[0].title).toBe('delectus aut autem');
  });
  //   =============================================
  test('Complete button acts correctly', async () => {
    const wrapper = mount(TodoCard, {
      global: {
        plugins: [vuexStore],
      },

      props: {
        id: 1,
      },
    });
    await vuexStore.dispatch('todoStore/createTodo', {
      title: 'delectus aut autem',
    });

    await wrapper.vm.completeTodo();
    const todos = vuexStore.getters['todoStore/allTodos'];
    expect(todos[0].completed).toBeTruthy();
  });
});
