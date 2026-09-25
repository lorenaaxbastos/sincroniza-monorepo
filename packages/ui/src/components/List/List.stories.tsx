import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Check, ChevronRight, ShieldAlert, Star } from 'lucide-react';
import { List } from './List';
import type { ListItemData, ListProps } from './List';

type ListStoryProps = ListProps & Record<string, unknown>;

const sampleItems: ListItemData[] = [
  { label: 'Primeiro item da lista' },
  { label: 'Segundo item da lista com mais detalhes' },
  { label: 'Terceiro item da lista finalizando a sequência' },
];

const meta: Meta<ListStoryProps> = {
  title: 'Componentes/List',
  component: List,
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
    as: 'ul',
    variant: 'disc',
    markerVariant: 'ghost',
    size: 'md',
    spacing: 'sm',
    hasDividers: false,
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['ul', 'ol'],
      table: { category: 'Propriedades (Props)' },
    },
    variant: {
      control: 'select',
      options: [
        'disc',
        'circle',
        'square',
        'icon',
        'decimal',
        'decimal-leading-zero',
        'lower-roman',
        'upper-roman',
        'lower-alpha',
        'upper-alpha',
        'none',
      ],
      table: { category: 'Propriedades (Props)' },
    },
    markerVariant: {
      control: 'select',
      options: ['ghost', 'solid'],
      table: { category: 'Propriedades (Props)' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Propriedades (Props)' },
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
      table: { category: 'Propriedades (Props)' },
    },
    hasDividers: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    items: { table: { category: 'Propriedades (Props)' } },
    icon: { control: false, table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-list-marker-color': {
      control: 'color',
      description:
        'Cor do texto/ícone/bullet no modo ghost ou cor do texto no modo solid',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-list-marker-bg': {
      control: 'color',
      description: 'Cor de fundo do marcador quando o modo for solid',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-list-marker-size': {
      control: 'text',
      description: 'Tamanho customizado do marcador/ícone/bullet',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-list-marker-radius': {
      control: 'text',
      description: 'Raio de borda customizado para o marcador solid',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-list-divider-color': {
      control: 'color',
      description: 'Cor da linha divisória entre os itens',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-list-marker-margin-top': {
      control: 'text',
      description:
        'Ajuste fino da margem superior do marcador (para alinhamento óptico com o texto).',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NaoOrdenada: Story = {
  name: 'Não Ordenada',
  args: {
    as: 'ul',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Disc</p>
        <List {...args} items={sampleItems} as="ul" variant="disc" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Circle</p>
        <List {...args} items={sampleItems} as="ul" variant="circle" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Square</p>
        <List {...args} items={sampleItems} as="ul" variant="square" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Com ícone</p>
        <List {...args} items={sampleItems} as="ul" variant="icon" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>None</p>
        <List {...args} items={sampleItems} as="ul" variant="none" />
      </div>
    </div>
  ),
};

export const OrdenadaGhost: Story = {
  name: 'Ordenada (Ghost)',
  args: {
    as: 'ol',
    markerVariant: 'ghost',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Decimal (1, 2, 3)
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="decimal"
          markerVariant="ghost"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Decimal leading zero (01, 02, 03)
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="decimal-leading-zero"
          markerVariant="ghost"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Lower alpha (a, b, c)
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="lower-alpha"
          markerVariant="ghost"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Upper alpha (A, B, C)
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="upper-alpha"
          markerVariant="ghost"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Lower roman (i, ii, iii)
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="lower-roman"
          markerVariant="ghost"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Upper roman (I, II, III)
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="upper-roman"
          markerVariant="ghost"
        />
      </div>
    </div>
  ),
};

export const OrdenadaSolid: Story = {
  name: 'Ordenada (Solid)',
  args: {
    as: 'ol',
    variant: 'decimal',
    markerVariant: 'solid',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Decimal solid</p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="decimal"
          markerVariant="solid"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Upper alpha solid
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="upper-alpha"
          markerVariant="solid"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Upper roman solid
        </p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          variant="upper-roman"
          markerVariant="solid"
        />
      </div>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Small (sm)</p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          size="sm"
          variant="decimal"
          markerVariant="solid"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Medium (md)</p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          size="md"
          variant="lower-alpha"
          markerVariant="solid"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Large (lg)</p>
        <List
          {...args}
          items={sampleItems}
          as="ol"
          size="lg"
          variant="lower-roman"
          markerVariant="solid"
        />
      </div>
    </div>
  ),
};

export const Espacamentos: Story = {
  name: 'Espaçamentos Verticais',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Espaçamento XS
        </p>
        <List {...args} items={sampleItems} spacing="xs" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Espaçamento MD
        </p>
        <List {...args} items={sampleItems} spacing="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Espaçamento LG
        </p>
        <List {...args} items={sampleItems} spacing="lg" />
      </div>
    </div>
  ),
};

export const ViaSublistasAninhadasComposicao: Story = {
  name: 'Sublistas Aninhadas',
  args: {
    as: 'ol',
    variant: 'decimal',
    markerVariant: 'solid',
  },
  render: (args) => (
    <List {...args} as="ol" variant="decimal" markerVariant="solid">
      <List.Item title="Requisitos do sistema">
        Verifique as dependências necessárias antes de iniciar.
        <List
          as="ul"
          variant="icon"
          icon={<ChevronRight size={12} />}
          spacing="xs"
        >
          <List.Item>Node.js na versão LTS mais recente</List.Item>
          <List.Item>Gerenciador de pacotes pnpm ativado</List.Item>
        </List>
      </List.Item>

      <List.Item title="Build dos pacotes">
        Compile os componentes e os design tokens do repositório.
      </List.Item>
    </List>
  ),
};

export const CustomizadaComIcones: Story = {
  name: 'Ícones Customizados no Item',
  render: (args) => (
    <List {...args} as="ul">
      <List.Item
        icon={<Check size={16} color="var(--color-feedback-success)" />}
      >
        Acesso total a todos os módulos do curso
      </List.Item>
      <List.Item
        icon={<Check size={16} color="var(--color-feedback-success)" />}
      >
        Atendimento prioritário na comunidade
      </List.Item>
      <List.Item
        icon={<Star size={16} color="var(--color-feedback-warning)" />}
      >
        Certificado oficial de conclusão emitido ao final
      </List.Item>
    </List>
  ),
};

export const ComTitulosEDivisores: Story = {
  name: 'Com Título e Divisores',
  render: (args) => (
    <List {...args} hasDividers spacing="md">
      <List.Item
        title="Vulnerabilidade crítica identificada"
        icon={<ShieldAlert size={16} color="var(--color-feedback-error)" />}
      >
        O pacote exposto no arquivo package.json requer atualização imediata de
        segurança.
      </List.Item>
      <List.Item
        title="Aviso de permissão de acesso"
        icon={<ShieldAlert size={16} color="var(--color-feedback-warning)" />}
      >
        Sua conta atual não possui direitos de gravação no repositório de
        produção.
      </List.Item>
    </List>
  ),
};

export const VariaveisCSS: Story = {
  name: 'Personalização via Variáveis CSS',
  args: {
    as: 'ol',
    variant: 'decimal',
    markerVariant: 'solid',
  },
  render: (args) => (
    <List
      {...args}
      as="ol"
      variant="decimal"
      markerVariant="solid"
      items={sampleItems}
      style={
        {
          '--sinc-list-marker-color': 'var(--color-white)',
          '--sinc-list-marker-bg': 'var(--color-secondary)',
          '--sinc-list-marker-radius': '9999px',
        } as React.CSSProperties
      }
    />
  ),
};
