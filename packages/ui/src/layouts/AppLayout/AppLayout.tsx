import React from 'react';
import styles from './AppLayout.module.css';

export interface AppLayoutProps extends React.ComponentPropsWithRef<'div'> {
  /** Conteúdo opcional a ser renderizado na lateral esquerda (Menu de navegação/Sidebar) */
  sidebar?: React.ReactNode;
  /** Conteúdo opcional a ser renderizado no topo da área visual */
  header?: React.ReactNode;
  /** Conteúdo opcional a ser renderizado no rodapé da área visual */
  footer?: React.ReactNode;
  /** Conteúdo principal da aplicação, renderizado dentro do `<main>` rolável */
  children?: React.ReactNode;
  /** Classes CSS adicionais aplicadas ao contêiner raiz (shell) do layout */
  className?: string;
}

/**
 * O `AppLayout` é a estrutura base para sistemas, dashboards e áreas logadas.
 * Ele restringe a altura total à tela (`100dvh`), delegando a rolagem internamente
 * para o contêiner `<main data-scrollable>`.
 */
export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  ({ sidebar, header, footer, children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.shell} ${className}`.trim()}
        {...rest}
      >
        {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}

        <div className={styles.view}>
          {header && <header className={styles.header}>{header}</header>}

          <main id="main-content" className={styles.main} data-scrollable>
            {children}
          </main>

          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </div>
    );
  },
);

AppLayout.displayName = 'AppLayout';

export default AppLayout;
