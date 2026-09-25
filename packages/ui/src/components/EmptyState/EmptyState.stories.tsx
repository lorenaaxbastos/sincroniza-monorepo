import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { FolderSearch, Inbox, Plus } from 'lucide-react';
import { Button } from '@/components/Button';
import { EmptyState } from './EmptyState';
import type { EmptyStateProps } from './EmptyState';

type EmptyStateStoryProps = EmptyStateProps & Record<string, unknown>;

const meta: Meta<EmptyStateStoryProps> = {
  title: 'Componentes/EmptyState',
  component: EmptyState,
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
    title: 'Nenhum dado encontrado',
    size: 'md',
    align: 'center',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Propriedades (Props)' },
    },
    align: {
      control: 'select',
      options: ['center', 'left'],
      table: { category: 'Propriedades (Props)' },
    },
    title: {
      control: 'text',
      table: { category: 'Propriedades (Props)' },
    },
    description: {
      control: 'text',
      table: { category: 'Propriedades (Props)' },
    },
    icon: { table: { category: 'Propriedades (Props)' } },
    action: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-empty-state-bg': {
      control: 'color',
      description: 'Cor de fundo do componente.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-empty-state-icon-color': {
      control: 'color',
      description: 'Cor do ícone ilustrativo.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-empty-state-title-color': {
      control: 'color',
      description: 'Cor do título principal.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-empty-state-desc-color': {
      control: 'color',
      description: 'Cor do texto descritivo.',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  render: (args) => <EmptyState {...args} />,
};

export const ComIconeEAcao: Story = {
  name: 'Com Ícone E Ação',
  render: (args) => (
    <EmptyState
      {...args}
      icon={<FolderSearch size={48} />}
      title="Nenhum projeto criado"
      description="Comece criando seu primeiro projeto para gerenciar suas tarefas e colaboradores."
      action={
        <Button size="sm">
          <Plus size={16} style={{ marginRight: '0.5rem' }} />
          Criar novo projeto
        </Button>
      }
    />
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ border: '1px dashed var(--color-gray-300)' }}>
        <p style={{ padding: '0.5rem 1rem', margin: 0, fontWeight: 600 }}>
          Small (sm)
        </p>
        <EmptyState
          {...args}
          size="sm"
          icon={<Inbox size={24} />}
          title="Sem registros"
          description="Nenhum item encontrado na lista."
        />
      </div>

      <div style={{ border: '1px dashed var(--color-gray-300)' }}>
        <p style={{ padding: '0.5rem 1rem', margin: 0, fontWeight: 600 }}>
          Medium (md)
        </p>
        <EmptyState
          {...args}
          size="md"
          icon={<Inbox size={40} />}
          title="Sem dados disponíveis"
          description="Cadastre novas informações para visualizar este painel."
        />
      </div>

      <div style={{ border: '1px dashed var(--color-gray-300)' }}>
        <p style={{ padding: '0.5rem 1rem', margin: 0, fontWeight: 600 }}>
          Large (lg)
        </p>
        <EmptyState
          {...args}
          size="lg"
          icon={<Inbox size={56} />}
          title="Ainda não há dados"
          description="Esta área será preenchida assim que o primeiro registro for concluído no sistema."
        />
      </div>
    </div>
  ),
};

export const AlinhamentoEsquerda: Story = {
  name: 'Alinhamento À Esquerda',
  render: (args) => (
    <div
      style={{
        maxWidth: '400px',
        border: '1px solid var(--color-gray-200)',
        borderRadius: 'var(--radii-md)',
      }}
    >
      <EmptyState
        {...args}
        align="left"
        icon={<FolderSearch size={32} />}
        title="Nenhum documento anexado"
        description="Envie os arquivos necessários para dar prosseguimento ao cadastro."
        action={<Button size="sm">Anexar arquivo</Button>}
      />
    </div>
  ),
};
