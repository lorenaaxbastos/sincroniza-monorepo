import React from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import type { PaginationProps } from '@/components/Pagination';
import { cx } from '@/utils/cx';
import styles from './Table.module.css';

export type TableVariant = 'default' | 'striped' | 'bordered' | 'ghost';
export type TableSize = 'sm' | 'md' | 'lg';
export type TableMobileView = 'scroll' | 'stacked';
export type TableAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | false;

export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  /** Variante visual da tabela (padrão, zebrada, com bordas ou sem bordas) */
  variant?: TableVariant;
  /** Define se o layout da tabela é fixo (`table-layout: fixed`), distribuindo as colunas de forma igual e ativando o truncamento correto */
  isFixed?: boolean;
  /** Densidade do espaçamento interno (padding) das células */
  size?: TableSize;
  /** Define o comportamento da tabela em telas menores: rolagem horizontal ou transformação em cards verticais */
  mobileView?: TableMobileView;
  /** Adiciona um feedback visual (cor de fundo) ao passar o mouse sobre as linhas */
  hoverable?: boolean;
  /** Mantém o cabeçalho fixo no topo enquanto ocorre a rolagem vertical (requer altura máxima no container) */
  stickyHeader?: boolean;
  /** Classes CSS adicionais aplicadas ao container externo (wrapper) da tabela */
  containerClassName?: string;
  /** Estilos inline aplicados ao container externo (ex: `{ maxHeight: '300px', overflowY: 'auto' }`) */
  containerStyle?: React.CSSProperties;
  /** Classes CSS customizadas para o elemento `<table>` */
  className?: string;
  /** Conteúdo da tabela (geralmente `Table.Header` e `Table.Body`) */
  children?: React.ReactNode;
}

export interface TableHeaderProps extends React.ComponentPropsWithoutRef<'thead'> {
  /** Conteúdo do Header **/
  children?: React.ReactNode;
}

export interface TableBodyProps extends React.ComponentPropsWithoutRef<'tbody'> {
  /** Conteúdo do Body **/
  children?: React.ReactNode;
}

export interface TableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  /** Aplica um estilo de destaque permanente à linha (útil para indicar um item selecionado ou recém-adicionado) */
  highlighted?: boolean;
  /** Conteúdo da linha (Geralmente `Table.Cell`) */
  children?: React.ReactNode;
}

export interface TableCellProps extends React.ComponentPropsWithoutRef<'td'> {
  /** Transforma a célula em um cabeçalho semântico (`<th>`) ao invés de um dado de tabela (`<td>`) */
  isHeader?: boolean;
  /** Rótulo utilizado no modo mobile (`stacked`) para identificar a coluna correspondente no formato card */
  label?: string;
  /** Alinhamento horizontal do conteúdo interno da célula */
  align?: TableAlign;
  /** Oculta o texto que ultrapassar o limite da célula usando reticências (exige que a tabela tenha `isFixed={true}`) */
  truncate?: boolean;
  /** Adiciona a funcionalidade e o indicador visual de ordenação ao título do cabeçalho */
  sortable?: boolean;
  /** Estado atual da ordenação para esta coluna ('asc', 'desc' ou falso/inativo) */
  sortDirection?: SortDirection;
  /** Callback acionado ao clicar no botão de ordenação do cabeçalho */
  onSort?: () => void;
  /** Slot para inserção de um componente de filtro (ex: botões de menu ou dropdowns) ao lado do título da coluna */
  filter?: React.ReactNode;
  /** Conteúdo da célula */
  children?: React.ReactNode;
}

export interface TablePaginationProps extends Partial<PaginationProps> {
  /** Página atual selecionada */
  page: number;
  /** Total de páginas disponíveis */
  totalPages: number;
  /** Total absoluto de itens nos dados originais (usado para renderizar o texto de resumo "Exibindo X-Y de Z") */
  totalItems?: number;
  /** Quantidade de itens renderizados por página */
  pageSize?: number;
  /** Callback acionado quando o usuário interage para trocar de página */
  onChange: (page: number) => void;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      isHeader = false,
      label,
      align = 'left',
      truncate = false,
      sortable = false,
      sortDirection = false,
      onSort,
      filter,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const cellClass = cx(
      styles.cell,
      truncate && styles.cellTruncate,
      className,
    );

    const cellStyle: React.CSSProperties = {
      textAlign: align,
      ...style,
    };

    const getAccessibleSortLabel = (): string => {
      if (typeof label === 'string' && label.length > 0) return label;
      if (typeof children === 'string') return children;
      return 'coluna';
    };

