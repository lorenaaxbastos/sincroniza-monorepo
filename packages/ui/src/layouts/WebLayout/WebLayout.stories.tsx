import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { WebLayout } from './WebLayout';

type WebLayoutStoryProps = React.ComponentProps<typeof WebLayout> &
  Record<string, unknown>;

const meta: Meta<WebLayoutStoryProps> = {
  title: 'Layouts/WebLayout',
  component: WebLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <ArgTypes />
        </>
      ),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    header: { table: { category: 'Propriedades (Props)' } },
    footer: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-web-layout-bg': {
      control: 'text',
      description: 'Cor de fundo da casca da página',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--color-bg-canvas)' },
      },
    },
    '--sinc-web-layout-main-padding': {
      control: 'text',
      description: 'Padding interno do container principal (desktop)',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--spacing-6)' },
      },
    },
    '--sinc-web-layout-main-padding-mobile': {
      control: 'text',
      description: 'Padding interno do container principal (mobile)',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--spacing-4)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TopbarMock = () => (
  <div
    style={{
      height: '6.4rem',
      backgroundColor: 'var(--color-gray-100)',
      borderBottom: 'var(--spacing-px) solid var(--color-gray-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--spacing-4)',
    }}
  >
    <strong>Header</strong>
    <button data-theme-toggle>Alternar tema</button>
  </div>
);

const FooterMock = () => (
  <div
    style={{
      padding: 'var(--spacing-3) var(--spacing-4)',
      backgroundColor: 'var(--color-gray-100)',
      borderTop: 'var(--spacing-px) solid var(--color-gray-300)',
      textAlign: 'center',
      fontSize: 'var(--font-size-xs)',
    }}
  >
    © 2026 Sincroniza Educação - Todos os direitos reservados.
  </div>
);

export const Padrão: Story = {
  args: {
    header: <TopbarMock />,
    children: (
      <div style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h1>Conteúdo principal da página</h1>
      </div>
    ),
    footer: <FooterMock />,
  },
};
