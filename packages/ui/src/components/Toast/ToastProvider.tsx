import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/utils/cx';
import { Toast } from './Toast';
import type { ToastProps, ToastStatus } from './Toast';
import styles from './Toast.module.css';
import { ToastContext } from './ToastContext';
import type {
  ToastContextData,
  ToastOptions,
  ToastPosition,
} from './ToastContext';

export interface ToastProviderProps {
  position?: ToastPosition;
  maxToasts?: number;
  children?: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  position = 'bottom-right',
  maxToasts = 5,
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 250);
  }, []);

  const dismissAll = useCallback(() => {
    setToasts((prev) => prev.map((t) => ({ ...t, isExiting: true })));
    setTimeout(() => {
      setToasts([]);
    }, 250);
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id =
      options.id ?? `toast-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: ToastProps = {
      ...options,
      id,
      onClose: () => {
        options.onClose?.();
        setToasts((prev) => prev.filter((t) => t.id !== id));
      },
    };

    // Adiciona o novo toast ao final da fila (sem apagar os antigos)
    setToasts((prev) => [...prev.filter((t) => t.id !== id), newToast]);

    return id;
  }, []);

  const createHelper = useCallback(
    (status: ToastStatus) => {
      return (options: Omit<ToastOptions, 'status'> | string) => {
        if (typeof options === 'string') {
          return showToast({ title: options, status });
        }
        return showToast({ ...options, status });
      };
    },
    [showToast],
  );

  const contextValue: ToastContextData = {
    toast: showToast,
    toastSuccess: createHelper('success'),
    toastError: createHelper('error'),
    toastWarning: createHelper('warning'),
    toastInfo: createHelper('info'),
    dismiss,
    dismissAll,
  };

  const isClient = typeof window !== 'undefined';

  const visibleToasts = toasts.slice(0, maxToasts);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {isClient &&
        createPortal(
          <div
            className={cx(styles.container, styles[position])}
            aria-label="Notificações"
          >
            {visibleToasts.map((toastProps) => (
              <Toast key={toastProps.id} {...toastProps} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
