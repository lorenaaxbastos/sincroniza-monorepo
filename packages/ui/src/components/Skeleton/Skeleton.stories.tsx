import { useState } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Skeleton } from './Skeleton';
import type { SkeletonProps } from './Skeleton';

type SkeletonStoryProps = SkeletonProps & Record<string, unknown>;

const meta: Meta<SkeletonStoryProps> = {
  title: 'Componentes/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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
    variant: 'text',
    animation: 'pulse',
    count: 1,
    isLoaded: false,
    loadingText: 'Carregando conteúdo...',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      table: { category: 'Propriedades (Props)' },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      table: { category: 'Propriedades (Props)' },
    },
    count: {
      control: 'number',
      table: { category: 'Propriedades (Props)' },
    },
    isLoaded: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    width: {
      control: 'text',
      table: { category: 'Propriedades (Props)' },
    },
    height: {
      control: 'text',
      table: { category: 'Propriedades (Props)' },
    },
    loadingText: {
      control: 'text',
      table: { category: 'Propriedades (Props)' },
    },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-skeleton-bg': {
      control: 'color',
      description: 'Cor de fundo base do placeholder.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-skeleton-highlight': {
      control: 'color',
      description: 'Cor de brilho para a animação `wave`.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-skeleton-radius': {
      control: 'text',
      description: 'Raio de borda customizado na variante `rounded`.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-skeleton-duration': {
      control: 'text',
      description: 'Duração do ciclo de animação (ex: "1.5s").',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  render: (args) => <Skeleton {...args} width="100%" />,
};

export const VariantesGeometricas: Story = {
  name: 'Variantes Geométricas',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Text (texto)</p>
        <Skeleton {...args} variant="text" width="60%" />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Circular (avatar / ícone)
        </p>
        <Skeleton {...args} variant="circular" width={48} height={48} />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Rounded (cards / imagens)
        </p>
        <Skeleton {...args} variant="rounded" width="100%" height={120} />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Rectangular (sem bordas arredondadas)
        </p>
        <Skeleton {...args} variant="rectangular" width="100%" height={80} />
      </div>
    </div>
  ),
};

export const Animacoes: Story = {
  name: 'Tipos De Animação',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Pulse</p>
        <Skeleton {...args} animation="pulse" variant="rounded" height={60} />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Wave</p>
        <Skeleton {...args} animation="wave" variant="rounded" height={60} />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>None</p>
        <Skeleton {...args} animation="none" variant="rounded" height={60} />
      </div>
    </div>
  ),
};

export const MúltiplasLinhasCount: Story = {
  name: 'Múltiplas Linhas',
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
        Simulando parágrafo (count={4})
      </p>
      <Skeleton {...args} variant="text" count={4} />
    </div>
  ),
};

const WrapperDemo = (args: SkeletonStoryProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '360px',
      }}
    >
      <Button
        size="sm"
        onClick={() => {
          setIsLoading((prev) => !prev);
        }}
      >
        {isLoading ? 'Simular Dados Carregados' : 'Recarregar Skeleton'}
      </Button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          border: '1px solid var(--color-gray-200)',
          borderRadius: 'var(--radii-md)',
        }}
      >
        <Skeleton
          {...args}
          isLoaded={!isLoading}
          variant="circular"
          width={48}
          height={48}
        >
          <Avatar name="Maria Silva" />
        </Skeleton>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          <Skeleton {...args} isLoaded={!isLoading} variant="text" width="70%">
            <strong style={{ color: 'var(--color-gray-900)' }}>
              Maria Silva
            </strong>
          </Skeleton>

          <Skeleton {...args} isLoaded={!isLoading} variant="text" width="90%">
            <span
              style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}
            >
              Engenheira de Software
            </span>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export const ModoWrapper: Story = {
  name: 'Modo Wrapper',
  render: (args) => <WrapperDemo {...args} />,
};
