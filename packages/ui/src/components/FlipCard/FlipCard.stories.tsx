import { useState } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { RotateCw, Sparkles, UserCheck } from 'lucide-react';
import { Card } from '../Card';
import { FlipCard } from './FlipCard';
import type { FlipCardProps } from './FlipCard';

type FlipCardStoryProps = FlipCardProps & Record<string, unknown>;

const meta: Meta<FlipCardStoryProps> = {
  title: 'Componentes/FlipCard',
  component: FlipCard,
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
  args: {
    trigger: 'click',
    flipDirection: 'horizontal',
    isFlipped: undefined,
    defaultFlipped: false,
    flipButtonLabel: 'Alternar visualização do cartão',
  },
  argTypes: {
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
      table: { category: 'Propriedades (Props)' },
    },
    flipDirection: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: { category: 'Propriedades (Props)' },
    },
    isFlipped: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    defaultFlipped: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    flipButtonLabel: {
      control: 'text',
      table: { category: 'Propriedades (Props)' },
    },
    onFlipChange: { table: { disable: true } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-flipcard-perspective': {
      control: 'text',
      description: 'Profundidade da perspectiva 3D',
      table: { category: 'Variáveis CSS' },
      defaultValue: { summary: '1000px' },
    },
    '--sinc-flipcard-duration': {
      control: 'text',
      description: 'Duração da animação de giro',
      table: { category: 'Variáveis CSS' },
      defaultValue: { summary: '0.6s' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledFlipCardStory = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.6rem',
        width: '32rem',
      }}
    >
      <button
        type="button"
        onClick={() => {
          setIsFlipped(!isFlipped);
        }}
        style={{
          padding: '1rem 1.6rem',
          borderRadius: 'var(--radii-md, 0.6rem)',
          border: '1px solid var(--color-gray-300)',
          backgroundColor: 'var(--color-surface)',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Girar externamente (estado: {isFlipped ? 'verso' : 'frente'})
      </button>

      <FlipCard trigger="manual" isFlipped={isFlipped}>
        <FlipCard.Front variant="outline" color="tertiary">
          <Card.Body
            style={{
              minHeight: '18rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: 0 }}>Frente controlada</h3>
          </Card.Body>
        </FlipCard.Front>
        <FlipCard.Back variant="solid" color="tertiary">
          <Card.Body
            style={{
              minHeight: '18rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: 0 }}>Verso controlado</h3>
          </Card.Body>
        </FlipCard.Back>
      </FlipCard>
    </div>
  );
};

export const Padrão: Story = {
  render: (args) => (
    <div style={{ width: '32rem' }}>
      <FlipCard {...args}>
        <FlipCard.Front variant="outline" color="primary">
          <Card.Body
            style={{
              minHeight: '20rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Sparkles size={32} />
            <h3 style={{ margin: 0 }}>Frente do Card</h3>
            <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.8 }}>
              Clique para girar
            </p>
          </Card.Body>
        </FlipCard.Front>
        <FlipCard.Back variant="solid" color="primary">
          <Card.Body
            style={{
              minHeight: '20rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <RotateCw size={32} />
            <h3 style={{ margin: 0 }}>Verso do Card</h3>
            <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>
              Clique para desvirar
            </p>
          </Card.Body>
        </FlipCard.Back>
      </FlipCard>
    </div>
  ),
};

export const GatilhoHover: Story = {
  render: () => (
    <div style={{ width: '32rem' }}>
      <FlipCard trigger="hover">
        <FlipCard.Front variant="solid" color="surface">
          <Card.Body
            style={{
              minHeight: '20rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <UserCheck size={32} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ margin: 0 }}>Passe o mouse</h3>
            <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.7 }}>
              Ou navegue com Tab para acionar via teclado.
            </p>
          </Card.Body>
        </FlipCard.Front>
        <FlipCard.Back variant="solid" color="dark">
          <Card.Body
            style={{
              minHeight: '20rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: 0 }}>Conteúdo revelado!</h3>
            <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.8 }}>
              A face traseira fica oculta para leitores de tela até o card
              girar.
            </p>
          </Card.Body>
        </FlipCard.Back>
      </FlipCard>
    </div>
  ),
};

export const DireçãoVertical: Story = {
  render: () => (
    <div style={{ width: '32rem' }}>
      <FlipCard trigger="click" flipDirection="vertical">
        <FlipCard.Front variant="outline" color="secondary">
          <Card.Body
            style={{
              minHeight: '20rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: 0 }}>Giro vertical</h3>
            <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.8 }}>
              Giro no eixo X
            </p>
          </Card.Body>
        </FlipCard.Front>
        <FlipCard.Back variant="solid" color="secondary">
          <Card.Body
            style={{
              minHeight: '20rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: 0 }}>Verso vertical</h3>
            <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>
              Perfeito para transições de topo para baixo
            </p>
          </Card.Body>
        </FlipCard.Back>
      </FlipCard>
    </div>
  ),
};

export const ControleManual: Story = {
  render: () => <ControlledFlipCardStory />,
};
