import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

type StackStoryProps = React.ComponentProps<typeof Stack> &
  Record<string, unknown>;

const meta: Meta<StackStoryProps> = {
  title: 'Layouts/Stack',
  component: Stack,
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
    direction: 'row',
    gap: 'md',
    align: 'center',
    justify: 'flex-start',
  },
  argTypes: {
    as: { table: { category: 'Propriedades (Props)' } },
    direction: { table: { category: 'Propriedades (Props)' } },
    directionXl: { table: { category: 'Propriedades (Props)' } },
    directionLg: { table: { category: 'Propriedades (Props)' } },
    directionMd: { table: { category: 'Propriedades (Props)' } },
    directionSm: { table: { category: 'Propriedades (Props)' } },
    gap: { table: { category: 'Propriedades (Props)' } },
    gapXl: { table: { category: 'Propriedades (Props)' } },
    gapLg: { table: { category: 'Propriedades (Props)' } },
    gapMd: { table: { category: 'Propriedades (Props)' } },
    gapSm: { table: { category: 'Propriedades (Props)' } },
    align: { table: { category: 'Propriedades (Props)' } },
    justify: { table: { category: 'Propriedades (Props)' } },
    wrap: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-stack-dir': {
      control: 'text',
      description: 'Direção do fluxo flex padrão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-stack-gap': {
      control: 'text',
      description: 'Espaçamento flex padrão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-stack-align': {
      control: 'text',
      description: 'Alinhamento align-items padrão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-stack-justify': {
      control: 'text',
      description: 'Alinhamento justify-content padrão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-stack-wrap': {
      control: 'text',
      description: 'Comportamento de flex-wrap padrão',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StackItemMock = ({
  index,
  height,
}: {
  index: number;
  height?: string;
}) => (
  <div
    style={{
      padding: '1.6rem 2.4rem',
      backgroundColor: 'var(--color-primary-light)',
      border: 'var(--spacing-px) solid var(--color-primary)',
      borderRadius: 'var(--radii-md)',
      color: 'var(--color-primary)',
      fontWeight: 'var(--font-weight-semibold)',
      textAlign: 'center',
      height: height ?? 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Item #{index}
  </div>
);

const StoryConfigInfo = ({ label, code }: { label: string; code: string }) => (
  <div
    style={{
      marginBottom: '1.6rem',
      padding: '0.8rem 1.2rem',
      backgroundColor: 'var(--color-gray-100)',
      borderLeft: '4px solid var(--color-primary)',
      borderRadius: 'var(--radii-sm)',
      fontSize: '1.3rem',
      color: 'var(--color-gray-700)',
    }}
  >
    <strong>{label}:</strong>{' '}
    <code style={{ color: 'var(--color-primary)' }}>{code}</code>
  </div>
);

export const Padrão: Story = {
  args: {
    direction: 'row',
    gap: 'md',
    align: 'center',
  },
  render: (args) => (
    <div>
      <StoryConfigInfo
        label="Fluxo horizontal (padrão)"
        code={`direction="row" | gap="md" | align="center"`}
      />
      <Stack {...args}>
        {[1, 2, 3, 4].map((i) => (
          <StackItemMock key={i} index={i} />
        ))}
      </Stack>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    direction: 'column',
    gap: 'md',
  },
  render: (args) => (
    <div>
      <StoryConfigInfo
        label="Fluxo vertical"
        code={`direction="column" | gap="md"`}
      />
      <Stack {...args}>
        {[1, 2, 3].map((i) => (
          <StackItemMock key={i} index={i} />
        ))}
      </Stack>
    </div>
  ),
};

export const ResponsivoPorBreakpoints: Story = {
  args: {
    direction: 'row',
    directionMd: 'column',
    gap: 'xl',
    gapSm: 'xs',
  },
  render: (args) => (
    <div>
      <StoryConfigInfo
        label="Responsivo (row → column no mobile)"
        code={`Desktop: row (gap: xl) | MD (≤768px): column | SM (≤576px): gap: xs`}
      />
      <Stack {...args}>
        {[1, 2, 3, 4].map((i) => (
          <StackItemMock key={i} index={i} />
        ))}
      </Stack>
    </div>
  ),
};

export const AlinhamentoEJustificativa: Story = {
  args: {
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    gap: 'md',
  },
  render: (args) => (
    <div
      style={{
        minHeight: '16rem',
        border: '1px dashed var(--color-gray-300)',
        padding: '1.6rem',
        borderRadius: 'var(--radii-md)',
      }}
    >
      <StoryConfigInfo
        label="Distribuição e alturas variadas"
        code={`justify="space-between" | align="center"`}
      />
      <Stack {...args}>
        <StackItemMock index={1} height="4rem" />
        <StackItemMock index={2} height="8rem" />
        <StackItemMock index={3} height="6rem" />
      </Stack>
    </div>
  ),
};
