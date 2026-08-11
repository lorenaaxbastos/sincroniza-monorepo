import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

type HeaderStoryProps = React.ComponentProps<typeof Header> &
  Record<string, unknown>;

const meta: Meta<HeaderStoryProps> = {
  title: 'Layouts/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
    topbar: { table: { category: 'Propriedades (Props)' } },
    start: { table: { category: 'Propriedades (Props)' } },
    center: { table: { category: 'Propriedades (Props)' } },
    end: { table: { category: 'Propriedades (Props)' } },
    isTransparent: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    position: {
      control: 'radio',
      options: ['static', 'fixed'],
      table: { category: 'Propriedades (Props)' },
    },
    containerProps: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-header-bg': {
      control: 'text',
      description: 'Cor de fundo principal do Header',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--color-white)' },
      },
    },
    '--sinc-header-border': {
      control: 'text',
      description: 'Borda inferior do Header',
      table: {
        category: 'Variáveis CSS',
        defaultValue: {
          summary: 'var(--spacing-px) solid var(--color-gray-300)',
        },
      },
    },
    '--sinc-header-shadow': {
      control: 'text',
      description: 'Sombra do Header',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'none' },
      },
    },
    '--sinc-header-padding-desktop': {
      control: 'text',
      description: 'Padding interno lateral do Header no Desktop',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--spacing-2)' },
      },
    },
    '--sinc-header-padding-mobile': {
      control: 'text',
      description: 'Padding interno lateral do Header no Mobile',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--spacing-1)' },
      },
    },
    '--sinc-header-margin': {
      control: 'text',
      description:
        'Margem externa do Header (herda o token global de painel se não especificado)',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--sinc-layout-panel-margin)' },
      },
    },
    '--sinc-header-border-radius': {
      control: 'text',
      description:
        'Arredondamento das bordas do Header (herda o token global de painel se não especificado)',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--sinc-layout-panel-border-radius)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const LogoMock = () => (
  <strong
    style={{
      fontSize: 'var(--font-size-lg)',
      color: 'var(--color-primary)',
    }}
  >
    Sincroniza UI
  </strong>
);

const NavMock = () => (
  <nav style={{ display: 'flex', gap: '2rem', fontSize: '1.4rem' }}>
    <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>
      Início
    </a>
    <a href="#docs" style={{ color: 'inherit', textDecoration: 'none' }}>
      Documentação
    </a>
    <a href="#components" style={{ color: 'inherit', textDecoration: 'none' }}>
      Componentes
    </a>
  </nav>
);

const UserAvatarMock = () => (
  <div
    style={{
      width: '3.6rem',
      height: '3.6rem',
      borderRadius: 'var(--radii-round)',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'var(--font-weight-semibold)',
      fontSize: 'var(--font-size-md)',
    }}
  >
    LB
  </div>
);

const TopbarNoticeMock = () => (
  <div
    style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '128rem' /* Substitui o Container size="xl" */,
        margin: '0 auto',
        padding: '0 var(--spacing-4)' /* Substitui o Container padding="md" */,
        fontSize: 'var(--font-size-xs)',
      }}
    >
      <span>🚀 Versão 2.0 do Design System lançada!</span>
      <a
        href="#saiba-mais"
        style={{ color: 'var(--color-white)', textDecoration: 'underline' }}
      >
        Saiba mais
      </a>
    </div>
  </div>
);

const ScrollablePageMock = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      minHeight: '150vh',
      backgroundColor: 'var(--color-primary-light)',
    }}
  >
    {children}
    <div
      style={{
        width: '100%',
        maxWidth: '128rem' /* Substitui o Container size="xl" */,
        margin: '0 auto',
        padding: '0 var(--spacing-4)' /* Substitui o Container padding="md" */,
        paddingTop: 'calc(var(--sinc-header-height) + 8rem)',
      }}
    >
      <p style={{ color: 'var(--color-text)', textAlign: 'center' }}>
        Role a página para baixo para testar os efeitos de scroll e fixação.
      </p>
    </div>
  </div>
);

export const Padrão: Story = {
  args: {
    start: <LogoMock />,
    center: <NavMock />,
    end: <UserAvatarMock />,
  },
};

export const ComTopbar: Story = {
  args: {
    topbar: <TopbarNoticeMock />,
    start: <LogoMock />,
    center: <NavMock />,
    end: <UserAvatarMock />,
  },
};

export const SemCentro: Story = {
  args: {
    start: <LogoMock />,
    end: <UserAvatarMock />,
  },
};

export const PainelFlutuante: Story = {
  args: {
    start: <LogoMock />,
    center: <NavMock />,
    end: <UserAvatarMock />,
    style: {
      '--sinc-header-margin': '1.6rem',
      '--sinc-header-border-radius': 'var(--radii-md)',
    },
  },
};

export const FixoETransparente: Story = {
  args: {
    position: 'fixed',
    isTransparent: true,
    topbar: <TopbarNoticeMock />,
    start: <LogoMock />,
    center: <NavMock />,
    end: <UserAvatarMock />,
  },
  render: (args) => (
    <ScrollablePageMock>
      <Header {...args} />
    </ScrollablePageMock>
  ),
};
