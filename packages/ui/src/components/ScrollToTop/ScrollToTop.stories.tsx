import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToTop } from './ScrollToTop';
import type { ScrollToTopProps } from './ScrollToTop';

type ScrollToTopStoryProps = ScrollToTopProps & Record<string, unknown>;

const meta: Meta<ScrollToTopStoryProps> = {
  title: 'Componentes/ScrollToTop',
  component: ScrollToTop,
  tags: ['autodocs'],
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
  args: {
    threshold: 200,
    ariaLabel: 'Voltar ao topo da página',
    iconSize: 24,
  },
  argTypes: {
    threshold: { table: { category: 'Propriedades (Props)' } },
    targetSelector: { table: { category: 'Propriedades (Props)' } },
    ariaLabel: { table: { category: 'Propriedades (Props)' } },
    iconSize: { table: { category: 'Propriedades (Props)' } },
    buttonProps: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-scroll-to-top-shadow': {
      control: 'text',
      description: 'Sombra de elevação aplicada ao botão flutuante',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrão: Story = {
  render: (args) => (
    <div
      style={{
        minHeight: '200vh',
        padding: '3.2rem',
        backgroundColor: 'var(--color-gray-50)',
      }}
    >
      <h2 style={{ fontSize: '2.4rem', marginBottom: '1.6rem' }}>
        Role a página para baixo
      </h2>
      <p style={{ fontSize: '1.6rem', color: 'var(--color-gray-600)' }}>
        O botão de voltar ao topo aparecerá no canto inferior direito assim que
        a rolagem ultrapassar {args.threshold}px.
      </p>

      <div
        style={{
          marginTop: '100vh',
          padding: '2.4rem',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radii-md)',
        }}
      >
        <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>
          Você rolu bastante! Clique no botão flutuante para subir.
        </p>
      </div>

      <ScrollToTop {...args} />
    </div>
  ),
};

export const Customizado: Story = {
  args: {
    threshold: 100,
    iconSize: 20,
    buttonProps: {
      color: 'secondary',
      size: 'lg',
    },
  },
  render: (args) => (
    <div
      style={{
        minHeight: '200vh',
        padding: '3.2rem',
        backgroundColor: 'var(--color-gray-50)',
      }}
    >
      <h2 style={{ fontSize: '2.4rem', marginBottom: '1.6rem' }}>
        Botão customizado com{' '}
        <span style={{ fontFamily: 'monospace' }}>
          color=&apos;secondary&apos;
        </span>
      </h2>
      <ScrollToTop {...args} />
    </div>
  ),
};
