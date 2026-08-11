import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight } from 'lucide-react';
import { Link } from './Link';
import type { LinkColor, LinkProps, LinkSize, LinkUnderline } from './Link';

type LinkStoryProps = LinkProps & Record<string, unknown>;

const meta: Meta<LinkStoryProps> = {
  title: 'Componentes/Link',
  component: Link,
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
    href: '#',
    children: 'Link de exemplo',
    color: 'primary',
    size: 'md',
    underline: 'hover',
    showExternalIcon: false,
  },
  argTypes: {
    href: { table: { category: 'Propriedades (Props)' } },
    color: { table: { category: 'Propriedades (Props)' } },
    size: { table: { category: 'Propriedades (Props)' } },
    underline: { table: { category: 'Propriedades (Props)' } },
    isExternal: { table: { category: 'Propriedades (Props)' } },
    showExternalIcon: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-link-color': {
      control: 'text',
      description: 'Cor principal do texto do link',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-link-color-hover': {
      control: 'text',
      description: 'Cor do texto do link ao passar o mouse (hover)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-link-font-size': {
      control: 'text',
      description: 'Tamanho da fonte tipográfica',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-link-font-weight': {
      control: 'text',
      description: 'Peso da fonte do link',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-link-gap': {
      control: 'text',
      description: 'Espaçamento entre o texto e os ícones internos',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrão: Story = {
  args: {
    children: 'Ir para a página principal',
    href: 'https://sincroniza.com.br',
  },
};

export const Cores: Story = {
  render: () => {
    const colors: LinkColor[] = [
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
      'inherit',
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        {colors.map((clr) => (
          <Link key={clr} color={clr} href="#color" size="md">
            Link com a cor {clr}
          </Link>
        ))}
      </div>
    );
  },
};

export const Sublinhado: Story = {
  render: () => {
    const underlines: LinkUnderline[] = ['always', 'hover', 'none'];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          alignItems: 'flex-start',
        }}
      >
        {underlines.map((u) => (
          <Link key={u} underline={u} href="#underline" size="md">
            Sublinhado: {u}
          </Link>
        ))}
      </div>
    );
  },
};

export const Tamanhos: Story = {
  render: () => {
    const sizes: LinkSize[] = ['sm', 'md', 'lg'];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        {sizes.map((s) => (
          <Link key={s} size={s} href="#font-size">
            Tamanho de fonte {s}
          </Link>
        ))}
      </div>
    );
  },
};

export const ExternoComIcone: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        alignItems: 'flex-start',
      }}
    >
      <Link href="https://google.com" showExternalIcon>
        Visite o Google (externo com ícone)
      </Link>
      <Link href="https://github.com" color="secondary" showExternalIcon>
        Repositório do GitHub
      </Link>
    </div>
  ),
};

export const ComIconePersonalizado: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Link href="#saiba-mais" color="primary">
        Saiba mais <ArrowRight size={14} />
      </Link>
    </div>
  ),
};
