import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

type AvatarStoryProps = React.ComponentProps<typeof Avatar> &
  Record<string, unknown>;

const meta: Meta<AvatarStoryProps> = {
  title: 'Componentes/Avatar',
  component: Avatar,
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
    size: 'md',
    variant: 'circle',
    color: 'primary',
  },
  argTypes: {
    src: { table: { category: 'Propriedades (Props)' } },
    alt: { table: { category: 'Propriedades (Props)' } },
    name: { table: { category: 'Propriedades (Props)' } },
    size: { table: { category: 'Propriedades (Props)' } },
    variant: { table: { category: 'Propriedades (Props)' } },
    color: { table: { category: 'Propriedades (Props)' } },
    status: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-avatar-size': {
      control: 'text',
      description: 'Dimensão do diâmetro/lado do avatar',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-avatar-bg': {
      control: 'text',
      description: 'Cor de fundo do avatar',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-avatar-color': {
      control: 'text',
      description: 'Cor do texto (iniciais) ou do ícone fallback',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-avatar-radius': {
      control: 'text',
      description: 'Arredondamento das bordas do avatar',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-avatar-font-weight': {
      control: 'text',
      description: 'Peso da fonte do texto de iniciais',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-avatar-status-border': {
      control: 'text',
      description: 'Cor da borda do indicador de status',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ComImagem: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    name: 'Lorena Bastos',
  },
};

export const ComIniciais: Story = {
  args: {
    name: 'Lorena Bastos',
    color: 'primary',
  },
};

export const FallbackIcone: Story = {
  args: {
    color: 'secondary',
  },
};

export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
      <Avatar size="xs" name="Lorena Bastos" />
      <Avatar size="sm" name="Lorena Bastos" />
      <Avatar size="md" name="Lorena Bastos" />
      <Avatar size="lg" name="Lorena Bastos" />
      <Avatar size="xl" name="Lorena Bastos" />
    </div>
  ),
};

export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2.4rem' }}>
      <Avatar name="Ana Silva" status="online" />
      <Avatar name="Bruno Costa" status="away" />
      <Avatar name="Carla Souza" status="busy" />
      <Avatar name="Diego Rocha" status="offline" />
    </div>
  ),
};

export const CoresEVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          flexWrap: 'wrap',
        }}
      >
        <Avatar name="Primary" color="primary" />
        <Avatar name="Secondary" color="secondary" />
        <Avatar name="Tertiary" color="tertiary" />
        <Avatar name="Quaternary" color="quaternary" />
        <Avatar name="Dark" color="dark" />
        <Avatar name="Light" color="light" />
        <Avatar name="White" color="white" />
        <Avatar name="Black" color="black" />
        <Avatar name="Surface" color="surface" />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          flexWrap: 'wrap',
        }}
      >
        <Avatar variant="square" name="Primary" color="primary" />
        <Avatar variant="square" name="Secondary" color="secondary" />
        <Avatar variant="square" name="Tertiary" color="tertiary" />
        <Avatar variant="square" name="Quaternary" color="quaternary" />
        <Avatar variant="square" name="Dark" color="dark" />
        <Avatar variant="square" name="Light" color="light" />
        <Avatar variant="square" name="White" color="white" />
        <Avatar variant="square" name="Black" color="black" />
        <Avatar variant="square" name="Surface" color="surface" />
      </div>
    </div>
  ),
};
