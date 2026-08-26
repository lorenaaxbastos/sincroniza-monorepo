import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react';
import { Button, type ButtonProps } from '@/components/Button';
import { Card } from '@/components/Card';
import type { CardColor, CardVariant } from '@/components/Card';
import { cx } from '@/utils/cx';
import styles from './Alert.module.css';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title' | 'color'
> {
  /** O estado semântico do alerta (define cor e ícone padrão) */
  status?: AlertStatus;
  /** Variante visual de preenchimento (herda do Card) */
  variant?: CardVariant;
  /** Título em destaque do alerta */
  title?: React.ReactNode;
  /** Substitui o ícone padrão. Passe `false`, `null` ou `""` para ocultar. */
  icon?: React.ReactNode;
  /** Habilita o botão de fechar o alerta */
  isDismissible?: boolean;
  /** Desativa a animação/delay interno de saída */
  disableExitAnimation?: boolean;
  /** Callback acionado ao clicar no botão de fechar */
  onClose?: () => void;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo detalhado da mensagem */
  children?: React.ReactNode;
}

interface StatusConfigItem {
  color: CardColor;
  icon: React.ReactNode;
  role: 'alert' | 'status';
}

const STATUS_CONFIG: Record<AlertStatus, StatusConfigItem> = {
  info: { color: 'info', icon: <Info size={20} />, role: 'status' },
  success: {
    color: 'success',
    icon: <CheckCircle2 size={20} />,
    role: 'status',
  },
  warning: {
    color: 'warning',
    icon: <AlertTriangle size={20} />,
    role: 'alert',
  },
  error: { color: 'error', icon: <AlertCircle size={20} />, role: 'alert' },
};

/**
 * O `Alert` é o componente primário para mensagens de feedback contextual e comunicação visual com o usuário.
 * Suporta estados semânticos (`status`), variantes visuais herdadas do `Card`, substituição ou remoção de ícones (`icon`),
 * comportamento descartável (`isDismissible`) com transição suave de saída e acessibilidade nativa para leitores de tela (`role` e `aria-live`).
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status = 'info',
      variant = 'subtle',
      title,
      icon,
      isDismissible = false,
      disableExitAnimation = false,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    const config = STATUS_CONFIG[status];
    const shouldHideIcon = icon === false || icon === null || icon === '';
    const resolvedIcon = shouldHideIcon ? null : (icon ?? config.icon);

    const buttonColor =
      variant === 'solid' ? 'white' : (config.color as ButtonProps['color']);

    const handleClose = () => {
      if (disableExitAnimation) {
        onClose?.();
        return;
      }

      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    };

    if (!isVisible) return null;

    return (
      <Card
        ref={ref}
        variant={variant}
        color={config.color}
        role={config.role}
        aria-live={config.role === 'alert' ? 'assertive' : 'polite'}
        className={cx(styles.alert, isExiting && styles.exiting, className)}
        {...props}
      >
        <div className={styles.body}>
          {resolvedIcon && (
            <div className={styles.iconWrapper} aria-hidden="true">
              {resolvedIcon}
            </div>
          )}

          <div className={styles.content}>
            {title && <h4 className={styles.title}>{title}</h4>}
            {children && <div className={styles.description}>{children}</div>}
          </div>

          {isDismissible && (
            <div className={styles.closeWrapper}>
              <Button
                variant="ghost"
                color={buttonColor}
                isIconOnly
                size="sm"
                aria-label="Fechar alerta"
                onClick={handleClose}
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  },
);

Alert.displayName = 'Alert';
