import React from 'react';
import styles from './Container.module.css';

export type ContainerTag = 'div' | 'nav';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';

export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Elemento ou tag HTML semântica a ser renderizada */
  as?: ContainerTag;
  /** Largura máxima predefinida do contêiner */
  size?: ContainerSize;
  /** Espaçamento interno horizontal predefinido */
  padding?: ContainerPadding;
  /** Habilita suporte a CSS Container Queries no elemento */
  isContainerQuery?: boolean;
  /** Classes CSS adicionais aplicadas ao contêiner */
  className?: string;
}

/**
 * O `Container` centraliza e limita a largura máxima do conteúdo na tela,
 * garantindo margens e paddings horizontais consistentes em diferentes resoluções.
 */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (
    {
      as = 'div',
      size = 'xl',
      padding = 'md',
      isContainerQuery = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const sizeClass = styles[`size-${size}`];
    const paddingClass = styles[`padding-${padding}`];
    const queryClass = isContainerQuery ? styles.isContainerQuery : '';

    const classNames = [
      styles.container,
      sizeClass,
      paddingClass,
      queryClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const Component = as as React.ElementType;

    return <Component ref={ref} className={classNames} {...rest} />;
  },
);

Container.displayName = 'Container';

export default Container;
