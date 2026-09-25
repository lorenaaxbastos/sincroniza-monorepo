import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { FileText, Folder, Home, Slash } from 'lucide-react';
import { Separator } from '@/components/Separator';
import { Breadcrumb } from './Breadcrumb';
import type {
  BreadcrumbActiveColor,
  BreadcrumbColor,
  BreadcrumbItemData,
  BreadcrumbProps,
} from './Breadcrumb';

type BreadcrumbStoryProps = BreadcrumbProps & Record<string, unknown>;

const sampleItems: BreadcrumbItemData[] = [
  { label: 'Início', href: '/' },
  { label: 'Documentos', href: '/documentos' },
  { label: 'Projetos', href: '/documentos/projetos' },
  { label: 'Relatório Anual.pdf' },
];

const meta: Meta<BreadcrumbStoryProps> = {
  title: 'Componentes/Breadcrumb',
  component: Breadcrumb,
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
      description: {
        component: `
O \`Breadcrumb\` indica a localização do usuário dentro da hierarquia visual e estrutural do sistema, facilitando o retorno a níveis superiores com suporte semântico completo e acessibilidade.

### Estrutura da prop \`items\`
A propriedade \`items\` aceita um array de objetos com o tipo \`BreadcrumbItemData[]\`:

\`\`\`typescript
const items: BreadcrumbItemData[] = [
  { label: 'Início', href: '/', icon: <Home size={14} /> },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Relatório Anual.pdf' }, // O último item é tratado como página atual por padrão
];
\`\`\`
`,
      },
    },
  },
  args: {
    items: sampleItems,
    color: 'dark',
    activeColor: 'primary',
    size: 'md',
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
  },
  argTypes: {
    items: { table: { category: 'Propriedades (Props)' } },
    separator: { table: { category: 'Propriedades (Props)' } },
    color: {
      control: 'select',
      options: ['dark', 'light', 'surface', 'white', 'black'],
      table: { category: 'Propriedades (Props)' },
    },
    activeColor: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'dark',
        'light',
        'surface',
        'white',
        'black',
      ],
      table: { category: 'Propriedades (Props)' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Propriedades (Props)' },
    },
    maxItems: {
      control: 'number',
      table: { category: 'Propriedades (Props)' },
    },
    itemsBeforeCollapse: {
      control: 'number',
      table: { category: 'Propriedades (Props)' },
    },
    itemsAfterCollapse: {
      control: 'number',
      table: { category: 'Propriedades (Props)' },
    },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-breadcrumb-font-size': {
      control: 'text',
      description: 'Tamanho da fonte e escala visual da trilha',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-breadcrumb-link-color': {
      control: 'color',
      description: 'Cor dos links anteriores',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-breadcrumb-active-color': {
      control: 'color',
      description: 'Cor do texto do nível atual (página ativa)',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-breadcrumb-separator-color': {
      control: 'color',
      description: 'Cor do ícone separador',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const ComIcones: Story = {
  args: {
    items: [
      { label: 'Início', href: '/', icon: <Home size={14} /> },
      { label: 'Projetos', href: '/projetos', icon: <Folder size={14} /> },
      { label: 'Detalhamento.pdf', icon: <FileText size={14} /> },
    ],
  },
};

export const SeparadorPersonalizado: Story = {
  name: 'Separadores Personalizados',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Com barra truncada (slash)
        </p>
        <Breadcrumb
          items={sampleItems}
          {...args}
          separator={<Slash size={12} />}
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Com separador do Design System
        </p>
        <Breadcrumb
          items={sampleItems}
          {...args}
          separator={
            <Separator
              color="surface"
              orientation="vertical"
              size="sm"
              style={{ height: '12px' }}
            />
          }
        />
      </div>
    </div>
  ),
};

export const Colapsado: Story = {
  args: {
    maxItems: 3,
    items: [
      { label: 'Início', href: '/' },
      { label: 'Educação', href: '/educacao' },
      { label: 'Cursos', href: '/educacao/cursos' },
      { label: 'Tecnologia', href: '/educacao/cursos/tecnologia' },
      { label: 'Frontend React' },
    ],
  },
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Pequeno (sm)</p>
        <Breadcrumb items={sampleItems} {...args} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Médio (md)</p>
        <Breadcrumb items={sampleItems} {...args} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Grande (lg)</p>
        <Breadcrumb items={sampleItems} {...args} size="lg" />
      </div>
    </div>
  ),
};

export const Cores: Story = {
  render: (args) => {
    const colors: BreadcrumbColor[] = [
      'dark',
      'light',
      'surface',
      'white',
      'black',
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor:
                color === 'white' || color === 'light'
                  ? '#0f172a'
                  : 'transparent',
            }}
          >
            <p
              style={{
                marginBottom: '0.5rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                color:
                  color === 'white' || color === 'light'
                    ? '#ffffff'
                    : 'inherit',
              }}
            >
              {color}
            </p>
            <Breadcrumb items={sampleItems} {...args} color={color} />
          </div>
        ))}
      </div>
    );
  },
};

export const CoresDoItemAtivo: Story = {
  name: 'Cores do Item Ativo',
  render: (args) => {
    const activeColors: BreadcrumbActiveColor[] = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'dark',
      'light',
      'surface',
      'white',
      'black',
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {activeColors.map((activeColor) => (
          <div
            key={activeColor}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor:
                activeColor === 'white' || activeColor === 'light'
                  ? '#0f172a'
                  : 'transparent',
            }}
          >
            <p
              style={{
                marginBottom: '0.5rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                color:
                  activeColor === 'white' || activeColor === 'light'
                    ? '#ffffff'
                    : 'inherit',
              }}
            >
              Ativo: {activeColor}
            </p>
            <Breadcrumb
              items={sampleItems}
              {...args}
              activeColor={activeColor}
            />
          </div>
        ))}
      </div>
    );
  },
};
