import React, { useEffect } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';
import { NavToggle } from '@/components/NavToggle';
import { Container } from '@/layouts/Container';
import { Header } from '@/layouts/Header';
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
    '--sinc-web-layout-bg': {
      control: 'text',
      description: 'Cor de fundo da casca da página',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--color-bg-canvas)' },
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
      const target = e.target as HTMLElement;
      if (
        target.matches('[data-global-overlay]') ||
        (targetEl.getAttribute('data-state') === 'open' &&
          !targetEl.contains(target) &&
          !toggleBtn?.contains(target))
      ) {
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
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: calc(var(--z-index-fixed, 100) - 1);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .sinc-global-overlay[data-state="open"] {
          opacity: 1;
          visibility: visible;
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

const WebNavLinks = () => (
  <nav
    style={{
      display: 'flex',
      gap: '2.4rem',
      fontWeight: 500,
      fontSize: '1.4rem',
    }}
  >
    <a href="#solucoes" style={{ color: 'inherit', textDecoration: 'none' }}>
      Soluções
    </a>
    <a href="#metodologia" style={{ color: 'inherit', textDecoration: 'none' }}>
      Metodologia
    </a>
    <a href="#casos" style={{ color: 'inherit', textDecoration: 'none' }}>
      Casos de Sucesso
    </a>
  </nav>
);

const FooterMock = () => (
  <footer
    style={{
      backgroundColor: 'var(--color-gray-900)',
      color: 'var(--color-gray-300)',
      padding: '4rem 0',
      textAlign: 'center',
      fontSize: '1.4rem',
    }}
  >
    © 2026 Sincroniza Educação - Transformando a educação pública do Brasil.
  </footer>
);

const LandingPageApp = (args: WebLayoutStoryProps) => {
  return (
    <>
      <GlobalOverlayMock targetId="sinc-web-mobile-menu" />
      <WebLayout
        {...args}
        header={
          <Header
            position="fixed"
            isTransparent
            start={
              <strong
                style={{ fontSize: '2rem', color: 'var(--color-primary)' }}
              >
                Sincroniza
              </strong>
            }
            center={
              <div className="desktop-nav">
                <style>{`
                  .desktop-nav { display: none; }
                  @media(min-width: 48em) { .desktop-nav { display: block; } }
                `}</style>
                <WebNavLinks />
              </div>
            }
            end={
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}
              >
                <div
                  className="desktop-actions"
                  style={{ display: 'flex', gap: '1.2rem' }}
                >
                  <style>{`
                    .desktop-actions { display: none !important; }
                    @media(min-width: 48em) { .desktop-actions { display: flex !important; } }
                  `}</style>
                  <Button variant="ghost" color="primary">
                    Entrar
                  </Button>
                  <Button color="primary">Falar com consultor</Button>
                </div>
                <div className="mobile-toggle">
                  <style>{`
                    .mobile-toggle { display: block; }
                    @media(min-width: 48em) { .mobile-toggle { display: none; } }
                  `}</style>
                  <NavToggle
                    targetSelector="#sinc-web-mobile-menu"
                    buttonProps={{ color: 'primary', variant: 'solid' }}
                  />
                </div>
              </div>
            }
          />
        }
        footer={<FooterMock />}
      >
        <style>{`
          .mobile-drawer {
            position: fixed; top: 0; left: 0; bottom: 0; width: 28rem;
            background: var(--color-white); z-index: calc(var(--z-index-fixed) - 1);
            transform: translateX(-100%); transition: transform 0.3s ease;
            padding: 8rem 2.4rem; box-shadow: var(--shadow-lg);
          }
          .mobile-drawer[data-state="open"] { transform: translateX(0); }
        `}</style>
        <div
          id="sinc-web-mobile-menu"
          className="mobile-drawer"
          data-state="closed"
          data-scroll-lock
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.4rem',
              marginTop: 'var(--sinc-header-height)',
            }}
          >
            <WebNavLinks />
            <hr
              style={{ borderColor: 'var(--color-gray-200)', margin: '1rem 0' }}
            />
            <Button variant="outline" color="primary" width="full">
              Entrar
            </Button>
            <Button color="primary" width="full">
              Falar com consultor
            </Button>
          </div>
        </div>

        <section
          style={{
            backgroundColor: 'var(--color-primary-light)',
            paddingTop: '16rem',
            paddingBottom: '8rem',
            textAlign: 'center',
          }}
        >
          <Container size="md" padding="md">
            <h1
              style={{
                fontSize: '4.8rem',
                color: 'var(--color-primary)',
                lineHeight: 1.1,
                marginBottom: '2.4rem',
              }}
            >
              Tecnologia para impulsionar a educação
            </h1>
            <p
              style={{
                fontSize: '2rem',
                color: 'var(--color-gray-700)',
                marginBottom: '4rem',
              }}
            >
              Nossa plataforma conecta escolas, professores e alunos para
              construir o futuro da aprendizagem.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1.6rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button size="lg" color="primary" hasShadow>
                Começar agora
              </Button>
              <Button size="lg" variant="outline" color="primary">
                Conheça o sistema
              </Button>
            </div>
          </Container>
        </section>

        <section
          style={{ padding: '8rem 0', backgroundColor: 'var(--color-white)' }}
        >
          <Container size="xl" padding="md">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
                gap: '3.2rem',
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    padding: '3.2rem',
                    backgroundColor: 'var(--color-gray-50)',
                    borderRadius: 'var(--radii-md)',
                  }}
                >
                  <div
                    style={{
                      width: '4.8rem',
                      height: '4.8rem',
                      background: 'var(--color-primary)',
                      borderRadius: 'var(--radii-sm)',
                      marginBottom: '1.6rem',
                    }}
                  />
                  <h3 style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>
                    Módulo de Gestão #{i}
                  </h3>
                  <p
                    style={{
                      fontSize: '1.6rem',
                      color: 'var(--color-gray-600)',
                      lineHeight: 1.5,
                    }}
                  >
                    Integração completa com as principais bases de dados
                    educacionais, garantindo fluidez e velocidade.
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </WebLayout>
    </>
  );
};

export const AplicaçãoCompleta: Story = {
  render: (args) => <LandingPageApp {...args} />,
};
