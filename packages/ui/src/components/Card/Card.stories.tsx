import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, BookOpen, MoreHorizontal, Sparkles } from 'lucide-react';
import { Link } from '../Link';
import { Card } from './Card';
import type { CardColor, CardProps, CardVariant } from './Card';

type CardStoryProps = CardProps & Record<string, unknown>;

const meta: Meta<CardStoryProps> = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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
      options: ['solid', 'subtle', 'outline'],
      table: { category: 'Propriedades (Props)' },
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
      table: { category: 'Propriedades (Props)' },
    },
    isHoverable: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    bgImage: {
      control: 'text',
      description: 'URL da imagem de fundo aplicada ao contêiner do card',
      table: { category: 'Propriedades (Props)' },
    },
    bgOverlay: {
      control: 'text',
      description:
        'Cor/opacidade da máscara sobre a imagem de fundo (ex: rgba(0,0,0,0.6))',
      table: { category: 'Propriedades (Props)' },
    },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-card-bg': {
      control: 'text',
      description: 'Cor de fundo customizada do card',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-card-color': {
      control: 'text',
      description: 'Cor de texto principal do card',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-card-border': {
      control: 'text',
      description: 'Estilo de borda completo (largura, estilo e cor)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-card-border-radius': {
      control: 'text',
      description: 'Arredondamento dos cantos do card',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-card-shadow': {
      control: 'text',
      description: 'Sombra de elevação em estado de repouso',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-card-hover-transform': {
      control: 'text',
      description: 'Efeito de translação visual no hover',
      table: { category: 'Variáveis CSS' },
      defaultValue: { summary: 'translateY(-6px)' },
    },
    '--sinc-card-hover-shadow': {
      control: 'text',
      description: 'Sombra de elevação em estado de hover',
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
      flexDirection: 'column',
      gap: '0.8rem',
      width: '100%',
    }}
  >
    <span
      style={{
        fontSize: 'var(--font-size-xs, 1.2rem)',
        fontFamily: 'monospace',
        color: 'var(--color-gray-500)',
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

export const Padrão: Story = {
  render: (args) => (
    <div style={{ width: '32rem' }}>
      <Card {...args}>
        <Card.Body>
          <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Título do Card</h3>
          <p style={{ margin: 0, fontSize: '1.4rem', opacity: 0.8 }}>
            Este é um exemplo de card básico montado utilizando a estrutura
            semântica padrão.
          </p>
        </Card.Body>
      </Card>
    </div>
  ),
};

export const AnatomiaCompletaNaHorizontal: Story = {
  render: () => (
    <div style={{ maxWidth: '56rem' }}>
      <Card
        variant="outline"
        color="surface"
        isHoverable
        style={{ flexDirection: 'row', overflow: 'hidden' }}
      >
        <Card.Media
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
          alt="Professores em sala de aula"
          style={{ width: '20rem', objectFit: 'cover' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Card.Header style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <span
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Curso em Destaque
            </span>
          </Card.Header>

          <Card.Body>
            <h3 style={{ margin: 0, fontSize: '1.8rem' }}>
              Gestão Escolar e Aprendizagem
            </h3>
            <p style={{ margin: 0, fontSize: '1.4rem', opacity: 0.8 }}>
              Capacitação focada em métricas e diagnósticos para secretarias de
              educação.
            </p>
          </Card.Body>

          <Card.Footer style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>40 horas</span>
            <a
              href="#saiba-mais"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '1.4rem',
                fontWeight: 600,
              }}
            >
              Acessar curso <ArrowRight size={16} />
            </a>
          </Card.Footer>
        </div>
      </Card>
    </div>
  ),
};

export const AnatomiaCompletaNaVertical: Story = {
  render: () => (
    <div style={{ width: '36rem' }}>
      <Card variant="outline" color="surface" isHoverable>
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <BookOpen size={18} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontWeight: 600, fontSize: '1.4rem' }}>
              Formação Continuada
            </span>
          </div>
          <button
            type="button"
            aria-label="Mais opções"
            style={{ cursor: 'pointer', opacity: 0.6 }}
          >
            <MoreHorizontal size={18} />
          </button>
        </Card.Header>

        <Card.Media
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
          alt="Professores em sala de aula"
          aspectRatio="16/9"
        />

        <Card.Body>
          <h3 style={{ margin: 0, fontSize: '1.8rem' }}>
            Gestão Escolar e Aprendizagem
          </h3>
          <p style={{ margin: 0, fontSize: '1.4rem', opacity: 0.8 }}>
            Capacitação focada em métricas e diagnósticos para secretarias de
            educação.
          </p>
        </Card.Body>

        <Card.Footer style={{ justifyContent: 'space-between' }}>
          <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>
            Carga horária: 40h
          </span>
          <a
            href="#saiba-mais"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '1.4rem',
              fontWeight: 600,
            }}
          >
            Acessar curso <ArrowRight size={16} />
          </a>
        </Card.Footer>
      </Card>
    </div>
  ),
};

