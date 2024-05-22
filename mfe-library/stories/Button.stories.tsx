import { StoryFn, Meta } from '@storybook/react';
import { Button, ButtonProps } from '../lib/components/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: 'Primary Button',
};

export const Secondary = Template.bind({});

Secondary.args = {
  label: 'Secondary Button',
};
