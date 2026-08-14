import React, { useEffect } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  Users,
} from 'lucide-react';
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
import { Stack } from '@/layouts/Stack';
import { WebLayout } from './WebLayout';

type WebLayoutStoryProps = React.ComponentProps<typeof WebLayout> &
  Record<string, unknown>;

const meta: Meta<WebLayoutStoryProps> = {
  title: 'Templates/WebLayout',
  component: WebLayout,
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
    header: { table: { category: 'Propriedades (Props)' } },
    footer: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* Mock do Drawer Mobile Fullscreen sincronizado via MutationObserver */
const MobileMenuMock = ({ targetId }: { targetId: string }) => {
  useEffect(() => {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const overlay = document.querySelector('[data-global-overlay]');

    const closeMenu = () => {
      targetEl.setAttribute('data-state', 'closed');
    };

    const handleDocClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).matches('[data-global-overlay]')) {
        closeMenu();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    // Observa o data-state alterado nativamente pelo NavToggle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'data-state') {
          const isOpen = targetEl.getAttribute('data-state') === 'open';

          overlay?.setAttribute('data-state', isOpen ? 'open' : 'closed');
          document.body.style.overflow = isOpen ? 'hidden' : '';

          const toggleBtns = document.querySelectorAll(
            `[data-target="#${targetId}"], [data-target="${targetId}"]`,
          );
          toggleBtns.forEach((btn) => {
            if (isOpen) {
              btn.setAttribute('aria-expanded', 'true');
              btn.setAttribute('data-active', 'true');
            } else {
              btn.setAttribute('aria-expanded', 'false');
              btn.removeAttribute('data-active');
            }
          });
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
      document.body.style.overflow = '';
    };
  }, [targetId]);

  return (
    <>
      <style>{`
        /* Overlay Global */
        .sinc-global-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          z-index: calc(var(--z-index-fixed, 100) + 5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .sinc-global-overlay[data-state="open"] {
          opacity: 1;
          visibility: visible;
        }

        /* Drawer Mobile Fullscreen */
        .sinc-web-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: calc(var(--z-index-fixed, 100) + 10);
          background-color: var(--color-bg-canvas);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-6);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .sinc-web-mobile-menu[data-state="open"] {
          opacity: 1;
          visibility: visible;
        }
        @media (min-width: 48.1em) {
          .sinc-web-mobile-menu,
          .sinc-global-overlay {
            display: none !important;
          }
        }
        .sinc-web-mobile-close {
          position: absolute;
          top: var(--spacing-4);
          right: var(--spacing-4);
        }
      `}</style>

      {/* Máscara de sobreposição global */}
      <div
        className="sinc-global-overlay"
        data-global-overlay
        data-state="closed"
        aria-hidden="true"
      />

      {/* Drawer com atributos de estado completos */}
      <div
        id={targetId}
        className="sinc-web-mobile-menu"
        data-state="closed"
        data-scroll-lock
        data-overlay="front"
      >
        {/* Botão de Fechar no Canto Superior Direito */}
        <div className="sinc-web-mobile-close">
          <NavToggle targetSelector={`#${targetId}`} />
        </div>

        {/* Conteúdo Centralizado em Tela Cheia */}
        <Stack
          direction="column"
          align="center"
          gap="xl"
          style={{ width: '100%', maxWidth: '32rem' }}
        >
          <strong
            style={{
              fontSize: '2.4rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-secondary)',
              textAlign: 'center',
            }}
          >
            Sincroniza Educação
          </strong>

          <NavGroup
            direction="column"
            align="center"
            gap="md"
            style={{ width: '100%' }}
          >
            <NavLink
              href="#"
              variant="line"
              color="primary"
              isActive
              style={{ fontSize: '1.8rem' }}
            >
              Início
            </NavLink>
            <NavLink
              href="#"
              variant="line"
              color="primary"
              style={{ fontSize: '1.8rem' }}
            >
              Soluções
            </NavLink>
            <NavLink
              href="#"
              variant="line"
              color="primary"
              style={{ fontSize: '1.8rem' }}
            >
              Sobre Nós
            </NavLink>
            <NavLink
              href="#"
              variant="line"
              color="primary"
              style={{ fontSize: '1.8rem' }}
            >
              Contato
            </NavLink>
          </NavGroup>

          <Stack
            direction="column"
            gap="sm"
            style={{ width: '100%', marginTop: 'var(--spacing-4)' }}
          >
            <Button
              variant="ghost"
              color="secondary"
              size="lg"
              style={{ width: '100%' }}
            >
              Entrar
            </Button>
            <Button
              variant="solid"
              color="secondary"
              size="lg"
              style={{ width: '100%' }}
            >
              Acessar plataforma
            </Button>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

const LandingPage = (args: WebLayoutStoryProps) => {
  return (
    <>
      <MobileMenuMock targetId="web-mobile-menu" />

      <WebLayout
        {...args}
        header={
          <Header
            isTransparent
            position="fixed"
            start={
              <Stack align="center" gap="xs">
                <style>{`
                  /* Visibilidade responsiva dos elementos do Header */
                  .web-desktop-nav,
                  .web-desktop-actions {
                    display: none;
                  }
                  .web-mobile-toggle {
                    display: block;
                  }

                  @media (min-width: 48em) {
                    .web-desktop-nav,
                    .web-desktop-actions {
                      display: flex;
                    }
                    .web-mobile-toggle {
                      display: none;
                    }
                  }
                `}</style>
                <strong
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-secondary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Sincroniza Educação
                </strong>
              </Stack>
            }
            center={
              <div className="web-desktop-nav">
                <NavGroup direction="row" gap="sm">
                  <NavLink href="#" variant="line" color="primary" isActive>
                    Início
                  </NavLink>
                  <NavLink href="#" variant="line" color="primary">
                    Soluções
                  </NavLink>
                  <NavLink href="#" variant="line" color="primary">
                    Sobre Nós
                  </NavLink>
                  <NavLink href="#" variant="line" color="primary">
                    Contato
                  </NavLink>
                </NavGroup>
              </div>
            }
            end={
              <Stack direction="row" align="center" gap="xs">
                {/* Botões visíveis no Desktop */}
                <div className="web-desktop-actions">
                  <Stack direction="row" align="center" gap="xs">
                    <Button variant="ghost" color="secondary">
                      Entrar
                    </Button>
                    <Button variant="solid" color="secondary">
                      Acessar plataforma
                    </Button>
                  </Stack>
                </div>

                {/* NavToggle visível no Mobile */}
                <div className="web-mobile-toggle">
                  <NavToggle targetSelector="#web-mobile-menu" />
                </div>
              </Stack>
            }
          />
        }
        footer={
          <Box color="dark" variant="solid" padding="xl">
            <Container size="xl">
              <Stack direction="column" gap="xl">
                <Grid minItemWidth="18rem" gap="xl">
                  <Stack direction="column" gap="xs">
                    <strong
                      style={{
                        fontSize: '1.8rem',
                        color: 'var(--color-white)',
                      }}
                    >
                      Sincroniza Educação
                    </strong>
                    <p style={{ fontSize: '1.4rem', opacity: 0.8, margin: 0 }}>
                      Transformando a educação pública através de soluções
                      pedagógicas e tecnologia.
                    </p>
                  </Stack>

                  <Stack direction="column" gap="xs">
                    <strong
                      style={{
                        fontSize: '1.4rem',
                        color: 'var(--color-white)',
                      }}
                    >
                      Navegação
                    </strong>
                    <NavLink href="#" color="white" variant="line">
                      Início
                    </NavLink>
                    <NavLink href="#" color="white" variant="line">
                      Soluções Pedagógicas
                    </NavLink>
                    <NavLink href="#" color="white" variant="line">
                      Casos de Sucesso
                    </NavLink>
                  </Stack>

                  <Stack direction="column" gap="xs">
                    <strong
                      style={{
                        fontSize: '1.4rem',
                        color: 'var(--color-white)',
                      }}
                    >
                      Institucional
                    </strong>
                    <NavLink href="#" color="white" variant="line">
                      Sobre Nós
                    </NavLink>
                    <NavLink href="#" color="white" variant="line">
                      Trabalhe Conosco
                    </NavLink>
                    <NavLink href="#" color="white" variant="line">
                      Políticas de Privacidade
                    </NavLink>
                  </Stack>
                </Grid>

                <div
                  style={{
                    borderTop: '1px solid var(--color-gray-800)',
                    paddingTop: 'var(--spacing-4)',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    opacity: 0.7,
                  }}
                >
                  © 2026 Sincroniza Educação. Todos os direitos reservados.
                </div>
              </Stack>
            </Container>
          </Box>
        }
      >
        <Box style={{ paddingTop: 'var(--sinc-header-height)' }}>
          <Box paddingBlock="xxl">
            <Container size="xl" padding="md">
              <Stack direction="column" gap="xxl" style={{ padding: '4rem 0' }}>
                {/* Hero Section */}
                <Stack
                  direction="column"
                  align="center"
                  gap="lg"
                  style={{
                    textAlign: 'center',
                    maxWidth: '80rem',
                    margin: '0 auto',
                  }}
                >
                  <Badge color="tertiary" variant="subtle">
                    <Sparkles size={14} style={{ marginRight: '0.4rem' }} />{' '}
                    Inovação educacional
                  </Badge>

                  <h1
                    style={{
                      fontSize: '3.6rem',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    Impulsionando a educação pública com eficiência e dados
                  </h1>

                  <p style={{ fontSize: '1.8rem', opacity: 0.8, margin: 0 }}>
                    Oferecemos apoio especializado para secretarias de educação,
                    gestores e professores alcançarem resultados reais de
                    aprendizagem.
                  </p>

                  <Stack direction="row" gap="md" justify="center" wrap>
                    <Button
                      color="primary"
                      size="lg"
                      rightIcon={<ArrowRight size={20} />}
                    >
                      Conhecer Projetos
                    </Button>
                    <Button color="surface" variant="outline" size="lg">
                      Falar com Consultor
                    </Button>
                  </Stack>
                </Stack>

                {/* Cards / Destaques */}
                <Grid minItemWidth="22rem" gap="lg">
                  {[
                    {
                      icon: <GraduationCap size={28} />,
                      title: 'Formação de Educadores',
                      description:
                        'Capacitações contínuas e práticas pedagógicas focadas no chão da escola.',
                    },
                    {
                      icon: <BookOpen size={28} />,
                      title: 'Gestão de Aprendizagem',
                      description:
                        'Acompanhamento detalhado de indicadores e diagnósticos educacionais.',
                    },
                    {
                      icon: <Users size={28} />,
                      title: 'Apoio às Secretarias',
                      description:
                        'Consultoria estratégica para implementação de políticas públicas.',
                    },
                  ].map((feature, i) => (
                    <Box
                      key={i}
                      color="light"
                      variant="solid"
                      shadow="sm"
                      padding="xl"
                    >
                      <Stack direction="column" gap="sm">
                        <div style={{ color: 'var(--color-primary)' }}>
                          {feature.icon}
                        </div>
                        <h3 style={{ fontSize: '1.8rem', margin: 0 }}>
                          {feature.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '1.4rem',
                            margin: 0,
                            opacity: 0.8,
                          }}
                        >
                          {feature.description}
                        </p>
                      </Stack>
                    </Box>
                  ))}
                </Grid>
              </Stack>
            </Container>
          </Box>
        </Box>
        <ScrollToTop />
      </WebLayout>
    </>
  );
};

export const PaginaInstitucional: Story = {
  render: (args) => <LandingPage {...args} />,
};