export const Variantes: Story = {
  render: () => {
    const variants: CardVariant[] = ['solid', 'subtle', 'outline'];
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(24rem, 1fr))',
          gap: '1.6rem',
        }}
      >
        {variants.map((v) => (
          <StoryRow key={v} label={`variant="${v}"`}>
            <Card variant={v} color="primary">
              <Card.Body>
                <h4 style={{ margin: 0, fontSize: '1.6rem' }}>Variante {v}</h4>
                <p style={{ margin: 0, fontSize: '1.3rem', opacity: 0.9 }}>
                  Exemplo de card na variante {v} com a cor primary.
                </p>
              </Card.Body>
            </Card>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Cores: Story = {
  render: () => {
    const colors: CardColor[] = [
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
          gap: '1.2rem',
          width: '100%',
        }}
      >
        {colors.map((clr) => (
          <Card key={clr} color={clr} variant="solid">
            <Card.Body style={{ padding: '1.6rem' }}>
              <span style={{ fontWeight: 600, fontSize: '1.4rem' }}>{clr}</span>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  },
};

export const ImagemDeFundoEOverlay: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(28rem, 1fr))',
        gap: '2rem',
      }}
    >
      <StoryRow label="Overlay escuro (rgba)">
        <Card
          bgImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
          bgOverlay="rgba(0, 0, 0, 0.65)"
          style={{ minHeight: '26rem' }}
          isHoverable
        >
          <Card.Body style={{ justifyContent: 'flex-end', color: '#fff' }}>
            <span
              style={{
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1rem',
              }}
            >
              Projeto Destaque
            </span>
            <h3 style={{ margin: 0, fontSize: '2rem' }}>Educação Conectada</h3>
            <p style={{ margin: 0, fontSize: '1.4rem', opacity: 0.9 }}>
              Transformando a infraestrutura tecnológica das escolas públicas.
            </p>
          </Card.Body>
        </Card>
      </StoryRow>

      <StoryRow label="Overlay com cor da marca">
        <Card
          bgImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
          bgOverlay="color-mix(in srgb, var(--color-primary-dark), transparent 20%)"
          style={{ minHeight: '26rem' }}
          isHoverable
        >
          <Card.Body style={{ justifyContent: 'space-between', color: '#fff' }}>
            <div style={{ display: 'flex', justifySelf: 'flex-start' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2rem' }}>
                Inovação Pedagógica
              </h3>
              <p style={{ margin: 0, fontSize: '1.4rem', opacity: 0.9 }}>
                Suporte para gestores e equipes escolares.
              </p>
            </div>
          </Card.Body>
        </Card>
      </StoryRow>
    </div>
  ),
};

export const CardComoLink: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '30rem',
      }}
    >
      <Card variant="outline" color="secondary" isHoverable>
        <Card.Body>
          <h4 style={{ margin: 0 }}>
            <Link
              href="#artigo"
              color="inherit"
              underline="none"
              className="sinc-stretched-link"
            >
              Card Link da Notícia
            </Link>
          </h4>
          <p>O texto do card continua semântico para o leitor de tela.</p>
        </Card.Body>
      </Card>
    </div>
  ),
};
