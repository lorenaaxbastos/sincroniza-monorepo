import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';
import type {
  SeparatorColor,
  SeparatorProps,
  SeparatorSize,
  SeparatorSpacing,
} from './Separator';

type SeparatorStoryProps = SeparatorProps & Record<string, unknown>;

const meta: Meta<SeparatorStoryProps> = {
  title: 'Componentes/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
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
    orientation: 'horizontal',
    spacing: 'md',
    color: 'surface',
    size: 'sm',
    decorative: true,
  },
  argTypes: {
    orientation: { table: { category: 'Propriedades (Props)' } },
    decorative: { table: { category: 'Propriedades (Props)' } },
    label: { table: { category: 'Propriedades (Props)' } },
    spacing: { table: { category: 'Propriedades (Props)' } },
    color: { table: { category: 'Propriedades (Props)' } },
    size: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-separator-color': {
      control: 'text',
      description: 'Cor principal da linha do separador',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-separator-thickness': {
      control: 'text',
      description: 'Espessura da linha do separador',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-separator-spacing': {
      control: 'text',
      description: 'Espaçamento externo (margem) do separador',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-separator-label-size': {
      control: 'text',
      description: 'Tamanho da fonte do rótulo central',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-separator-label-color': {
      control: 'text',
      description: 'Cor do texto do rótulo central',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-separator-label-weight': {
      control: 'text',
      description: 'Peso da fonte do rótulo central',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-separator-label-padding': {
      control: 'text',
      description: 'Espaçamento interno lateral do rótulo central',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrão: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '40rem' }}>
      <p style={{ fontSize: '1.4rem' }}>Conteúdo Superior</p>
      <Separator {...args} />
      <p style={{ fontSize: '1.4rem' }}>Conteúdo Inferior</p>
    </div>
  ),
};

export const ComRótulo: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '40rem' }}>
      <Separator label="OU" />
      <Separator label="Continuar com e-mail" color="primary" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '3rem',
        fontSize: '1.4rem',
      }}
    >
      <span>Início</span>
      <Separator orientation="vertical" spacing="md" />
      <span>Documentação</span>
      <Separator orientation="vertical" spacing="md" />
      <span>Componentes</span>
    </div>
  ),
};

export const Cores: Story = {
  render: () => {
    const colors: SeparatorColor[] = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'light',
      'dark',
      'white',
      'black',
      'surface',
    ];
    return (
      <div style={{ width: '100%', maxWidth: '40rem' }}>
        {colors.map((clr) => (
          <div key={clr}>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-500)' }}>
              Cor: {clr}
            </p>
            <Separator color={clr} spacing="sm" />
          </div>
        ))}
      </div>
    );
  },
};

export const Espessuras: Story = {
  render: () => {
    const sizes: SeparatorSize[] = ['sm', 'md', 'lg', 8];
    return (
      <div style={{ width: '100%', maxWidth: '40rem' }}>
        {sizes.map((s) => (
          <div key={String(s)}>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-500)' }}>
              Tamanho: {s}
            </p>
            <Separator size={s} color="primary" spacing="sm" />
          </div>
        ))}
      </div>
    );
  },
};

export const Espaçamentos: Story = {
  render: () => {
    const spacings: SeparatorSpacing[] = ['none', 'sm', 'md', 'lg'];
    return (
      <div style={{ width: '100%', maxWidth: '40rem' }}>
        {spacings.map((sp) => (
          <div
            key={sp}
            style={{
              backgroundColor: 'var(--color-gray-50)',
              padding: '0.8rem',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>Spacing: {sp}</span>
            <Separator spacing={sp} color="primary" />
            <span style={{ fontSize: '1.2rem' }}>Fim do bloco</span>
          </div>
        ))}
      </div>
    );
  },
};
