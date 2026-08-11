import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Container,
  type ContainerPadding,
  type ContainerSize,
  type ContainerTag,
} from './Container';

type ContainerStoryProps = React.ComponentProps<typeof Container> &
  Record<string, unknown>;

const meta: Meta<ContainerStoryProps> = {
  title: 'Layouts/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
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
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'nav'],
      table: { category: 'Propriedades (Props)' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xxl', 'full'],
      table: { category: 'Propriedades (Props)' },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      table: { category: 'Propriedades (Props)' },
    },
    isContainerQuery: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-container-max-width': {
      control: 'text',
      description: 'Largura máxima do contêiner',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'size-xl (128rem)' },
      },
    },
    '--sinc-container-padding-inline': {
      control: 'text',
      description: 'Espaçamento interno horizontal',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'padding-md (var(--spacing-4))' },
      },
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
      gap: '0.5rem',
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

const DemoBox = ({ label }: { label: string }) => (
  <div
    style={{
      padding: '1.5rem',
      backgroundColor: 'var(--color-primary-light)',
      border: 'var(--spacing-px) dashed var(--color-primary)',
      borderRadius: 'var(--radii-md)',
      textAlign: 'center',
      fontWeight: 600,
      color: 'var(--color-primary, #0055ff)',
    }}
  >
    {label}
  </div>
);

export const Padrão: Story = {
  args: {
    size: 'xl',
    padding: 'md',
    children: <DemoBox label="Container (size: xl | padding: md)" />,
  },
};

export const Tamanhos: Story = {
  render: () => {
    const sizes: ContainerSize[] = ['sm', 'md', 'lg', 'xl', 'xxl', 'full'];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        {sizes.map((sz) => (
          <StoryRow key={sz} label={`size="${sz}"`}>
            <Container size={sz}>
              <DemoBox label={`Size: ${sz}`} />
            </Container>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Paddings: Story = {
  render: () => {
    const paddings: ContainerPadding[] = ['none', 'sm', 'md', 'lg'];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        {paddings.map((pd) => (
          <StoryRow key={pd} label={`padding="${pd}"`}>
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--color-gray-200)',
                border: 'var(--spacing-px) dashed var(--color-gray-400)',
                borderRadius: 'var(--radii-md)',
              }}
            >
              <Container size="xl" padding={pd}>
                <DemoBox label={`Conteúdo interno (padding="${pd}")`} />
              </Container>
            </div>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const TagsSemanticas: Story = {
  render: () => {
    const tags: ContainerTag[] = ['div', 'section', 'article'];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        {tags.map((tg) => (
          <StoryRow key={tg} label={`as="${tg}"`}>
            <Container as={tg} size="xl">
              <DemoBox label={`Renderizado como <${tg}>`} />
            </Container>
          </StoryRow>
        ))}
      </div>
    );
  },
};
