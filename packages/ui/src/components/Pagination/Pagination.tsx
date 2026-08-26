import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/Button';
import type { ButtonProps, ButtonSize } from '@/components/Button';
import { cx } from '@/utils/cx';
import styles from './Pagination.module.css';
import { usePagination } from './usePagination';

export type PaginationVariant = 'numbers' | 'simple';

export type PaginationColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'dark'
  | 'light'
  | 'black'
  | 'white'
  | 'surface';

export interface PaginationProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'onChange'
> {
  /** Página atual selecionada (1-indexed) */
  page: number;
  /** Total de páginas disponíveis */
  totalPages: number;
  /** Callback acionado ao alterar a página */
  onChange?: (page: number) => void;
  /** Variante visual de layout */
  variant?: PaginationVariant;
  /** Cor do botão da página ativa (numbers) ou dos botões direcionais (simple) */
  color?: PaginationColor;
  /** Tamanho dos botões de navegação */
  size?: ButtonSize;
  /** Desabilita a navegação de todas as páginas */
  isDisabled?: boolean;
  /** Quantidade de páginas vizinhas visíveis ao lado da página ativa */
  siblingCount?: number;
  /** Quantidade de páginas fixas visíveis no início e no fim */
  boundaryCount?: number;
  /** Exibe botões de atalho para a primeira e última página */
  showFirstLast?: boolean;
  /** Props adicionais repassadas aos botões da paginação */
  buttonProps?: Partial<Omit<ButtonProps, 'onClick' | 'children'>>;
}

/**
 * O `Pagination` é utilizado para dividir grandes coleções de dados ou tabelas em múltiplas páginas.
 * Oferece suporte a navegação por números de página com reticências automáticas ou layout compacto simplificado.
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onChange,
      variant = 'numbers',
      color = 'primary',
      size = 'md',
      isDisabled = false,
      siblingCount = 1,
      boundaryCount = 1,
      showFirstLast = false,
      buttonProps,
      className,
      ...props
    },
    ref,
  ) => {
    const safePage = Math.max(1, Math.min(page, totalPages || 1));
    const isFirstPage = safePage <= 1;
    const isLastPage = safePage >= totalPages;

    const handlePageChange = (newPage: number) => {
      if (
        isDisabled ||
        newPage === safePage ||
        newPage < 1 ||
        newPage > totalPages
      ) {
        return;
      }
      onChange?.(newPage);
    };

    const paginationRange = usePagination({
      totalPages,
      page: safePage,
      siblingCount,
      boundaryCount,
    });

    if (totalPages <= 0) return null;

    const pageButtonClass = cx(
      styles.pageButton,
      styles[size],
      buttonProps?.className,
    );

    if (variant === 'simple') {
      return (
        <nav
          ref={ref}
          aria-label="Paginação"
          className={cx(styles.nav, className)}
          {...props}
        >
          <div className={styles.simpleContainer}>
            <div className={styles.simpleBtnGroup}>
              {showFirstLast && (
                <Button
                  {...buttonProps}
                  variant="outline"
                  color={color}
                  size={size}
                  disabled={isDisabled || isFirstPage}
                  aria-label="Ir para a primeira página"
                  onClick={() => {
                    handlePageChange(1);
                  }}
                >
                  <ChevronsLeft size={16} />
                  Início
                </Button>
              )}

              <Button
                {...buttonProps}
                variant="outline"
                color={color}
                size={size}
                disabled={isDisabled || isFirstPage}
                aria-label="Ir para a página anterior"
                onClick={() => {
                  handlePageChange(safePage - 1);
                }}
              >
                <ChevronLeft size={16} />
                Anterior
              </Button>
            </div>

            <span className={styles.simpleText}>
              Página {safePage} de {totalPages}
            </span>

            <div className={styles.simpleBtnGroup}>
              <Button
                {...buttonProps}
                variant="outline"
                color={color}
                size={size}
                disabled={isDisabled || isLastPage}
                aria-label="Ir para a próxima página"
                onClick={() => {
                  handlePageChange(safePage + 1);
                }}
              >
                Próximo
                <ChevronRight size={16} />
              </Button>

              {showFirstLast && (
                <Button
                  {...buttonProps}
                  variant="outline"
                  color={color}
                  size={size}
                  disabled={isDisabled || isLastPage}
                  aria-label="Ir para a última página"
                  onClick={() => {
                    handlePageChange(totalPages);
                  }}
                >
                  <ChevronsRight size={16} />
                  Fim
                </Button>
              )}
            </div>
          </div>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        aria-label="Paginação"
        className={cx(styles.nav, className)}
        {...props}
      >
        <ul className={styles.list}>
          {showFirstLast && (
            <li className={styles.item}>
              <Button
                {...buttonProps}
                variant="ghost"
                color="dark"
                size={size}
                isIconOnly
                isPill
                className={pageButtonClass}
                disabled={isDisabled || isFirstPage}
                aria-label="Ir para a primeira página"
                onClick={() => {
                  handlePageChange(1);
                }}
              >
                <ChevronsLeft size={16} />
              </Button>
            </li>
          )}

          <li className={styles.item}>
            <Button
              {...buttonProps}
              variant="ghost"
              color="dark"
              size={size}
              isIconOnly
              isPill
              className={pageButtonClass}
              disabled={isDisabled || isFirstPage}
              aria-label="Ir para a página anterior"
              onClick={() => {
                handlePageChange(safePage - 1);
              }}
            >
              <ChevronLeft size={16} />
            </Button>
          </li>

          {paginationRange.map((item, index) => {
            if (typeof item === 'string') {
              return (
                <li key={`${item}-${String(index)}`} className={styles.item}>
                  <span className={styles.dots} aria-hidden="true">
                    <MoreHorizontal size={16} />
                  </span>
                </li>
              );
            }

            const isActive = item === safePage;

            return (
              <li key={item} className={styles.item}>
                <Button
                  {...buttonProps}
                  variant={isActive ? 'solid' : 'ghost'}
                  color={isActive ? color : 'dark'}
                  size={size}
                  isIconOnly
                  isPill
                  className={pageButtonClass}
                  disabled={isDisabled}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={
                    isActive
                      ? `Página ${String(item)}, atual`
                      : `Ir para a página ${String(item)}`
                  }
                  onClick={() => {
                    handlePageChange(item);
                  }}
                >
                  {item}
                </Button>
              </li>
            );
          })}

          <li className={styles.item}>
            <Button
              {...buttonProps}
              variant="ghost"
              color="dark"
              size={size}
              isIconOnly
              isPill
              className={pageButtonClass}
              disabled={isDisabled || isLastPage}
              aria-label="Ir para a próxima página"
              onClick={() => {
                handlePageChange(safePage + 1);
              }}
            >
              <ChevronRight size={16} />
            </Button>
          </li>

          {showFirstLast && (
            <li className={styles.item}>
              <Button
                {...buttonProps}
                variant="ghost"
                color="dark"
                size={size}
                isIconOnly
                isPill
                className={pageButtonClass}
                disabled={isDisabled || isLastPage}
                aria-label="Ir para a última página"
                onClick={() => {
                  handlePageChange(totalPages);
                }}
              >
                <ChevronsRight size={16} />
              </Button>
            </li>
          )}
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
