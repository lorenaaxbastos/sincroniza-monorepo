import React, { useEffect, useState } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import {
  BarChart3,
  BookOpen,
  FolderKanban,
  Library,
  Moon,
  Sun,
} from 'lucide-react';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { NavGroup } from '@/components/NavGroup';
import { NavLink } from '@/components/NavLink';
import { NavToggle } from '@/components/NavToggle';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Container } from '@/layouts/Container';
import { Grid } from '@/layouts/Grid';
import { Header } from '@/layouts/Header';
import { Sidebar } from '@/layouts/Sidebar';
import { Stack } from '@/layouts/Stack';
import { toggleTheme } from '@/utils/dom';
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
        toggleBtn.removeAttribute('data-active');
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

const ThemeToggleMock = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const currentDomTheme = document.documentElement.getAttribute('data-theme');
    return currentDomTheme === 'dark' ? 'dark' : 'light';
  });

  const handleToggle = () => {
    // Apenas UMA execução limpa por clique
    const newTheme = toggleTheme();
    setTheme(newTheme === 'dark' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      color={isDark ? 'primary' : 'quaternary'}
      isIconOnly
      isPill
      aria-label="Alternar Tema"
      onClick={handleToggle}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};

const DashboardApp = (args: AppLayoutStoryProps) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <>
      <GlobalOverlayMock targetId="app-sidebar" />
      <AppLayout
        {...args}
        sidebar={
          <Sidebar id="app-sidebar">
            <Stack direction="column" gap="lg" align="center">
              <style>{`
                @container (max-width: 8rem) { .username { display: none; } }
              `}</style>
              <strong style={{ color: 'var(--color-white)', fontSize: '2rem' }}>
                Logo
              </strong>

              <Stack direction="column" align="center" gap="xs">
                <Avatar size="xxxl" name="Lorena Bastos" />
                <span
                  className="username"
                  style={{
                    color: 'var(--color-white)',
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Olá, Lorena!
                </span>
              </Stack>

              <NavGroup style={{ width: '100%' }}>
                <NavLink
                  color="white"
                  href="#"
                  isActive
                  style={
                    {
                      '--sinc-nav-link-bg-active': 'var(--color-primary)',
                      '--sinc-nav-link-color-active': 'var(--color-white)',
                    } as React.CSSProperties
                  }
                  icon={<FolderKanban size={18} />}
                >
                  Projetos
                </NavLink>
                <NavLink color="white" href="#" icon={<BarChart3 size={18} />}>
                  Resultados
                </NavLink>
                <NavLink color="white" href="#" icon={<BookOpen size={18} />}>
                  Aprendizados
                </NavLink>
                <NavLink color="white" href="#" icon={<Library size={18} />}>
                  Recursos
                </NavLink>
              </NavGroup>
            </Stack>
          </Sidebar>
        }
        header={
          <Header
            start={
              <Stack align="center" gap="xs">
                <style>{`
          .app-mobile-nav { display: none; }
          .app-badge-desktop { display: none; }
          .app-header-title {
            font-size: 1.6rem;
            margin: 0;
            white-space: nowrap;
          }
          @media(max-width: 48em) { 
            .app-mobile-nav { display: flex; flex-shrink: 0; } 
          }
          @media(min-width: 48em) { 
            .app-badge-desktop { display: inline-flex; }
            .app-header-title { font-size: 2.2rem; }
          }
        `}</style>
                <div className="app-mobile-nav">
                  <NavToggle
                    buttonProps={{ color: 'primary', variant: 'solid' }}
                    targetSelector="#app-sidebar"
                  />
                </div>
                <h1 className="app-header-title">Gestão à Vista</h1>
                <span className="app-badge-desktop">
                  <Badge color="info" variant="subtle">
                    v1.0
                  </Badge>
                </span>
              </Stack>
            }
            end={
              <Stack direction="row" align="center" gap="xs">
                <ThemeToggleMock />
              </Stack>
            }
          />
        }
        footer={
          <Box
            as="div"
            padding="sm"
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              opacity: 0.8,
              borderTop: 'var(--spacing-px) solid var(--color-gray-300)',
            }}
          >
            Painel de Gestão à Vista v1.0 © Sincroniza Educação. 2026.
          </Box>
        }
      >
        <Container size="xl" padding="lg">
          <Stack direction="column" gap="xl" style={{ padding: '2.4rem 0' }}>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              wrap
              gap="md"
            >
              <div>
                <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '2rem' }}>
                  Acompanhamento geral
                </h2>
                <p style={{ margin: 0 }}>
                  Indicadores de desempenho das unidades em tempo real.
                </p>
              </div>
              <Button
                color="tertiary"
                onClick={handleSync}
                isLoading={isSyncing}
              >
                Sincronizar dados
              </Button>
            </Stack>

            <Grid minItemWidth="24rem" gap="md">
              {[
                { title: 'Total de Alunos', value: '14.230' },
                { title: 'Média de Notas', value: '8.4' },
                { title: 'Frequência', value: '94%' },
              ].map((stat, i) => (
                <Box key={i} color="light" variant="solid" shadow="sm">
                  <span style={{ fontSize: '1.4rem' }}>{stat.title}</span>
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '3rem',
                      marginTop: '0.8rem',
                    }}
                  >
                    {stat.value}
                  </strong>
                </Box>
              ))}
            </Grid>

            <Box
              color="transparent"
              style={{
                border: '2px dashed var(--color-gray-400)',
                minHeight: '60rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p style={{ fontSize: '1.8rem', textAlign: 'center' }}>
                Conteúdo das páginas
              </p>
            </Box>
          </Stack>
        </Container>
        <ScrollToTop />
      </AppLayout>
    </>
  );
};

export const AplicaçãoCompleta: Story = {
  render: (args) => <DashboardApp {...args} />,
};
