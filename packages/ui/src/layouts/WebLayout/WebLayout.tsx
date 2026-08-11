import React from 'react';
import styles from './WebLayout.module.css';

export interface WebLayoutProps extends React.ComponentPropsWithRef<'div'> {
  /** Conteúdo opcional a ser renderizado dentro do <header> no topo da página */
  header?: React.ReactNode;
  /** Conteúdo opcional a ser renderizado dentro do <footer> no rodapé da página */
  footer?: React.ReactNode;
  /** Conteúdo principal da página renderizado dentro do <main> */
  children?: React.ReactNode;
  /** Classes CSS adicionais aplicadas ao contêiner raiz (shell) do layout */
  className?: string;
}

/**
 * O `WebLayout` é a estrutura padrão para páginas institucionais e landing pages.
 * Organiza a tela verticalmente em Header, Main e Footer, garantindo altura mínima de 100vh
 * e delegando a rolagem para o próprio documento (window).
 */
export const WebLayout = React.forwardRef<HTMLDivElement, WebLayoutProps>(
  ({ header, footer, children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.shell} ${className}`.trim()}
        {...rest}
      >
        {header && <header className={styles.header}>{header}</header>}

        <main id="main-content" className={styles.main}>
          {children}
        </main>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    );
  },
);

WebLayout.displayName = 'WebLayout';

export default WebLayout;
