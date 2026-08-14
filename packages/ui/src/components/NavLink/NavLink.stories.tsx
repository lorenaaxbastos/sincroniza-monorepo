import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Home, LayoutDashboard, Settings, User } from 'lucide-react';
import { NavLink } from './NavLink';
import type { NavLinkColor, NavLinkProps, NavLinkVariant } from './NavLink';

type NavLinkStoryProps = NavLinkProps & Record<string, unknown>;

const meta: Meta<NavLinkStoryProps> = {
  title: 'Componentes/NavLink',
  component: NavLink,
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
    children: 'Início',
    variant: 'block',
    color: 'surface',
    isActive: false,
  },
  argTypes: {
    href: { table: { category: 'Propriedades (Props)' } },
    variant: { table: { category: 'Propriedades (Props)' } },
    color: { table: { category: 'Propriedades (Props)' } },
    isActive: { table: { category: 'Propriedades (Props)' } },
    icon: { table: { category: 'Propriedades (Props)' } },
    label: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-nav-link-color': {
      control: 'text',
      description: 'Cor principal do texto do link em estado inativo',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-color-hover': {
      control: 'text',
      description: 'Cor do texto ao passar o mouse (hover)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-color-active': {
      control: 'text',
      description: 'Cor do texto quando o link estiver ativo (isActive)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-bg': {
      control: 'text',
      description: 'Cor de fundo base do link',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-bg-hover': {
      control: 'text',
      description: 'Cor de fundo no hover',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-bg-active': {
      control: 'text',
      description: 'Cor de fundo quando ativo (isActive)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-border': {
      control: 'text',
      description: 'Definição da borda (largura, estilo e cor)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-border-radius': {
      control: 'text',
      description: 'Arredondamento das bordas do link',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-gap': {
      control: 'text',
      description: 'Espaçamento interno entre o ícone e o texto',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-padding': {
      control: 'text',
      description: 'Espaçamento interno (padding) do link',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-font-size': {
      control: 'text',
      description: 'Tamanho da fonte tipográfica',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-link-font-weight': {
      control: 'text',
      description: 'Peso da fonte em estado normal',
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
    <div style={{ width: '100%', maxWidth: '24rem' }}>{children}</div>
  </div>
);

export const Padrão: Story = {
  render: (args) => (
    <ul style={{ padding: 0, margin: 0, width: '24rem' }}>
      <NavLink href="#home" {...args} icon={<Home size={18} />} />
    </ul>
  ),
};

export const Variantes: Story = {
  render: () => {
    const variants: NavLinkVariant[] = ['block', 'line'];
    return (
      <ul
        style={{
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem',
          width: '28rem',
        }}
      >
        {variants.map((v) => (
          <StoryRow key={v} label={v}>
            <NavLink variant={v} href="#" icon={<LayoutDashboard size={18} />}>
              Variante {v}
            </NavLink>
          </StoryRow>
        ))}
      </ul>
    );
  },
};

export const EstadoAtivo: Story = {
  render: () => (
    <ul
      style={{
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        width: '24rem',
      }}
    >
      <NavLink href="#" color="primary" isActive icon={<Home size={18} />}>
        Página Inicial (ativa)
      </NavLink>
      <NavLink href="#" color="primary" icon={<User size={18} />}>
        Meu Perfil
      </NavLink>
      <NavLink href="#" color="primary" icon={<Settings size={18} />}>
        Configurações
      </NavLink>
    </ul>
  ),
};

export const Cores: Story = {
  render: () => {
    const colors: NavLinkColor[] = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'surface',
      'light',
      'dark',
      'white',
      'black',
    ];

    return (
      <ul
        style={{
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          width: '28rem',
        }}
      >
        {colors.map((clr) => (
          <StoryRow key={clr} label={clr}>
            <NavLink color={clr} href="#" isActive icon={<Home size={18} />}>
              Ativo ({clr})
            </NavLink>
          </StoryRow>
        ))}
      </ul>
    );
  },
};

export const ColapsoResponsivo: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2.4rem',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          containerType: 'inline-size',
          width: '22rem',
          padding: '1.2rem',
          border: '1px dashed var(--color-gray-300)',
          borderRadius: 'var(--radii-md)',
        }}
      >
        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--color-gray-500)',
            marginBottom: '0.8rem',
          }}
        >
          Expandido (&gt; 8rem)
        </p>
        <ul style={{ padding: 0, margin: 0 }}>
          <NavLink href="#" isActive icon={<Home size={18} />}>
            Início
          </NavLink>
          <NavLink href="#" icon={<Settings size={18} />}>
            Configurações
          </NavLink>
        </ul>
      </div>

      <div
        style={{
          containerType: 'inline-size',
          width: '7rem',
          padding: '0.8rem',
          border: '1px dashed var(--color-gray-300)',
          borderRadius: 'var(--radii-md)',
        }}
      >
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-gray-500)',
            marginBottom: '0.8rem',
            textAlign: 'center',
          }}
        >
          &lt; 8rem
        </p>
        <ul style={{ padding: 0, margin: 0 }}>
          <NavLink href="#" isActive icon={<Home size={18} />} label="Início" />
          <NavLink
            href="#"
            icon={<Settings size={18} />}
            label="Configurações"
          />
        </ul>
      </div>
    </div>
  ),
};
