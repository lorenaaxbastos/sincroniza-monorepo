import React from 'react';
import { Container, type ContainerProps } from '@/layouts/Container';
import styles from './Header.module.css';

export interface HeaderProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Conteúdo renderizado na área da Topbar acima do Header principal */
  topbar?: React.ReactNode;
  /** Conteúdo alinhado à esquerda no Header */
  start?: React.ReactNode;
  /** Conteúdo alinhado ao centro no Header */
  center?: React.ReactNode;
  /** Conteúdo alinhado à direita no Header */
  end?: React.ReactNode;
  /** Torna o fundo do Header transparente no topo da página */
  isTransparent?: boolean;
  /** Posicionamento do Header no fluxo da página */
  position?: 'static' | 'fixed';
  /** Permite customizar qualquer propriedade do Container interno do Header principal */
  containerProps?: Partial<ContainerProps>;
  /** Classes CSS adicionais aplicadas ao wrapper do Header */
  className?: string;
}

/**
 * O `Header` é o cabeçalho estrutural unificado da aplicação, suportando navegação principal (`start`, `center`, `end`)
 * e uma área opcional superior de avisos/ações (`topbar`).
 */
export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      topbar,
      start,
      center,
      end,
      isTransparent = false,
      position = 'static',
      containerProps,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const hasTopbar = Boolean(topbar);

    React.useEffect(() => {
      if (!isTransparent) return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isTransparent]);

    const classNames = [
      styles.header,
      isTransparent ? styles.isTransparent : '',
      isScrolled ? styles.isScrolled : '',
      position === 'fixed' ? styles.isFixed : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        data-has-topbar={hasTopbar}
        {...rest}
      >
        {hasTopbar && <div className={styles.topbar}>{topbar}</div>}

        <div className={styles.main}>
          <Container
            size="xl"
            padding="md"
            {...containerProps}
            className={`${styles.container} ${containerProps?.className ?? ''}`.trim()}
          >
            {start && <div className={styles.start}>{start}</div>}
            {center && <div className={styles.center}>{center}</div>}
            {end && <div className={styles.end}>{end}</div>}
          </Container>
        </div>
      </div>
    );
  },
);

Header.displayName = 'Header';

export default Header;
