import React from 'react';
import styles from './Grid.module.css';

export type GridTag = 'div' | 'ul' | 'ol' | 'nav';
export type GridSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type GridCols = number | string;
export type GridAlign = 'start' | 'end' | 'center' | 'stretch';
export type GridJustify =
  'start' | 'end' | 'center' | 'stretch' | 'space-between';

export interface GridProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Elemento ou tag HTML semântica a ser renderizada */
  as?: GridTag;
  /** Número de colunas ou definição CSS para desktop/padrão */
  cols?: GridCols;
  /** Número de colunas para telas XL (≤ 1280px / 80em) */
  colsXl?: GridCols;
  /** Número de colunas para telas LG (≤ 1024px / 64em) */
  colsLg?: GridCols;
  /** Número de colunas para telas MD (≤ 768px / 48em) */
  colsMd?: GridCols;
  /** Número de colunas para telas SM (≤ 576px / 36em) */
  colsSm?: GridCols;
  /** Largura mínima de cada item para colunas automáticas (ex: '24rem'). Sobrescreve `cols` */
  minItemWidth?: string;
  /** Espaçamento entre itens (padrão / desktop) */
  gap?: GridSpacing;
  /** Espaçamento entre itens em telas XL */
  gapXl?: GridSpacing;
  /** Espaçamento entre itens em telas LG */
  gapLg?: GridSpacing;
  /** Espaçamento entre itens em telas MD */
  gapMd?: GridSpacing;
  /** Espaçamento entre itens em telas SM */
  gapSm?: GridSpacing;
  /** Alinhamento vertical dos itens na célula */
  align?: GridAlign;
  /** Alinhamento horizontal do conteúdo das colunas */
  justify?: GridJustify;
  /** Conteúdo renderizado dentro do componente */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

const gapMap: Record<GridSpacing, string> = {
  none: '0',
  xs: 'var(--spacing-2)',
  sm: 'var(--spacing-3)',
  md: 'var(--spacing-4)',
  lg: 'var(--spacing-6)',
  xl: 'var(--spacing-8)',
  xxl: 'var(--spacing-12)',
};

function formatCols(value?: GridCols, autoWidth?: string): string | undefined {
  if (autoWidth) return `repeat(auto-fit, minmax(${autoWidth}, 1fr))`;
  if (typeof value === 'number')
    return `repeat(${String(value)}, minmax(0, 1fr))`;
  return value;
}

/**
 * O `Grid` organiza elementos filhos em uma grade bidimensional responsiva,
 * com suporte nativo a breakpoints, ajuste automático (`minItemWidth`) e tokens de espaçamento.
 */
export const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      as = 'div',
      cols = 1,
      colsXl,
      colsLg,
      colsMd,
      colsSm,
      minItemWidth,
      gap = 'md',
      gapXl,
      gapLg,
      gapMd,
      gapSm,
      align = 'stretch',
      justify = 'stretch',
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const Component = as as React.ElementType;

    const baseCols = formatCols(cols, minItemWidth);

    const dynamicStyles = {
      '--sinc-grid-cols': baseCols,
      ...(colsXl && { '--sinc-grid-cols-xl': formatCols(colsXl) }),
      ...(colsLg && { '--sinc-grid-cols-lg': formatCols(colsLg) }),
      ...(colsMd && { '--sinc-grid-cols-md': formatCols(colsMd) }),
      ...(colsSm && { '--sinc-grid-cols-sm': formatCols(colsSm) }),

      '--sinc-grid-gap': gapMap[gap],
      ...(gapXl && { '--sinc-grid-gap-xl': gapMap[gapXl] }),
      ...(gapLg && { '--sinc-grid-gap-lg': gapMap[gapLg] }),
      ...(gapMd && { '--sinc-grid-gap-md': gapMap[gapMd] }),
      ...(gapSm && { '--sinc-grid-gap-sm': gapMap[gapSm] }),

      '--sinc-grid-align': align,
      '--sinc-grid-justify': justify,

      ...style,
    } as React.CSSProperties;

    return (
      <Component
        ref={ref}
        className={`${styles.grid} ${className}`.trim()}
        style={dynamicStyles}
        {...rest}
      />
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
