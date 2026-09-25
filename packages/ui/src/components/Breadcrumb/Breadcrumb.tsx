import React from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { Link } from '@/components/Link';
import { Stack } from '@/layouts/Stack';
import { cx } from '@/utils/cx';
import styles from './Breadcrumb.module.css';

export type BreadcrumbColor = 'dark' | 'light' | 'surface' | 'white' | 'black';

export type BreadcrumbActiveColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'dark'
  | 'light'
  | 'surface'
  | 'white'
  | 'black';

export type BreadcrumbSize = 'sm' | 'md' | 'lg';

export interface BreadcrumbItemData {
  /** Rótulo textual do nível da trilha */
  label: React.ReactNode;
  /** URL de destino do link */
  href?: string;
  /** Ícone exibido antes do rótulo */
  icon?: React.ReactNode;
  /** Define explicitamente se o item é a página atual */
  isCurrentPage?: boolean;
}

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  /** Lista ordenada dos itens da trilha de navegação */
  items: BreadcrumbItemData[];
  /** Elemento separador entre os itens */
  separator?: React.ReactNode;
  /** Esquema de cores dos links passados */
  color?: BreadcrumbColor;
  /** Esquema de cor da página atual (ativa) */
  activeColor?: BreadcrumbActiveColor;
  /** Tamanho tipográfico e dos ícones */
  size?: BreadcrumbSize;
  /** Quantidade máxima de itens visíveis antes de colapsar */
  maxItems?: number;
  /** Quantidade de itens mantidos no início ao colapsar */
  itemsBeforeCollapse?: number;
  /** Quantidade de itens mantidos no final ao colapsar */
  itemsAfterCollapse?: number;
  /** Classes CSS adicionais */
  className?: string;
}

type InternalBreadcrumbItem =
  | (BreadcrumbItemData & { isEllipsis?: false })
  | { isEllipsis: true; label: string };

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator,
      color = 'dark',
      activeColor = 'primary',
      size = 'md',
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      className,
      ...props
    },
    ref,
  ) => {
    if (items.length === 0) return null;

    const effectiveSeparator = separator ?? <ChevronRight size={14} />;

    const getDisplayItems = (): InternalBreadcrumbItem[] => {
      if (
        !maxItems ||
        items.length <= maxItems ||
        items.length <= itemsBeforeCollapse + itemsAfterCollapse
      ) {
        return items;
      }

      const before = items.slice(0, itemsBeforeCollapse);
      const after = items.slice(items.length - itemsAfterCollapse);

      return [
        ...before,
        { isEllipsis: true, label: 'Itens ocultos' },
        ...after,
      ];
    };

    const displayItems = getDisplayItems();

    return (
      <nav
        ref={ref}
        aria-label="Trilha de navegação"
        className={cx(
          styles.nav,
          styles[color],
          styles[`active-${activeColor}`],
          styles[size],
          className,
        )}
        {...props}
      >
        <Stack
          as="ol"
          align="center"
          direction="row"
          gap="xs"
          wrap="wrap"
          className={styles.list}
        >
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isCurrent =
              !item.isEllipsis && (item.isCurrentPage ?? isLast);

            return (
              <React.Fragment key={index}>
                <li className={styles.item}>
                  {item.isEllipsis ? (
                    <span
                      className={styles.ellipsis}
                      aria-label={item.label}
                      role="img"
                    >
                      <MoreHorizontal size={16} />
                    </span>
                  ) : isCurrent || !item.href ? (
                    <span
                      className={cx(styles.itemContent, styles.currentPage)}
                      aria-current="page"
                    >
                      {item.icon}
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      color="inherit"
                      underline="hover"
                      className={styles.link}
                    >
                      <span className={styles.itemContent}>
                        {item.icon}
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>

                {!isLast && (
                  <li className={styles.separator} aria-hidden="true">
                    {effectiveSeparator}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </Stack>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
