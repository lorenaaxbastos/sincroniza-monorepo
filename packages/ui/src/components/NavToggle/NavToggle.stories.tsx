import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Sidebar } from '@/layouts/Sidebar';
import { NavToggle } from './NavToggle';

type NavToggleStoryProps = React.ComponentProps<typeof NavToggle> &
  Record<string, unknown>;

const meta: Meta<NavToggleStoryProps> = {
  title: 'Componentes/NavToggle',
  component: NavToggle,
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
  tags: ['autodocs'],
  args: {
    targetSelector: '#app-sidebar',
  },
  argTypes: {
    targetSelector: { table: { category: 'Propriedades (Props)' } },
    ariaLabel: { table: { category: 'Propriedades (Props)' } },
    buttonProps: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const MenuContentMock = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 'var(--spacing-6)',
    }}
  >
    <strong
      style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-lg)' }}
    >
      Sincroniza Educação
    </strong>

    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)',
      }}
    >
      {['Início', 'Projetos', 'Relatórios', 'Configurações'].map((item) => (
        <button
          key={item}
          type="button"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-gray-200)',
            textAlign: 'left',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  </div>
);

const PageContentMock = ({ title }: { title: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-4)',
    }}
  >
    <div
      style={{
        padding: 'var(--spacing-4)',
        color: 'var(--color-white)',
        backgroundColor: 'var(--color-feedback-info, #e0f2fe)',
        borderLeft: '4px solid var(--color-primary, #0284c7)',
        borderRadius: 'var(--radii-sm)',
        marginBottom: 'var(--spacing-2)',
      }}
    >
      <strong style={{ display: 'block', marginBottom: 'var(--spacing-1)' }}>
        📱 Teste de Responsividade
      </strong>
      <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
        O <code>MobileNavToggle</code> fica oculto em telas Desktop por padrão.
        Troque a viewport no topo do Storybook para uma resolução mobile (ex:{' '}
        <strong>Small mobile</strong> ou <strong>≤ 576px</strong>) para testar o
        acionamento e a trava de rolagem (<code>scroll-lock</code>).
      </p>
    </div>

    <h1>{title}</h1>

    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        style={{
          padding: 'var(--spacing-4)',
          border: '1px dashed var(--color-gray-300)',
          borderRadius: 'var(--radii-md)',
          backgroundColor: 'var(--color-gray-50)',
        }}
      >
        <h3>Bloco de conteúdo #{index + 1}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    ))}
  </div>
);

export const ComAppLayout: Story = {
  args: {
    targetSelector: '#app-sidebar',
  },
  render: (args) => (
    <AppLayout
      sidebar={
        <Sidebar id="app-sidebar">
          <MenuContentMock />
        </Sidebar>
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-4)',
        }}
      >
        <NavToggle {...args} />
      </div>
      <PageContentMock title="MobileNavToggle no AppLayout" />
    </AppLayout>
  ),
};

export const ComWebLayout: Story = {
  args: {
    targetSelector: '#web-sidebar',
    buttonProps: {
      color: 'primary',
      variant: 'solid',
    },
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-4)',
          padding: '0 var(--spacing-6)',
          height: 'var(--sinc-topbar-height, 6rem)',
          borderBottom: '1px solid var(--color-gray-300)',
          backgroundColor: 'var(--color-bg-header)',
        }}
      >
        <NavToggle {...args} />
        <strong style={{ fontSize: 'var(--font-size-md)' }}>Header</strong>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar id="web-sidebar">
          <MenuContentMock />
        </Sidebar>

        <main style={{ padding: 'var(--spacing-6)', flex: 1 }}>
          <PageContentMock title="MobileNavToggle no WebLayout" />
        </main>
      </div>
    </div>
  ),
};
