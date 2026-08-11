import React from 'react';
import styles from './Stack.module.css';

export type StackTag = 'div' | 'section' | 'ul' | 'ol' | 'nav' | 'article';
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type StackDirection =
  'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackAlign =
  'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type StackJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type StackWrap = boolean | 'wrap' | 'nowrap' | 'wrap-reverse';

export interface StackProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Elemento ou tag HTML semântica a ser renderizada */
  as?: StackTag;
  /** Direção do fluxo flex (padrão / desktop) */
  direction?: StackDirection;
  /** Direção do fluxo em telas XL (≤ 1280px / 80em) */
  directionXl?: StackDirection;
  /** Direção do fluxo em telas LG (≤ 1024px / 64em) */
  directionLg?: StackDirection;
  /** Direção do fluxo em telas MD (≤ 768px / 48em) */
  directionMd?: StackDirection;
  /** Direção do fluxo em telas SM (≤ 576px / 36em) */
  directionSm?: StackDirection;
  /** Espaçamento entre os elementos (padrão / desktop) */
  gap?: StackSpacing;
  /** Espaçamento entre os elementos em telas XL */
  gapXl?: StackSpacing;
  /** Espaçamento entre os elementos em telas LG */
  gapLg?: StackSpacing;
  /** Espaçamento entre os elementos em telas MD */
  gapMd?: StackSpacing;
  /** Espaçamento entre os elementos em telas SM */
  gapSm?: StackSpacing;
  /** Alinhamento no eixo secundário (align-items) */
  align?: StackAlign;
  /** Alinhamento no eixo principal (justify-content) */
  justify?: StackJustify;
  /** Permite que os itens quebrem linha quando não couberem no container */
  wrap?: StackWrap;
  /** Conteúdo renderizado dentro do componente */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

const gapMap: Record<StackSpacing, string> = {
  none: '0',
  xs: 'var(--spacing-2)',
  sm: 'var(--spacing-3)',
  md: 'var(--spacing-4)',
  lg: 'var(--spacing-6)',
  xl: 'var(--spacing-8)',
  xxl: 'var(--spacing-12)',
};

/**
 * O `Stack` organiza elementos filhos unidimensionalmente (linha ou coluna) usando Flexbox,
 * com suporte nativo a breakpoints responsivos, alinhamentos e tokens de espaçamento.
 */
export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      as = 'div',
      direction = 'row',
      directionXl,
      directionLg,
      directionMd,
      directionSm,
      gap = 'md',
      gapXl,
      gapLg,
      gapMd,
      gapSm,
      align = 'stretch',
      justify = 'flex-start',
      wrap = false,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const Component = as as React.ElementType;

    const wrapValue =
      typeof wrap === 'boolean' ? (wrap ? 'wrap' : 'nowrap') : wrap;

    const dynamicStyles = {
      '--sinc-stack-dir': direction,
      ...(directionXl && { '--sinc-stack-dir-xl': directionXl }),
      ...(directionLg && { '--sinc-stack-dir-lg': directionLg }),
      ...(directionMd && { '--sinc-stack-dir-md': directionMd }),
      ...(directionSm && { '--sinc-stack-dir-sm': directionSm }),

      '--sinc-stack-gap': gapMap[gap],
      ...(gapXl && { '--sinc-stack-gap-xl': gapMap[gapXl] }),
      ...(gapLg && { '--sinc-stack-gap-lg': gapMap[gapLg] }),
      ...(gapMd && { '--sinc-stack-gap-md': gapMap[gapMd] }),
      ...(gapSm && { '--sinc-stack-gap-sm': gapMap[gapSm] }),

      '--sinc-stack-align': align,
      '--sinc-stack-justify': justify,
      '--sinc-stack-wrap': wrapValue,

      ...style,
    } as React.CSSProperties;

    return (
      <Component
        ref={ref}
        className={`${styles.stack} ${className}`.trim()}
        style={dynamicStyles}
        {...rest}
      />
    );
  },
);

Stack.displayName = 'Stack';

export default Stack;
