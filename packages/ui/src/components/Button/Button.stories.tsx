import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import type {
  ButtonColor,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './Button';

type ButtonStoryProps = ButtonProps & Record<string, unknown>;

const meta: Meta<ButtonStoryProps> = {
  title: 'Componentes/Button',
  component: Button,
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
  argTypes: {
    variant: { table: { category: 'Propriedades (Props)' } },
    color: { table: { category: 'Propriedades (Props)' } },
    size: { table: { category: 'Propriedades (Props)' } },
    width: { table: { category: 'Propriedades (Props)' } },
    isPill: { table: { category: 'Propriedades (Props)' } },
    isUppercase: { table: { category: 'Propriedades (Props)' } },
    isIconOnly: { table: { category: 'Propriedades (Props)' } },
    hasShadow: { table: { category: 'Propriedades (Props)' } },
    isLoading: { table: { category: 'Propriedades (Props)' } },
    disabled: { table: { category: 'Propriedades (Props)' } },
    as: { table: { category: 'Propriedades (Props)' } },
    href: { table: { category: 'Propriedades (Props)' } },
    isExternal: { table: { category: 'Propriedades (Props)' } },
    type: { table: { category: 'Propriedades (Props)' } },
    target: { table: { category: 'Propriedades (Props)' } },
    rel: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-btn-color': {
      control: 'text',
      description: 'Cor do texto do botão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-bg': {
      control: 'text',
      description: 'Cor de fundo do botão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-padding': {
      control: 'text',
      description: 'Espaçamento interno do botão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-gap': {
      control: 'text',
      description: 'Espaçamento interno entre ícone e texto',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-font-size': {
      control: 'text',
      description: 'Tamanho da fonte tipográfica',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-font-weight': {
      control: 'text',
      description: 'Peso da fonte do botão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-font-family': {
      control: 'text',
      description: 'Família tipográfica do botão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-border': {
      control: 'text',
      description: 'Definição da borda do botão (largura, estilo e cor)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-border-radius': {
      control: 'text',
      description: 'Arredondamento das bordas do botão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-btn-shadow': {
      control: 'text',
      description: 'Sombra base aplicada quando hasShadow está ativo',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

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
        width: '12rem',
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
        width: '100%',
      }}
    >
      {children}
    </div>
  </div>
);

export const Padrão: Story = {
  args: {
    children: 'Enviar formulário',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    hasShadow: false,
  },
};

export const Variantes: Story = {
  render: () => {
    const variants: ButtonVariant[] = ['solid', 'subtle', 'outline', 'ghost'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {variants.map((v) => (
          <StoryRow key={v} label={v}>
            <Button variant={v} color="primary">
              Botão {v}
            </Button>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Cores: Story = {
  render: () => {
    const colors: ButtonColor[] = [
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {colors.map((clr) => (
          <StoryRow key={clr} label={clr}>
            <Button color={clr} size="md">
              Botão {clr}
            </Button>
            <Button color={clr} variant="subtle" size="md">
              Subtle
            </Button>
            <Button color={clr} variant="outline" size="md">
              Outline
            </Button>
            <Button color={clr} variant="ghost" size="md">
              Ghost
            </Button>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Tamanhos: Story = {
  render: () => {
    const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sizes.map((s) => (
          <StoryRow key={s} label={s}>
            <Button size={s} color="primary">
              Tamanho {s}
            </Button>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Larguras: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      <StoryRow label="fit">
        <Button width="fit" color="primary">
          Largura ajustável (fit)
        </Button>
      </StoryRow>
      <StoryRow label="full">
        <div style={{ width: '100%', maxWidth: '40rem' }}>
          <Button width="full" color="primary">
            Largura total (full)
          </Button>
        </div>
      </StoryRow>
    </div>
  ),
};

export const CaixaAlta: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button isUppercase color="primary">
        Texto em caixa alta
      </Button>
      <Button isUppercase variant="outline" color="primary">
        Confirmar ação
      </Button>
    </div>
  ),
};

export const ComIcone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button color="primary">
        <ArrowLeft size={16} /> Voltar
      </Button>
      <Button color="primary">
        Avançar <ChevronRight size={16} />
      </Button>
      <Button color="primary" isIconOnly isPill aria-label="Avançar">
        <ChevronRight size={16} />
      </Button>
    </div>
  ),
};

export const ComSombra: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button color="primary" hasShadow>
        Com sombra
      </Button>
      <Button color="secondary" hasShadow isPill>
        Com sombra & pill
      </Button>
      <Button color="error" hasShadow variant="subtle">
        Subtle com sombra
      </Button>
    </div>
  ),
};

export const Carregando: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button color="primary" isLoading>
        Salvar
      </Button>
      <Button color="secondary" variant="subtle" isLoading>
        Processando
      </Button>
    </div>
  ),
};
