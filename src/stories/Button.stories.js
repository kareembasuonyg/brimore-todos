import { Button } from 'ant-design-vue';

export default {
  title: 'Button',
  component: Button,
};
const Template = (args) => (
  <Button {...args}>Hello Button</Button>
);
export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};
export const Success = Template.bind({});
Success.args = {
  type: 'primary',
  style: 'background-color:rgb(50, 159, 90)',
};
export const Outlined = Template.bind({});
export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  ghost: true,
};
