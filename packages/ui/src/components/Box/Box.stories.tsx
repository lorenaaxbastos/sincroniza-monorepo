import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import type {
  BoxColor,
  BoxProps,
  BoxRadius,
  BoxShadow,
  BoxVariant,
} from './Box';

type BoxStoryProps = BoxProps & Record<string, unknown>;

const meta: Meta<BoxStoryProps> = {
  title: 'Componentes/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
    children: 'Conteúdo interno do Box',
  },
  argTypes: {
    as: { table: { category: 'Propriedades (Props)' } },
    variant: { table: { category: 'Propriedades (Props)' } },
    color: { table: { category: 'Propriedades (Props)' } },
    border: { table: { category: 'Propriedades (Props)' } },
    radius: { table: { category: 'Propriedades (Props)' } },
    shadow: { table: { category: 'Propriedades (Props)' } },
    padding: { table: { category: 'Propriedades (Props)' } },
    paddingBlock: { table: { category: 'Propriedades (Props)' } },
    paddingInline: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-box-color': {
      control: 'text',
      description: 'Cor do texto do contêiner',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-box-bg': {
      control: 'text',
      description: 'Cor de fundo do contêiner',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-box-border': {
      control: 'text',
      description: 'Estilo completo da borda',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-box-border-radius': {
      control: 'text',
      description: 'Arredondamento das bordas',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-box-shadow': {
      control: 'text',
      description: 'Sombra de elevação aplicada',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-box-padding': {
      control: 'text',
      description:
        'Espaçamento interno geral (padding). Redimensionado automaticamente (var(--spacing-4)) em breakpoints móveis (≤ 36em).',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-box-padding-block': {
      control: 'text',
      description:
        'Espaçamento interno vertical (padding-block). Sobrescreve o padding geral na vertical.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-box-padding-inline': {
      control: 'text',
      description:
        'Espaçamento interno horizontal (padding-inline). Sobrescreve o padding geral na horizontal.',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrão: Story = {
  render: (args) => (
    <div style={{ width: '32rem' }}>
      <Box {...args}>
        <h4 style={{ margin: 0, marginBottom: '0.8rem', fontSize: '1.6rem' }}>
          Título do Card
        </h4>
        <p style={{ margin: 0, fontSize: '1.4rem' }}>
          Este é um contêiner Box padrão configurado para demonstrar o
          agrupamento de conteúdo.
        </p>
      </Box>
    </div>
  ),
};

export const VariantesVisuais: Story = {
  render: () => {
    const variants: BoxVariant[] = ['solid', 'subtle', 'outline'];
    return (
      <div
        style={{
          display: 'flex',
          gap: '1.6rem',
          flexWrap: 'wrap',
          maxWidth: '80rem',
        }}
      >
        {variants.map((v) => (
          <Box
            key={v}
            variant={v}
            color="primary"
            border
            style={{ width: '22rem' }}
          >
            <h5 style={{ margin: 0, marginBottom: '0.4rem' }}>Variante: {v}</h5>
            <p style={{ margin: 0, fontSize: '1.2rem' }}>
              Exemplo visual de Box na variante {v}.
            </p>
          </Box>
        ))}
      </div>
    );
  },
};

export const Cores: Story = {
  render: () => {
    const colors: BoxColor[] = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'success',
      'warning',
      'error',
      'info',
      'surface',
      'dark',
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))',
          gap: '1.2rem',
          width: '64rem',
        }}
      >
        {colors.map((clr) => (
          <Box key={clr} color={clr} variant="solid">
            <span style={{ fontWeight: 600, fontSize: '1.4rem' }}>{clr}</span>
          </Box>
        ))}
      </div>
    );
  },
};

export const SombrasEElevacao: Story = {
  render: () => {
    const shadows: BoxShadow[] = ['none', 'sm', 'md', 'lg'];
    return (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {shadows.map((sh) => (
          <Box
            key={sh}
            shadow={sh}
            color="white"
            border
            style={{ width: '16rem', textAlign: 'center' }}
          >
            <span style={{ fontSize: '1.4rem', fontWeight: 600 }}>
              Shadow: {sh}
            </span>
          </Box>
        ))}
      </div>
    );
  },
};

export const ArredondamentoDeBorda: Story = {
  render: () => {
    const radiuses: BoxRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'xxl'];
    return (
      <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
        {radiuses.map((r) => (
          <Box
            key={r}
            radius={r}
            color="primary"
            variant="subtle"
            border
            style={{ width: '12rem', textAlign: 'center' }}
          >
            <span style={{ fontSize: '1.2rem' }}>Radius {r}</span>
          </Box>
        ))}
      </div>
    );
  },
};
