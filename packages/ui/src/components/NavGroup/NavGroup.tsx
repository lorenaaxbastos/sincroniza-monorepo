import React from 'react';
import styles from './NavGroup.module.css';

export type NavGroupSpacing =
  'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;

export type NavGroupDirection = 'column' | 'row';
export type NavGroupAlign =
  'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type NavGroupJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface NavGroupProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
> {
  /** Título do grupo de navegação */
  title?: React.ReactNode;
  /** Orientação dos links dentro do grupo ('column' ou 'row') */
  direction?: NavGroupDirection;
  /** Espaçamento entre os links da lista */
  gap?: NavGroupSpacing;
  /** Alinhamento dos itens na lista (align-items) */
  align?: NavGroupAlign;
  /** Distribuição dos itens na lista (justify-content) */
  justify?: NavGroupJustify;
  /** Classes CSS adicionais */
  className?: string;
  /** Links de navegação (`NavLink`) que compõem o grupo */
  children?: React.ReactNode;
}

const SPACING_MAP: Record<Exclude<NavGroupSpacing, number>, string> = {
  none: '0',
  xs: 'var(--spacing-1)',
  sm: 'var(--spacing-2)',
  md: 'var(--spacing-3)',
  lg: 'var(--spacing-4)',
  xl: 'var(--spacing-6)',
  xxl: 'var(--spacing-8)',
};

/**
 * O `NavGroup` organiza logicamente um conjunto de links de navegação (`NavLink`)
 * sob um título opcional, gerenciando o espaçamento, a orientação e a semântica de lista (`<ul>`).
 */
export const NavGroup = React.forwardRef<HTMLDivElement, NavGroupProps>(
  (
    {
      title,
      direction = 'column',
      gap,
      align,
      justify,
      className = '',
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const isRow = direction === 'row';

    const defaultGap = gap ?? (isRow ? 'md' : 'xs');
    const defaultAlign = align ?? (isRow ? 'center' : 'stretch');
    const defaultJustify = justify ?? (isRow ? 'center' : 'flex-start');

    const resolvedGap =
      typeof defaultGap === 'number'
        ? `${String(defaultGap)}px`
        : SPACING_MAP[defaultGap] || 'var(--spacing-2)';

    const customStyles = {
      '--_direction': direction,
      '--_gap': resolvedGap,
      '--_align': defaultAlign,
      '--_justify': defaultJustify,
      '--_wrap': isRow ? 'wrap' : 'nowrap',
      ...style,
    } as React.CSSProperties;

    const classNames = [styles.navGroup, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} style={customStyles} {...rest}>
        {title && <span className={styles.title}>{title}</span>}
        <ul className={styles.list}>{children}</ul>
      </div>
    );
  },
);

NavGroup.displayName = 'NavGroup';

export default NavGroup;
