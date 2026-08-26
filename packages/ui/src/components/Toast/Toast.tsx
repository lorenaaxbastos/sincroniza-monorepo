import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from '@/components/Alert';
import type { AlertProps, AlertStatus } from '@/components/Alert';
import { cx } from '@/utils/cx';
import styles from './Toast.module.css';

export type ToastStatus = AlertStatus;

export interface ToastProps extends Omit<AlertProps, 'id'> {
  /** Identificador único do Toast */
  id?: string;
  /** Duração em ms antes do autodescarte (padrão: 5000ms, passe 0 para fixar) */
  duration?: number;
  /** Controla o estado de saída vindo do Provider */
  isExiting?: boolean;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id: _id,
      status = 'info',
      variant = 'solid',
      title,
      duration = 5000,
      icon,
      isDismissible = true,
      isExiting: isExitingProp = false,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [localExiting, setLocalExiting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isExiting = isExitingProp || localExiting;

    const remainingTimeRef = useRef<number>(duration);
    const startTimeRef = useRef<number>(Date.now());
    const timerRef = useRef<number | null>(null);

    const handleDismiss = useCallback(() => {
      setLocalExiting(true);
      setTimeout(() => {
        onClose?.();
      }, 250);
    }, [onClose]);

    useEffect(() => {
      if (duration <= 0) return;

      if (!isHovered) {
        startTimeRef.current = Date.now();
        timerRef.current = window.setTimeout(() => {
          handleDismiss();
        }, remainingTimeRef.current);
      } else if (timerRef.current) {
        clearTimeout(timerRef.current);
        const elapsedTime = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(
          0,
          remainingTimeRef.current - elapsedTime,
        );
      }

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [isHovered, duration, handleDismiss]);

    return (
      <div
        ref={ref}
        className={cx(
          styles.toastWrapper,
          isExiting && styles.exiting,
          className,
        )}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        {...props}
      >
        <Alert
          status={status}
          variant={variant}
          title={title}
          icon={icon}
          isDismissible={isDismissible}
          disableExitAnimation
          onClose={handleDismiss}
        >
          {children}
        </Alert>

        {duration > 0 && (
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={
                {
                  '--toast-duration': `${String(duration)}ms`,
                  '--toast-play-state': isHovered ? 'paused' : 'running',
                } as React.CSSProperties
              }
            />
          </div>
        )}
      </div>
    );
  },
);

Toast.displayName = 'Toast';