    const renderHeaderContent = () => {
      if (!sortable && !filter) return children;

      return (
        <div className={styles.headerCellContent}>
          {sortable ? (
            <button
              type="button"
              onClick={onSort}
              className={styles.sortButton}
              aria-label={`Ordenar por ${getAccessibleSortLabel()}`}
            >
              <span>{children}</span>
              {sortDirection === 'asc' && <ArrowUp size={14} />}
              {sortDirection === 'desc' && <ArrowDown size={14} />}
              {!sortDirection && <ArrowUpDown size={14} opacity={0.4} />}
            </button>
          ) : (
            <span>{children}</span>
          )}

          {filter && <div className={styles.filterWrapper}>{filter}</div>}
        </div>
      );
    };

    if (isHeader) {
      const getAriaSort = (): React.AriaAttributes['aria-sort'] => {
        if (!sortable) return undefined;
        if (sortDirection === 'asc') return 'ascending';
        if (sortDirection === 'desc') return 'descending';
        return 'none';
      };

      return (
        <th
          ref={ref}
          scope="col"
          aria-sort={getAriaSort()}
          data-label={label}
          className={cellClass}
          style={cellStyle}
          {...props}
        >
          {renderHeaderContent()}
        </th>
      );
    }

    return (
      <td
        ref={ref}
        data-label={label}
        className={cellClass}
        style={cellStyle}
        {...props}
      >
        {children}
      </td>
    );
  },
);
TableCell.displayName = 'Table.Cell';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ highlighted = false, className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cx(
          styles.row,
          highlighted && styles.rowHighlighted,
          className,
        )}
        {...props}
      >
        {children}
      </tr>
    );
  },
);
TableRow.displayName = 'Table.Row';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <thead ref={ref} className={cx(styles.header, className)} {...props}>
      {children}
    </thead>
  );
});
TableHeader.displayName = 'Table.Header';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <tbody ref={ref} className={className} {...props}>
      {children}
    </tbody>
  );
});
TableBody.displayName = 'Table.Body';

export const TablePagination = React.forwardRef<
  HTMLElement,
  TablePaginationProps
>(
  (
    {
      page,
      totalPages,
      totalItems,
      pageSize = 10,
      onChange,
      variant = 'numbers',
      className,
      ...props
    },
    ref,
  ) => {
    const renderSummary = () => {
      if (!totalItems) return null;

      const start = (page - 1) * pageSize + 1;
      const end = Math.min(page * pageSize, totalItems);

      return (
        <span className={styles.summary}>
          Exibindo{' '}
          <strong>
            {start}–{end}
          </strong>{' '}
          de <strong>{totalItems}</strong> resultados
        </span>
      );
    };

    return (
      <div className={cx(styles.footer, className)}>
        <div className={styles.summaryWrapper}>{renderSummary()}</div>

        <div className={styles.paginationWrapper}>
          <Pagination
            ref={ref}
            page={page}
            totalPages={totalPages}
            onChange={onChange}
            variant={variant}
            {...props}
          />
        </div>

        <div />
      </div>
    );
  },
);
TablePagination.displayName = 'Table.Pagination';

/**
 * O componente `Table` é utilizado para organizar e exibir dados em um formato estruturado de linhas e colunas.
 * Desenvolvido de forma compositiva, ele suporta acessibilidade (WCAG), modos responsivos nativos (Scroll e Stacked Cards),
 * ordenação, filtros, cabeçalhos fixos e integração fluida com paginação.
 */
export const TableRoot = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = 'default',
      isFixed = true,
      size = 'md',
      mobileView = 'stacked',
      hoverable = true,
      stickyHeader = false,
      containerClassName,
      containerStyle,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cx(
          styles.container,
          styles[size],
          mobileView === 'stacked' && styles.stackedContainer,
          containerClassName,
        )}
        style={containerStyle}
      >
        <table
          ref={ref}
          className={cx(
            styles.table,
            styles[variant],
            isFixed && styles.fixed,
            hoverable && styles.hoverable,
            stickyHeader && styles.stickyHeader,
            mobileView === 'stacked' && styles.stackedTable,
            className,
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },
) as React.ForwardRefExoticComponent<
  TableProps & React.RefAttributes<HTMLTableElement>
> & {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  Pagination: typeof TablePagination;
};

TableRoot.displayName = 'Table';
TableRoot.Header = TableHeader;
TableRoot.Body = TableBody;
TableRoot.Row = TableRow;
TableRoot.Cell = TableCell;
TableRoot.Pagination = TablePagination;

export { TableRoot as Table };
