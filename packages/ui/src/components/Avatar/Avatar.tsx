import React from 'react';
import { UserRound } from 'lucide-react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type AvatarVariant = 'circle' | 'square';
export type AvatarColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'light'
  | 'dark'
  | 'white'
  | 'black'
  | 'surface';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  /** URL da imagem do avatar */
  src?: string;
  /** Texto alternativo para acessibilidade */
  alt?: string;
  /** Nome do usuário utilizado para extração automática das iniciais */
  name?: string;
  /** Tamanho predefinido do avatar */
  size?: AvatarSize;
  /** Formato geométrico do avatar */
  variant?: AvatarVariant;
  /** Esquema de cores padrão quando o avatar exibe iniciais ou ícone */
  color?: AvatarColor;
  /** Indicador de status de presença do usuário */
  status?: AvatarStatus;
  /** Classes CSS adicionais */
  className?: string;
}

function getInitials(fullName?: string): string {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * O `Avatar` exibe a foto de perfil do usuário, com suporte a fallback automático para
 * iniciais do nome ou ícone padrão, além de indicadores de status de presença.
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      variant = 'circle',
      color = 'primary',
      status,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const initials = getInitials(name);
    const avatarAlt = alt ?? (name ? `Avatar de ${name}` : 'Avatar do usuário');

    const classNames = [
      styles.avatar,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      styles[`color-${color}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} style={style} {...rest}>
        {src ? (
          <img
            src={src}
            alt={avatarAlt}
            className={styles.image}
            loading="lazy"
          />
        ) : initials ? (
          <span className={styles.initials} aria-label={avatarAlt}>
            {initials}
          </span>
        ) : (
          <UserRound
            className={styles.fallbackIcon}
            aria-label={avatarAlt}
            role="img"
          />
        )}

        {status && (
          <span
            className={`${styles.status} ${styles[`status-${status}`]}`}
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
