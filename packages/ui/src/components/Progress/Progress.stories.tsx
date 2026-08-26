import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import type { ProgressColor, ProgressProps, ProgressSize } from './Progress';

type ProgressStoryProps = ProgressProps & Record<string, unknown>;

const meta: Meta<ProgressStoryProps> = {
  title: 'Componentes/Progress',
  component: Progress,
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
    value: 65,
    max: 100,
    color: 'primary',
    size: 'md',
    variant: 'continuous',
    segments: 5,
    isIndeterminate: false,
    showValueLabel: true,
    label: 'Progresso do download',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'success',
        'warning',
        'error',
        'info',
        'light',
        'dark',
        'white',
        'black',
        'surface',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['continuous', 'segmented'] },
    segments: { control: 'number' },
    isIndeterminate: { control: 'boolean' },
    showValueLabel: { control: 'boolean' },
    label: { control: 'text' },
    '--sinc-progress-color': {
      control: 'text',
      description:
        'Cor customizada do indicador (aceita valores hex, rgb ou gradientes)',
      table: { category: 'Variáveis CSS' },
      defaultValue: { summary: 'var(--color-primary)' },
    },
    '--sinc-progress-height': {
      control: 'text',
      description: 'Altura/espessura customizada da barra de progresso',
      table: { category: 'Variáveis CSS' },
      defaultValue: { summary: '0.8rem' },
    },
    '--sinc-progress-radius': {
      control: 'text',
      description:
        'Arredondamento dos cantos da barra de progresso e dos segmentos',
      table: { category: 'Variáveis CSS' },
      defaultValue: { summary: 'var(--radii-pill)' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StoryRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
      width: '100%',
    }}
  >
    <span
      style={{
        fontSize: '1.2rem',
        fontFamily: 'monospace',
        color: 'var(--color-gray-500)',
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

export const Padrão: Story = {};

export const Segmentado: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '50rem',
      }}
    >
      <StoryRow label="Etapa 2 de 5 (40% de progresso)">
        <Progress
          variant="segmented"
          segments={5}
          value={40}
          label="Passos do formulário"
          showValueLabel
        />
      </StoryRow>

      <StoryRow label="Etapa 3 de 4 (75% de progresso)">
        <Progress
          variant="segmented"
          segments={4}
          value={75}
          color="success"
          label="Nível de segurança"
          showValueLabel
        />
      </StoryRow>
    </div>
  ),
};

export const Cores: Story = {
  render: () => {
    const colors: ProgressColor[] = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'success',
      'warning',
      'error',
      'info',
      'light',
      'dark',
      'white',
      'black',
      'surface',
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem',
          maxWidth: '50rem',
        }}
      >
        {colors.map((c) => (
          <StoryRow key={c} label={`color="${c}"`}>
            <Progress color={c} value={70} />
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Tamanhos: Story = {
  render: () => {
    const sizes: ProgressSize[] = ['sm', 'md', 'lg'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '50rem',
        }}
      >
        {sizes.map((s) => (
          <StoryRow key={s} label={`size="${s}"`}>
            <Progress
              size={s}
              value={60}
              label={`Tamanho ${s}`}
              showValueLabel
            />
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Indeterminado: Story = {
  render: () => (
    <div style={{ maxWidth: '50rem' }}>
      <Progress isIndeterminate label="Processando arquivo no servidor..." />
    </div>
  ),
};
