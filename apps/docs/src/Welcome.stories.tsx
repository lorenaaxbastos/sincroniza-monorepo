import type { Meta, StoryObj } from '@storybook/react';

function WelcomeComponent() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Sincroniza Design System</h1>
      <p>O ecossistema visual está pronto e configurado com React 19!</p>
    </div>
  );
}

const meta: Meta<typeof WelcomeComponent> = {
  title: 'Design System/Welcome',
  component: WelcomeComponent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
