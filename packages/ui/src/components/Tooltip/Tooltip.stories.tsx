import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';
import { Tooltip } from './Tooltip';
import type { TooltipAlign, TooltipPosition, TooltipProps } from './Tooltip';

type TooltipStoryProps = TooltipProps & Record<string, unknown>;

const meta: Meta<TooltipStoryProps> = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
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
    content: 'Texto explicativo do tooltip',
    position: 'top',
    align: 'center',
    isDisabled: false,
  },
  argTypes: {
    content: { table: { category: 'Propriedades (Props)' } },
    position: { table: { category: 'Propriedades (Props)' } },
    align: { table: { category: 'Propriedades (Props)' } },
    isDisabled: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-tooltip-color': {
      control: 'text',
      description: 'Cor do texto do tooltip',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-bg': {
      control: 'text',
      description: 'Cor de fundo do balão do tooltip',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-padding': {
      control: 'text',
      description: 'Espaçamento interno do balão do tooltip',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-font-size': {
      control: 'text',
      description: 'Tamanho da fonte tipográfica',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-font-weight': {
      control: 'text',
      description: 'Peso da fonte',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-line-height': {
      control: 'text',
      description: 'Altura da linha do texto',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-text-align': {
      control: 'text',
      description: 'Alinhamento do texto interno',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-border-radius': {
      control: 'text',
      description: 'Arredondamento das bordas do balão',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-tooltip-shadow': {
      control: 'text',
      description: 'Sombra de elevação aplicada ao balão',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrão: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button color="primary">Passe o mouse aqui</Button>
    </Tooltip>
  ),
};

export const Posições: Story = {
  render: () => {
    const positions: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];
    return (
      <div
        style={{
          display: 'flex',
          gap: '2.4rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
        }}
      >
        {positions.map((pos) => (
          <Tooltip key={pos} position={pos} content={`Tooltip no lado ${pos}`}>
            <Button variant="outline" color="primary">
              {pos}
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};

export const Alinhamentos: Story = {
  render: () => {
    const alignments: TooltipAlign[] = ['start', 'center', 'end'];
    return (
      <div
        style={{
          display: 'flex',
          gap: '3.2rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
        }}
      >
        {alignments.map((align) => (
          <Tooltip
            key={align}
            position="top"
            align={align}
            content={`Alinhado ao ${align}`}
          >
            <Button color="secondary">Top - {align}</Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};

export const Desabilitado: Story = {
  render: () => (
    <Tooltip isDisabled content="Este tooltip não será exibido">
      <Button color="surface" variant="subtle">
        Tooltip Desabilitado
      </Button>
    </Tooltip>
  ),
};
