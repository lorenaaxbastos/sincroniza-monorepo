import React, { createContext, useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { cx } from '@/utils/cx';
import styles from './List.module.css';

export type ListTag = 'ul' | 'ol';
export type UnorderedVariant = 'disc' | 'circle' | 'square' | 'icon' | 'none';
export type OrderedVariant =
  | 'decimal'
  | 'decimal-leading-zero'
  | 'lower-roman'
  | 'upper-roman'
  | 'lower-alpha'
  | 'upper-alpha'
  | 'none';

export type ListVariant = UnorderedVariant | OrderedVariant;
export type OrderedMarkerVariant = 'ghost' | 'solid';
export type ListSize = 'sm' | 'md' | 'lg';
export type ListSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export interface ListItemData {
  /** Rótulo textual ou elemento principal */
  label: React.ReactNode;
  /** Título opcional em destaque */
  title?: React.ReactNode;
  /** Ícone opcional para o item */
  icon?: React.ReactNode;
  /** Sublista aninhada opcional */
  items?: ListItemData[];
}

interface ListContextValue {
  as: ListTag;
  variant: ListVariant;
  markerVariant: OrderedMarkerVariant;
  size: ListSize;
  icon?: React.ReactNode;
  itemCounter: { current: number };
}

const ListContext = createContext<ListContextValue | null>(null);

export interface ListItemProps extends Omit<
  React.ComponentPropsWithoutRef<'li'>,
  'title'
> {
  /** Ícone customizado que substitui o marcador do item */
  icon?: React.ReactNode;
  /** Valor sequencial numérico ou textual customizado */
  value?: number | string;
  /** Título em destaque para o item */
  title?: React.ReactNode;
  /** Conteúdo do item */
  children?: React.ReactNode;
}

export interface ListProps extends React.ComponentPropsWithoutRef<'ul'> {
  /** Elemento HTML semântico da lista ('ul' ou 'ol') */
  as?: ListTag;
  /** Tipo visual do marcador sequencial ou simbólico */
  variant?: ListVariant;
  /** Estilo do container do marcador ('ghost' para simples ou 'solid' para fundo preenchido) */
  markerVariant?: OrderedMarkerVariant;
  /** Ícone padrão quando a variante for 'icon' em 'ul' */
  icon?: React.ReactNode;
  /** Lista de dados para renderização automática */
  items?: ListItemData[];
  /** Tamanho da tipografia e dos marcadores */
  size?: ListSize;
  /** Espaçamento vertical entre os itens */
  spacing?: ListSpacing;
  /** Adiciona linhas divisórias entre os itens */
  hasDividers?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo interno da lista */
  children?: React.ReactNode;
}

const toRoman = (num: number): string => {
  const lookup: Record<string, number> = {
    m: 1000,
    cm: 900,
    d: 500,
    cd: 400,
    c: 100,
    xc: 90,
    l: 50,
    xl: 40,
    x: 10,
    ix: 9,
    v: 5,
    iv: 4,
    i: 1,
  };
  let roman = '';
  let n = num;
  for (const i in lookup) {
    while (n >= lookup[i]) {
      roman += i;
      n -= lookup[i];
    }
  }
  return roman;
};

const toAlpha = (num: number): string => {
  return String.fromCharCode(96 + ((num - 1) % 26) + 1);
};

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ icon, value, title, children, className, ...props }, ref) => {
    const context = useContext(ListContext);

    const isOrdered = context?.as === 'ol';
    const effectiveVariant =
      context?.variant ?? (isOrdered ? 'decimal' : 'disc');
    const effectiveMarkerVariant = context?.markerVariant ?? 'ghost';
    const effectiveIcon = icon ?? context?.icon ?? <ChevronRight size={16} />;

    let itemValue = value;
    if (itemValue === undefined && context) {
      context.itemCounter.current += 1;
      itemValue = context.itemCounter.current;
    }

    const renderMarker = () => {
      if (effectiveVariant === 'none') return null;

      if (!isOrdered) {
        if (effectiveVariant === 'icon' || icon) {
          return (
            <span className={styles.iconMarker} aria-hidden="true">
              {effectiveIcon}
            </span>
          );
        }

        return (
          <span
            className={cx(
              styles.bulletMarker,
              effectiveVariant === 'circle' && styles.circleMarker,
              effectiveVariant === 'square' && styles.squareMarker,
            )}
            aria-hidden="true"
          />
        );
      }

      const numVal = Number(itemValue) || 1;
      let textContent = '';

      switch (effectiveVariant) {
        case 'decimal':
          textContent = `${String(itemValue)}.`;
          break;
        case 'decimal-leading-zero':
          textContent = `${String(itemValue).padStart(2, '0')}.`;
          break;
        case 'lower-roman':
          textContent = `${toRoman(numVal)}.`;
          break;
        case 'upper-roman':
          textContent = `${toRoman(numVal).toUpperCase()}.`;
          break;
        case 'lower-alpha':
          textContent = `${toAlpha(numVal)}.`;
          break;
        case 'upper-alpha':
          textContent = `${toAlpha(numVal).toUpperCase()}.`;
          break;
      }

      return (
        <span
          className={cx(styles.marker, styles[effectiveMarkerVariant])}
          aria-hidden="true"
        >
          {textContent}
        </span>
      );
    };

    return (
      <li ref={ref} className={cx(styles.item, className)} {...props}>
        {renderMarker()}
        <div className={styles.content}>
          {title && <span className={styles.title}>{title}</span>}
          {children}
        </div>
      </li>
    );
  },
);

ListItem.displayName = 'List.Item';

/**
 * O `List` organiza itens relacionados de forma ordenada (`ol`) ou não ordenada (`ul`),
 * oferecendo suporte a marcadores nativos, ícones, estrutura via dados (`items`),
 * composição com filhos (`children`) e controle via variáveis públicas CSS.
 */
export const List = React.forwardRef<HTMLElement, ListProps>(
  (
    {
      as = 'ul',
      variant,
      markerVariant = 'ghost',
      icon,
      size = 'md',
      spacing = 'sm',
      hasDividers = false,
      items,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as as React.ElementType;
    const itemCounter = { current: 0 };
    const defaultVariant = as === 'ol' ? 'decimal' : 'disc';
    const effectiveVariant = variant ?? defaultVariant;

    return (
      <ListContext.Provider
        value={{
          as,
          variant: effectiveVariant,
          markerVariant: as === 'ul' ? 'ghost' : markerVariant,
          size,
          icon,
          itemCounter,
        }}
      >
        <Component
          ref={ref}
          className={cx(
            styles.list,
            styles[size],
            styles[`spacing-${spacing}`],
            hasDividers && styles.hasDividers,
            className,
          )}
          {...props}
        >
          {items
            ? items.map((item, index) => (
                <ListItem key={index} title={item.title} icon={item.icon}>
                  {item.label}
                  {item.items && (
                    <List as={as} items={item.items} size={size} />
                  )}
                </ListItem>
              ))
            : children}
        </Component>
      </ListContext.Provider>
    );
  },
) as React.ForwardRefExoticComponent<
  ListProps & React.RefAttributes<HTMLElement>
> & {
  Item: typeof ListItem;
};

List.displayName = 'List';
List.Item = ListItem;
