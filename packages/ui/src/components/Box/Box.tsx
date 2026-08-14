import React from 'react';
import styles from './Box.module.css';

export type BoxTag = 'div' | 'section' | 'article' | 'fieldset';

export type BoxVariant = 'solid' | 'subtle' | 'outline';

export type BoxColor =
  | 'transparent'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'light'
  | 'dark'
  | 'white'
  | 'black'
  | 'surface';

export type BoxRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type BoxShadow = 'none' | 'sm' | 'md' | 'lg';
export type BoxSpacing =
  'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;

export interface BoxProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'color'
> {
  /** Tag HTML semântica que será renderizada */
  as?: BoxTag;
  /** Variante visual do contêiner */
  variant?: BoxVariant;
  /** Esquema de cores base */
  color?: BoxColor;
  /** Exibe borda visível ao redor do contêiner */
  border?: boolean;
  /** Arredondamento das bordas */
  radius?: BoxRadius;
  /** Nível de sombra de elevação */
  shadow?: BoxShadow;
  /** Espaçamento interno em todas as direções */
  padding?: BoxSpacing;
  /** Espaçamento interno vertical (top/bottom) */
  paddingBlock?: BoxSpacing;
  /** Espaçamento interno horizontal (left/right) */
  paddingInline?: BoxSpacing;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo interno do contêiner */
  children?: React.ReactNode;
}

const SPACING_MAP: Record<Exclude<BoxSpacing, number>, string> = {
  none: '0',
  xs: 'var(--spacing-2)',
  sm: 'var(--spacing-3)',
  md: 'var(--spacing-4)',
  lg: 'var(--spacing-6)',
  xl: 'var(--spacing-8)',
  xxl: 'var(--spacing-12)',
};

const resolveSpacing = (value?: BoxSpacing): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${String(value)}px`;
  return SPACING_MAP[value];
};

/**
 * O `Box` é o contêiner fundamental de layout para agrupamento visual
 * e superfícies elevado com suporte a bordas, variantes e sombras.
 */
export const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Tag = 'div',
      variant = 'solid',
      color = 'transparent',
      border = false,
      radius = 'md',
      shadow = 'none',
      padding = 'lg',
      paddingBlock,
      paddingInline,
      className = '',
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const Component = Tag as React.ElementType;

    const resolvedPadding = resolveSpacing(padding);
    const resolvedPaddingBlock = resolveSpacing(paddingBlock);
    const resolvedPaddingInline = resolveSpacing(paddingInline);

    const customStyle: React.CSSProperties = {
      ...(resolvedPadding && { '--_padding': resolvedPadding }),
      ...(resolvedPaddingBlock && { '--_padding-block': resolvedPaddingBlock }),
      ...(resolvedPaddingInline && {
        '--_padding-inline': resolvedPaddingInline,
      }),
      ...style,
    };

    const classNames = [
      styles.box,
      styles[variant],
      styles[color],
      styles[`radius-${radius}`],
      styles[`shadow-${shadow}`],
      border && styles.hasBorder,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={classNames} style={customStyle} {...rest}>
        {children}
      </Component>
    );
  },
);

Box.displayName = 'Box';

export default Box;
