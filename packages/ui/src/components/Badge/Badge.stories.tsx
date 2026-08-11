import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from './Badge';
import type { BadgeColor, BadgeProps, BadgeSize, BadgeVariant } from './Badge';

type BadgeStoryProps = BadgeProps & Record<string, unknown>;

const meta: Meta<BadgeStoryProps> = {
  title: 'Componentes/Badge',
  component: Badge,
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
    children: 'Badge',
    variant: 'subtle',
    color: 'primary',
    size: 'md',
    hasDot: false,
    isPill: false,
    isUppercase: false,
  },
  argTypes: {
    variant: { table: { category: 'Propriedades (Props)' } },
    color: { table: { category: 'Propriedades (Props)' } },
    size: { table: { category: 'Propriedades (Props)' } },
    isPill: { table: { category: 'Propriedades (Props)' } },
    isUppercase: { table: { category: 'Propriedades (Props)' } },
    hasDot: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-badge-color': {
      control: 'text',
      description: 'Cor do texto do badge',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-bg': {
      control: 'text',
      description: 'Cor de fundo do badge',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-padding': {
      control: 'text',
      description: 'Espaçamento interno do badge',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-gap': {
      control: 'text',
      description: 'Espaçamento entre o ponto/ícone e o texto',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-font-size': {
      control: 'text',
      description: 'Tamanho da fonte tipográfica',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-font-weight': {
      control: 'text',
      description: 'Peso da fonte',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-font-family': {
      control: 'text',
      description: 'Família tipográfica do badge',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-border': {
      control: 'text',
      description: 'Definição completa da borda (largura, estilo e cor)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-badge-border-radius': {
      control: 'text',
      description: 'Arredondamento das bordas do badge',
      table: { category: 'Variáveis CSS' },
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
      alignItems: 'center',
      gap: '1.5rem',
      width: '100%',
    }}
  >
    <span
      style={{
        width: '10rem',
        flexShrink: 0,
        fontSize: 'var(--font-size-xs, 1.2rem)',
        fontFamily: 'monospace',
        color: 'var(--color-gray-500)',
      }}
    >
      {label}
    </span>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  </div>
);

export const Padrão: Story = {
  args: {
    children: 'Novo recurso',
    color: 'primary',
    variant: 'subtle',
  },
};

export const Variantes: Story = {
  render: () => {
    const variants: BadgeVariant[] = ['solid', 'subtle', 'outline'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {variants.map((v) => (
          <StoryRow key={v} label={v}>
            <Badge variant={v} color="primary">
              Badge {v}
            </Badge>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Cores: Story = {
  render: () => {
    const colors: BadgeColor[] = [
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {colors.map((clr) => (
          <StoryRow key={clr} label={clr}>
            <Badge color={clr} variant="solid">
              Solid
            </Badge>
            <Badge color={clr} variant="subtle">
              Subtle
            </Badge>
            <Badge color={clr} variant="outline">
              Outline
            </Badge>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Tamanhos: Story = {
  render: () => {
    const sizes: BadgeSize[] = ['sm', 'md', 'lg'];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {sizes.map((s) => (
          <Badge key={s} size={s} color="primary">
            Tamanho {s}
          </Badge>
        ))}
      </div>
    );
  },
};

export const ComPontoIndicador: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge color="success" hasDot>
        Ativo
      </Badge>
      <Badge color="warning" hasDot>
        Pendente
      </Badge>
      <Badge color="error" hasDot>
        Offline
      </Badge>
      <Badge color="info" hasDot>
        Em análise
      </Badge>
    </div>
  ),
};

export const ComIcone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge color="success" variant="subtle">
        <CheckCircle2 size={12} /> Concluído
      </Badge>
      <Badge color="warning" variant="subtle">
        <AlertTriangle size={12} /> Atenção
      </Badge>
      <Badge color="primary" variant="solid">
        <ShieldCheck size={12} /> Verificado
      </Badge>
    </div>
  ),
};

export const Modificadores: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <StoryRow label="isPill">
        <Badge isPill color="primary">
          Pílula Primary
        </Badge>
        <Badge isPill color="success" variant="solid" hasDot>
          Pílula Ativo
        </Badge>
      </StoryRow>
      <StoryRow label="isUppercase">
        <Badge isUppercase color="tertiary">
          Em Destaque
        </Badge>
        <Badge isUppercase isPill color="dark" variant="solid">
          Vip
        </Badge>
      </StoryRow>
    </div>
  ),
};
