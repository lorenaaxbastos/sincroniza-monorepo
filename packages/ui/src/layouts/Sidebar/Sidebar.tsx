import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/Button';
import type { ButtonAsButton } from '@/components/Button';
import styles from './Sidebar.module.css';

export interface SidebarProps extends React.ComponentPropsWithRef<'div'> {
  /** Define se a sidebar deve iniciar recolhida no Desktop */
  defaultCollapsed?: boolean;
  /** Permite customizar qualquer propriedade do botão de toggle */
  toggleProps?: Partial<ButtonAsButton>;
  /** Conteúdo principal da aplicação, renderizado dentro do `<main>` rolável */
  children?: React.ReactNode;
  /** Classes CSS adicionais aplicadas ao contêiner raiz (shell) do layout */
  className?: string;
}

/**
 * A `Sidebar` compõe a navegação lateral da aplicação.
 * Gerencia seu próprio estado de colapso no Desktop e se transforma em uma
 * gaveta (drawer) responsiva no Mobile, controlada globalmente por `data-state`.
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      defaultCollapsed = false,
      toggleProps,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    return (
      <div
        ref={ref}
        className={`${styles.sidebar} ${className}`.trim()}
        data-collapsed={isCollapsed ? 'true' : undefined}
        data-state="closed"
        data-overlay="behind"
        data-scroll-lock
        {...rest}
      >
        {children}

        <Button
          isIconOnly
          isPill
          aria-label="Colapsar/expandir menu lateral"
          aria-expanded={!isCollapsed}
          className={`${styles.toggle} ${toggleProps?.className ?? ''}`.trim()}
          {...toggleProps}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          <ChevronLeft
            className={styles.toggleIcon}
            size={10}
            strokeWidth={3}
          />
        </Button>
      </div>
    );
  },
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
