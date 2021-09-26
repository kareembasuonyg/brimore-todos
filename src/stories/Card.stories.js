import TodoCard from '../components/TodoCard.vue';

export default {
  title: 'Card',
  component: TodoCard,
};
const Template = (args) => <TodoCard {...args}></TodoCard>;
export const Completed = Template.bind({});
Completed.args = {
  title: 'This is completed story',
  id: 1,
  completed: true,
  completeTodo: () => alert('Completed'),
  updateTodo: () => alert('Updated'),
  deleteTodo: () => alert('Deleted'),
};
export const NotCompleted = Template.bind({});
NotCompleted.args = {
  title: 'This is not completed story',
  id: 1,
  completed: false,
  completeTodo: () => alert('Completed'),
  updateTodo: () => alert('Updated'),
  deleteTodo: () => alert('Deleted'),
};
