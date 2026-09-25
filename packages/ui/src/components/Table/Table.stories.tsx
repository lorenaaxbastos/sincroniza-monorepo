import { useState } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Filter } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { Table } from './Table';
import type { SortDirection, TableProps, TableVariant } from './Table';

type TableStoryProps = TableProps & Record<string, unknown>;

const sampleData = Array.from({ length: 25 }, (_, i) => ({
  id: `#${String(1024 + i)}`,
  name: `Usuário ${String(i + 1)}`,
  email: `usuario${String(i + 1)}@empresa.com`,
  status: i % 2 === 0 ? 'Ativo' : 'Pendente',
  role: i % 3 === 0 ? 'Admin' : 'Editor',
}));

const meta: Meta<TableStoryProps> = {
  title: 'Componentes/Table',
  component: Table,
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
    variant: 'default',
    size: 'md',
    mobileView: 'stacked',
    hoverable: true,
    stickyHeader: false,
    isFixed: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered', 'ghost'],
      table: { category: 'Propriedades (Props)' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Propriedades (Props)' },
    },
    mobileView: {
      control: 'select',
      options: ['scroll', 'stacked'],
      table: { category: 'Propriedades (Props)' },
    },
    isFixed: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    hoverable: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    stickyHeader: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    containerClassName: { table: { category: 'Propriedades (Props)' } },
    containerStyle: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-table-radius': {
      control: 'text',
      description: 'Arredondamento das bordas externas e cards mobile.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-header-text': {
      control: 'color',
      description: 'Cor do texto do cabeçalho (thead).',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-header-bg': {
      control: 'color',
      description: 'Cor de fundo do cabeçalho.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-text': {
      control: 'color',
      description: 'Cor de texto padrão das células (td).',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-bg': {
      control: 'color',
      description: 'Cor de fundo padrão das células (td).',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-row-even-bg': {
      control: 'color',
      description:
        'Cor de fundo das linhas pares (usado na variante `striped`).',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-border-color': {
      control: 'color',
      description: 'Cor das linhas divisórias / bordas.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-border-width': {
      control: 'text',
      description: 'Espessura das bordas.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-hover-bg': {
      control: 'color',
      description: 'Cor de fundo da linha no efeito de hover.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-highlight-text': {
      control: 'color',
      description: 'Cor do texto para linhas com prop `highlighted`.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-highlight-bg': {
      control: 'color',
      description: 'Cor de fundo para linhas com prop `highlighted`.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-padding-x': {
      control: 'text',
      description: 'Ajuste de espaçamento interno horizontal.',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-table-padding-y': {
      control: 'text',
      description: 'Ajuste de espaçamento interno vertical.',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.Cell isHeader>ID</Table.Cell>
          <Table.Cell isHeader>Nome</Table.Cell>
          <Table.Cell isHeader>E-mail</Table.Cell>
          <Table.Cell isHeader>Status</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleData.slice(0, 5).map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell label="ID">{row.id}</Table.Cell>
            <Table.Cell label="Nome">{row.name}</Table.Cell>
            <Table.Cell label="E-mail">{row.email}</Table.Cell>
            <Table.Cell label="Status">
              <Badge color={row.status === 'Ativo' ? 'success' : 'warning'}>
                {row.status}
              </Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Variantes: Story = {
  render: (args) => {
    const variantsList: TableVariant[] = [
      'default',
      'striped',
      'bordered',
      'ghost',
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {variantsList.map((v) => (
          <div key={v}>
            <p
              style={{
                marginBottom: '0.5rem',
                fontWeight: 600,
              }}
            >
              Variante: {v}
            </p>
            <Table {...args} variant={v}>
              <Table.Header>
                <Table.Row>
                  <Table.Cell isHeader>ID</Table.Cell>
                  <Table.Cell isHeader>Nome</Table.Cell>
                  <Table.Cell isHeader>E-mail</Table.Cell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sampleData.slice(0, 3).map((row) => (
                  <Table.Row key={row.id}>
                    <Table.Cell label="ID">{row.id}</Table.Cell>
                    <Table.Cell label="Nome">{row.name}</Table.Cell>
                    <Table.Cell label="E-mail">{row.email}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ))}
      </div>
    );
  },
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Small (sm)</p>
        <Table {...args} size="sm">
          <Table.Header>
            <Table.Row>
              <Table.Cell isHeader>ID</Table.Cell>
              <Table.Cell isHeader>Nome</Table.Cell>
              <Table.Cell isHeader>E-mail</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sampleData.slice(0, 2).map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell label="ID">{row.id}</Table.Cell>
                <Table.Cell label="Nome">{row.name}</Table.Cell>
                <Table.Cell label="E-mail">{row.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Medium (md)</p>
        <Table {...args} size="md">
          <Table.Header>
            <Table.Row>
              <Table.Cell isHeader>ID</Table.Cell>
              <Table.Cell isHeader>Nome</Table.Cell>
              <Table.Cell isHeader>E-mail</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sampleData.slice(0, 2).map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell label="ID">{row.id}</Table.Cell>
                <Table.Cell label="Nome">{row.name}</Table.Cell>
                <Table.Cell label="E-mail">{row.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Large (lg)</p>
        <Table {...args} size="lg">
          <Table.Header>
            <Table.Row>
              <Table.Cell isHeader>ID</Table.Cell>
              <Table.Cell isHeader>Nome</Table.Cell>
              <Table.Cell isHeader>E-mail</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sampleData.slice(0, 2).map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell label="ID">{row.id}</Table.Cell>
                <Table.Cell label="Nome">{row.name}</Table.Cell>
                <Table.Cell label="E-mail">{row.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  ),
};

const TableWithSort = (args: TableStoryProps) => {
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const toggleSort = () => {
    setSortDir((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  const sortedData = [...sampleData.slice(0, 5)].sort((a, b) => {
    if (!sortDir) return 0;
    return sortDir === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.Cell isHeader>ID</Table.Cell>
          <Table.Cell
            isHeader
            sortable
            sortDirection={sortDir}
            onSort={toggleSort}
            label="Nome"
          >
            Nome do cliente (clique para ordenar)
          </Table.Cell>
          <Table.Cell isHeader>E-mail</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell label="ID">{row.id}</Table.Cell>
            <Table.Cell label="Nome">{row.name}</Table.Cell>
            <Table.Cell label="E-mail">{row.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const ComOrdenacao: Story = {
  name: 'Com Ordenação',
  render: (args) => <TableWithSort {...args} />,
};

const TableWithFilter = (args: TableStoryProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  const filteredData = sampleData.filter((item) => {
    if (selectedStatus === 'todos') return true;
    return item.status.toLowerCase() === selectedStatus;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentRows = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setPage(1);
    setIsOpen(false);
  };

  return (
    <div>
      <Table {...args}>
        <Table.Header>
          <Table.Row>
            <Table.Cell isHeader>ID</Table.Cell>
            <Table.Cell isHeader>Nome</Table.Cell>
            <Table.Cell
              isHeader
              filter={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                    }}
                    aria-expanded={isOpen}
                    aria-label="Filtrar por status"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '0.2rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedStatus !== 'todos'
                          ? 'var(--color-white)'
                          : 'inherit',
                      color:
                        selectedStatus !== 'todos'
                          ? 'var(--color-primary)'
                          : 'var(--color-white)',
                      borderRadius: '0.25rem',
                    }}
                  >
                    <Filter size={14} strokeWidth={2.5} />
                  </button>

                  {isOpen && (
                    <select
                      value={selectedStatus}
                      onChange={(e) => {
                        handleStatusChange(e.target.value);
                      }}
                      style={{
                        fontSize: 'var(--font-size-ss)',
                        padding: '0.1rem 0.25rem',
                        borderRadius: '0.25rem',
                        border: '1px solid var(--color-gray-300)',
                        background: 'var(--color-white)',
                        color: 'var(--color-gray-900)',
                      }}
                    >
                      <option value="todos">Todos</option>
                      <option value="ativo">Ativo</option>
                      <option value="pendente">Pendente</option>
                    </select>
                  )}
                </div>
              }
            >
              Status
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell label="ID">{row.id}</Table.Cell>
              <Table.Cell label="Nome">{row.name}</Table.Cell>
              <Table.Cell label="Status">
                <Badge color={row.status === 'Ativo' ? 'success' : 'warning'}>
                  {row.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Table.Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onChange={(newPage) => {
          setPage(newPage);
        }}
      />
    </div>
  );
};

export const ComFiltro: Story = {
  name: 'Com Filtro',
  render: (args) => <TableWithFilter {...args} />,
};

const TableWithPagination = (args: TableStoryProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalItems = sampleData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const currentRows = sampleData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <Table {...args}>
        <Table.Header>
          <Table.Row>
            <Table.Cell isHeader>ID</Table.Cell>
            <Table.Cell isHeader>Nome</Table.Cell>
            <Table.Cell isHeader>E-mail</Table.Cell>
            <Table.Cell isHeader>Status</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell label="ID">{row.id}</Table.Cell>
              <Table.Cell label="Nome">{row.name}</Table.Cell>
              <Table.Cell label="E-mail">{row.email}</Table.Cell>
              <Table.Cell label="Status">
                <Badge color={row.status === 'Ativo' ? 'success' : 'warning'}>
                  {row.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Table.Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onChange={(newPage) => {
          setPage(newPage);
        }}
      />
    </div>
  );
};

export const ComPaginacaoEResumo: Story = {
  name: 'Com Paginação E Resumo',
  render: (args) => <TableWithPagination {...args} />,
};

export const LinhaDestacada: Story = {
  name: 'Linha Destacada',
  render: (args) => (
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.Cell isHeader>ID</Table.Cell>
          <Table.Cell isHeader>Nome</Table.Cell>
          <Table.Cell isHeader>Cargo</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell label="ID">#1024</Table.Cell>
          <Table.Cell label="Nome">Maria Silva</Table.Cell>
          <Table.Cell label="Cargo">Admin</Table.Cell>
        </Table.Row>
        <Table.Row highlighted>
          <Table.Cell label="ID">#1025</Table.Cell>
          <Table.Cell label="Nome">João Pedro (Linha Selecionada)</Table.Cell>
          <Table.Cell label="Cargo">Editor</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const CabecalhoFixo: Story = {
  name: 'Cabeçalho Fixo (Sticky Header)',
  args: {
    stickyHeader: true,
  },
  render: (args) => (
    <Table {...args} containerStyle={{ maxHeight: '240px', overflowY: 'auto' }}>
      <Table.Header>
        <Table.Row>
          <Table.Cell isHeader>ID</Table.Cell>
          <Table.Cell isHeader>Nome</Table.Cell>
          <Table.Cell isHeader>E-mail</Table.Cell>
          <Table.Cell isHeader>Status</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleData.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell label="ID">{row.id}</Table.Cell>
            <Table.Cell label="Nome">{row.name}</Table.Cell>
            <Table.Cell label="E-mail">{row.email}</Table.Cell>
            <Table.Cell label="Status">
              <Badge color={row.status === 'Ativo' ? 'success' : 'warning'}>
                {row.status}
              </Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const LayoutColunas: Story = {
  name: 'Layout De Colunas',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Auto (ajusta à largura do conteúdo)
        </p>
        <Table {...args} isFixed={false}>
          <Table.Header>
            <Table.Row>
              <Table.Cell isHeader>ID</Table.Cell>
              <Table.Cell isHeader>Nome</Table.Cell>
              <Table.Cell isHeader>Descrição longa</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell label="ID">#1024</Table.Cell>
              <Table.Cell label="Nome">Ana</Table.Cell>
              <Table.Cell label="Descrição" truncate>
                Texto extremamente longo que expande a coluna no layout fluido
                automático.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
          Fixed (colunas com larguras iguais e truncamento efetivo)
        </p>
        <Table {...args} isFixed>
          <Table.Header>
            <Table.Row>
              <Table.Cell isHeader>ID</Table.Cell>
              <Table.Cell isHeader>Nome</Table.Cell>
              <Table.Cell isHeader>Descrição longa</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell label="ID">#1024</Table.Cell>
              <Table.Cell label="Nome">Ana</Table.Cell>
              <Table.Cell label="Descrição" truncate>
                Texto extremamente longo que é cortado com reticências porque as
                colunas têm distribuição proporcional fixa.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  ),
};
