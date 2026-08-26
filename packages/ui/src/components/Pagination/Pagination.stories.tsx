import { useState } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import type { PaginationColor, PaginationProps } from './Pagination';

type PaginationStoryProps = PaginationProps & Record<string, unknown>;

/**
 * O `Pagination` é utilizado para dividir grandes coleções de dados ou tabelas em múltiplas páginas.
 * Oferece suporte a navegação por números de página com reticências automáticas ou layout compacto simplificado.
 */
const meta: Meta<PaginationStoryProps> = {
  title: 'Componentes/Pagination',
  component: Pagination,
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
    page: 1,
    totalPages: 10,
    variant: 'numbers',
    color: 'primary',
    size: 'md',
    isDisabled: false,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstLast: false,
  },
  argTypes: {
    page: { table: { category: 'Propriedades (Props)' } },
    totalPages: { table: { category: 'Propriedades (Props)' } },
    variant: {
      control: 'select',
      options: ['numbers', 'simple'],
      table: { category: 'Propriedades (Props)' },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'dark',
        'light',
        'black',
        'white',
        'surface',
      ],
      table: { category: 'Propriedades (Props)' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Propriedades (Props)' },
    },
    isDisabled: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    siblingCount: {
      control: 'number',
      table: { category: 'Propriedades (Props)' },
    },
    boundaryCount: {
      control: 'number',
      table: { category: 'Propriedades (Props)' },
    },
    showFirstLast: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    buttonProps: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    onChange: { table: { disable: true } },
    '--sinc-pagination-size': {
      control: 'text',
      description: 'Tamanho dos botões da paginação',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationDemo = (args: Partial<PaginationProps>) => {
  const [currentPage, setCurrentPage] = useState<number>(args.page ?? 1);
  const totalPages = args.totalPages ?? 10;

  return (
    <Pagination
      {...args}
      page={currentPage}
      totalPages={totalPages}
      onChange={(newPage) => {
        setCurrentPage(newPage);
        args.onChange?.(newPage);
      }}
    />
  );
};

export const Padrao: Story = {
  render: (args) => <PaginationDemo {...args} />,
};

export const Variantes: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Variante Números (Padrão)
        </p>
        <PaginationDemo {...args} variant="numbers" />
      </div>
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Variante Simplificada
        </p>
        <PaginationDemo {...args} variant="simple" />
      </div>
    </div>
  ),
};

export const ComAtalhosInicioFim: Story = {
  name: 'Com Atalhos (Início / Fim)',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Números com Atalhos
        </p>
        <PaginationDemo
          {...args}
          showFirstLast
          totalPages={20}
          page={5}
          variant="numbers"
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Simplificada com Atalhos
        </p>
        <PaginationDemo
          {...args}
          showFirstLast
          totalPages={20}
          page={5}
          variant="simple"
        />
      </div>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Pequeno (sm - 32px)
        </p>
        <PaginationDemo {...args} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Médio (md - 36px - Padrão)
        </p>
        <PaginationDemo {...args} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Grande (lg - 40px)
        </p>
        <PaginationDemo {...args} size="lg" />
      </div>
    </div>
  ),
};

export const Cores: Story = {
  render: (args) => {
    const colors: PaginationColor[] = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'dark',
      'light',
      'black',
      'white',
      'surface',
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        {colors.map((color) => (
          <div key={color}>
            <p
              style={{
                marginBottom: '0.5rem',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {color}
            </p>
            <PaginationDemo {...args} color={color} page={2} />
          </div>
        ))}
      </div>
    );
  },
};

export const Desabilitado: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Números Desabilitado
        </p>
        <PaginationDemo
          {...args}
          isDisabled
          variant="numbers"
          page={3}
          totalPages={10}
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>
          Simplificado Desabilitado
        </p>
        <PaginationDemo
          {...args}
          isDisabled
          variant="simple"
          page={3}
          totalPages={10}
        />
      </div>
    </div>
  ),
};
