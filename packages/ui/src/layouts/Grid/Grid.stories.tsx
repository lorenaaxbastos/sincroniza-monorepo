import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

type GridStoryProps = React.ComponentProps<typeof Grid> &
  Record<string, unknown>;

const meta: Meta<GridStoryProps> = {
  title: 'Layouts/Grid',
  component: Grid,
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
    cols: 3,
    gap: 'md',
  },
  argTypes: {
    as: { table: { category: 'Propriedades (Props)' } },
    cols: { table: { category: 'Propriedades (Props)' } },
    colsXl: { table: { category: 'Propriedades (Props)' } },
    colsLg: { table: { category: 'Propriedades (Props)' } },
    colsMd: { table: { category: 'Propriedades (Props)' } },
    colsSm: { table: { category: 'Propriedades (Props)' } },
    minItemWidth: { table: { category: 'Propriedades (Props)' } },
    gap: { table: { category: 'Propriedades (Props)' } },
    gapXl: { table: { category: 'Propriedades (Props)' } },
    gapLg: { table: { category: 'Propriedades (Props)' } },
    gapMd: { table: { category: 'Propriedades (Props)' } },
    gapSm: { table: { category: 'Propriedades (Props)' } },
    align: { table: { category: 'Propriedades (Props)' } },
    justify: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-grid-cols': {
      control: 'text',
      description: 'Template de colunas padrão do Grid',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-grid-gap': {
      control: 'text',
      description: 'Espaçamento padrão entre linhas e colunas',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-grid-align': {
      control: 'text',
      description: 'Alinhamento vertical dos itens',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-grid-justify': {
      control: 'text',
      description: 'Alinhamento horizontal dos itens',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridItemMock = ({
  index,
  detail,
}: {
  index: number;
  detail?: string;
}) => (
  <div
    style={{
      padding: '1.6rem',
      backgroundColor: 'var(--color-primary-light)',
      border: '1px solid var(--color-primary)',
      borderRadius: 'var(--radii-md)',
      color: 'var(--color-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.4rem',
    }}
  >
    <strong style={{ fontSize: '1.4rem' }}>Item #{index}</strong>
    {detail && (
      <span
        style={{
          fontSize: '1.1rem',
          fontFamily: 'monospace',
          backgroundColor: 'var(--color-white)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radii-sm)',
          border: '1px solid var(--color-primary)',
        }}
      >
        {detail}
      </span>
    )}
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
    cols: 3,
    gap: 'md',
  },
  render: (args) => (
    <div>
      <StoryConfigInfo
        label="Configuração padrão"
        code={`cols={3} | gap="md"`}
      />
      <Grid {...args}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItemMock key={i} index={i} detail="Colunas fixas" />
        ))}
      </Grid>
    </div>
  ),
};

export const AutoFitAutoWidth: Story = {
  args: {
    minItemWidth: '30rem',
    gap: 'md',
  },
  render: (args) => (
    <div>
      <StoryConfigInfo
        label="Ajuste fluido sem breakpoints"
        code={`minItemWidth="30rem" | gap="md"`}
      />
      <Grid {...args}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItemMock key={i} index={i} detail="minWidth: 30rem" />
        ))}
      </Grid>
    </div>
  ),
};

export const ResponsivoPorBreakpoints: Story = {
  args: {
    cols: 4,
    colsLg: 3,
    colsMd: 2,
    colsSm: 1,
    gap: 'lg',
    gapSm: 'xs',
  },
  render: (args) => (
    <div>
      <StoryConfigInfo
        label="Breakpoints manuais"
        code={`Desktop: 4 cols | LG (≤1024px): 3 cols | MD (≤768px): 2 cols | SM (≤576px): 1 col`}
      />
      <Grid {...args}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <GridItemMock key={i} index={i} detail="Breakpoints ativos" />
        ))}
      </Grid>
    </div>
  ),
};
