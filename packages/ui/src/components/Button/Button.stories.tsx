import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  ButtonWidth,
} from './Button';

type ButtonStoryProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  width?: ButtonWidth;
  isPill?: boolean;
  isUppercase?: boolean;
  isIconOnly?: boolean;
  hasShadow?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  as?: 'button' | 'a';
  href?: string;
  isExternal?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
} & Record<string, unknown>;

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
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline', 'ghost'],
      description: 'Estilo visual do botão',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'solid' },
      },
    },
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
      description: 'Cor temática do botão',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'md' },
      },
    },
    width: {
      control: 'radio',
      options: ['fit', 'full'],
      description: 'Ajuste de largura do botão',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'fit' },
      },
    },
    isPill: {
      control: 'boolean',
      description: 'Aplica bordas totalmente arredondadas (pílula)',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'false' },
      },
    },
    isUppercase: {
      control: 'boolean',
      description: 'Transforma o texto em caixa alta',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'false' },
      },
    },
    isIconOnly: {
      control: 'boolean',
      description:
        'Ajusta o botão para formato quadrado/circular perfeito quando contiver apenas um ícone',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'false' },
      },
    },
    hasShadow: {
      control: 'boolean',
      description: 'Adiciona elevação via box-shadow',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: 'boolean',
      description:
        'Indica estado de carregamento, torna-se desabilitado e substitui o conteúdo pelo Spinner',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita interações com o botão',
      table: {
        category: 'Propriedades (Props)',
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'select',
      options: ['button', 'a'],
      description: 'Força o elemento HTML base (`button` ou `a`)',
      table: { category: 'Propriedades (Props)' },
    },
    children: {
      description: 'Conteúdo do botão (texto, ícones ou elementos)',
      table: { category: 'Propriedades (Props)' },
    },
    className: {
      description: 'Classes CSS adicionais aplicadas ao elemento base do botão',
      table: { category: 'Propriedades (Props)' },
    },
    '--sinc-btn-gap': {
      control: 'text',
      description: 'Espaçamento interno entre ícone e texto',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--spacing-2)' },
      },
    },
    '--sinc-btn-font-weight': {
      control: 'text',
      description: 'Peso da fonte',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--font-weight-semibold)' },
      },
    },
    '--sinc-btn-font-family': {
      control: 'text',
      description: 'Família tipográfica do botão',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'inherit' },
      },
    },
    '--sinc-btn-border-width': {
      control: 'text',
      description: 'Espessura da borda do botão',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--spacing-px)' },
      },
    },
    '--sinc-btn-border-radius': {
      control: 'text',
      description: 'Arredondamento padrão das bordas',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--radii-md)' },
      },
    },
    '--sinc-btn-shadow': {
      control: 'text',
      description: 'Sombra base aplicada quando hasShadow está ativo',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--shadow-sm)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonStoryProps>;

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
