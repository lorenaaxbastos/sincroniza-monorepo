import React, { useEffect, useState } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';
import { NavToggle } from '@/components/NavToggle';
import { Container } from '@/layouts/Container';
import { Header } from '@/layouts/Header';
import { Sidebar } from '@/layouts/Sidebar';
import { AppLayout } from './AppLayout';

type AppLayoutStoryProps = React.ComponentProps<typeof AppLayout> &
  Record<string, unknown>;

const meta: Meta<AppLayoutStoryProps> = {
  title: 'Templates/AppLayout',
  component: AppLayout,
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
  argTypes: {
    sidebar: { table: { category: 'Propriedades (Props)' } },
    header: { table: { category: 'Propriedades (Props)' } },
    footer: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-app-layout-bg': {
      control: 'text',
      description: 'Cor de fundo da casca da aplicação',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--color-bg-canvas)' },
      },
    },
    '--sinc-app-main-margin': {
      control: 'text',
      description: 'Margem externa do container principal',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--sinc-layout-panel-margin)' },
      },
    },
    '--sinc-app-main-border-radius': {
      control: 'text',
      description: 'Arredondamento das bordas do container principal',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--sinc-layout-panel-border-radius)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const GlobalOverlayMock = ({ targetId }: { targetId: string }) => {
  useEffect(() => {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const overlay = document.querySelector('[data-global-overlay]');
    const toggleBtn = document.querySelector(`[data-target="#${targetId}"]`);

    const closeMenu = () => {
      targetEl.setAttribute('data-state', 'closed');
      overlay?.setAttribute('data-state', 'closed');

      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.removeAttribute('data-active'); // <-- Faltava essa linha!
      }
    };

    const handleDocClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).matches('[data-global-overlay]')) {
        closeMenu();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'data-state') {
          const isOpen = targetEl.getAttribute('data-state') === 'open';
          overlay?.setAttribute('data-state', isOpen ? 'open' : 'closed');
        }
      });
    });

    document.addEventListener('click', handleDocClick);
    document.addEventListener('keydown', handleEsc);
    observer.observe(targetEl, { attributes: true });

    return () => {
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('keydown', handleEsc);
      observer.disconnect();
    };
  }, [targetId]);

  return (
    <>
      <style>{`
        .sinc-global-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          z-index: calc(var(--z-index-fixed, 100) - 1);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .sinc-global-overlay[data-state="open"] {
          opacity: 1;
          visibility: visible;
        }
        @media (min-width: 48.1em) {
          .sinc-global-overlay {
            display: none !important;
          }
        }
      `}</style>
      <div
        className="sinc-global-overlay"
        data-global-overlay
        aria-hidden="true"
      />
    </>
  );
};

const BrandMock = () => (
  <strong style={{ color: 'var(--color-primary)', fontSize: '1.6rem' }}>
    Sincroniza UI
  </strong>
);

const SearchMock = () => (
  <input
    type="text"
    placeholder="Buscar dados..."
    style={{
      width: '100%',
      maxWidth: '32rem',
      padding: '0.8rem 1.6rem',
      borderRadius: 'var(--radii-pill)',
      border: '1px solid var(--color-gray-300)',
      outline: 'none',
      backgroundColor: 'var(--color-gray-100)',
    }}
  />
);

const SidebarNavMock = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2.4rem',
      height: '100%',
    }}
  >
    <strong style={{ color: 'var(--color-white)', fontSize: '1.8rem' }}>
      Dashboard
    </strong>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {['Visão Geral', 'Alunos', 'Turmas', 'Desempenho', 'Configurações'].map(
        (item) => (
          <button
            key={item}
            type="button"
            style={{
              background:
                'color-mix(in srgb, var(--color-white), transparent 90%)',
              border: 'none',
              color: 'var(--color-white)',
              textAlign: 'left',
              padding: 'var(--spacing-2) var(--spacing-3)',
              borderRadius: 'var(--radii-sm)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {item}
          </button>
        ),
      )}
    </nav>
  </div>
);

const DashboardApp = (args: AppLayoutStoryProps) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      return (setIsSyncing(false), 2000);
    });
  };

  return (
    <>
      <GlobalOverlayMock targetId="app-sidebar" />
      <AppLayout
        {...args}
        sidebar={
          <Sidebar id="app-sidebar">
            <SidebarNavMock />
          </Sidebar>
        }
        header={
          <Header
            start={
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}
              >
                <style>{`
                  .app-mobile-nav { display: none; }
                  @media(max-width: 48em) { .app-mobile-nav { display: block; } }
                `}</style>
                <div className="app-mobile-nav">
                  <NavToggle targetSelector="#app-sidebar" />
                </div>
                <BrandMock />
              </div>
            }
            center={
              <div
                style={{
                  display: 'none',
                  width: '100%',
                  justifyContent: 'center',
                }}
                className="desktop-only"
              >
                <style>{`@media(min-width: 48em) { .desktop-only { display: flex !important; } }`}</style>
                <SearchMock />
              </div>
            }
            end={
              <div
                style={{
                  width: '3.6rem',
                  height: '3.6rem',
                  background: 'var(--color-primary)',
                  borderRadius: '50%',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                MS
              </div>
            }
          />
        }
      >
        <Container size="xl" padding="md">
          <div
            style={{
              padding: '3.2rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.4rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1.6rem',
              }}
            >
              <div>
                <h1 style={{ margin: '0 0 0.8rem 0', fontSize: '2.4rem' }}>
                  Visão Geral
                </h1>
                <p style={{ margin: 0, color: 'var(--color-gray-600)' }}>
                  Acompanhe os indicadores das escolas sincronizadas.
                </p>
              </div>
              <Button
                color="primary"
                onClick={handleSync}
                isLoading={isSyncing}
              >
                Sincronizar Dados
              </Button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))',
                gap: '1.6rem',
              }}
            >
              {[
                { title: 'Total de Alunos', value: '14.230' },
                { title: 'Média de Notas', value: '8.4' },
                { title: 'Frequência', value: '94%' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2.4rem',
                    background: 'var(--color-white)',
                    borderRadius: 'var(--radii-md)',
                    border: '1px solid var(--color-gray-300)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-gray-600)',
                      fontSize: '1.4rem',
                    }}
                  >
                    {stat.title}
                  </span>
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '3.2rem',
                      marginTop: '0.8rem',
                      color: 'var(--color-text-title)',
                    }}
                  >
                    {stat.value}
                  </strong>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2.4rem',
                padding: '3.2rem',
                background: 'var(--color-white)',
                borderRadius: 'var(--radii-md)',
                border: '1px dashed var(--color-gray-300)',
                minHeight: '60rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p style={{ color: 'var(--color-gray-500)' }}>
                Área de gráficos longo (role para testar o scroll do AppLayout)
              </p>
            </div>
          </div>
        </Container>
      </AppLayout>
    </>
  );
};

export const AplicaçãoCompleta: Story = {
  render: (args) => <DashboardApp {...args} />,
};
