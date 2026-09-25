import React from 'react';
import { cx } from '@/utils/cx';
import styles from './EmptyState.module.css';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateAlign = 'center' | 'left';

export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  /** Ícone ou elemento ilustrativo exibido no topo ou início do estado vazio */
  icon?: React.ReactNode;
  /** Título principal do estado vazio */
  title?: React.ReactNode;
  /** Texto descritivo detalhando o contexto ou orientando a próxima ação do usuário */
  description?: React.ReactNode;
  /** Elemento acionável principal (geralmente um Button) */
  action?: React.ReactNode;
  /** Escala visual do componente (dimensões de ícone, padding e tipografia) */
  size?: EmptyStateSize;
  /** Alinhamento horizontal do conteúdo */
  align?: EmptyStateAlign;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo filho customizado opcional */
  children?: React.ReactNode;
}

/**
 * O `EmptyState` orienta o usuário quando não há dados a serem exibidos em uma tela,
 * tabela ou lista, fornecendo feedback visual e ações de recuperação.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      size = 'md',
      align = 'center',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cx(styles.root, styles[size], styles[align], className)}
        {...props}
      >
        {icon && <div className={styles.iconWrapper}>{icon}</div>}

        {(title ?? description) && (
          <div className={styles.content}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}

        {action && <div className={styles.actionWrapper}>{action}</div>}
        {children}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
