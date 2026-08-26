import { createContext } from 'react';
import type { ToastProps } from './Toast';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastOptions extends Omit<ToastProps, 'id'> {
  id?: string;
}

export interface ToastContextData {
  toast: (options: ToastOptions) => string;
  toastSuccess: (options: Omit<ToastOptions, 'status'> | string) => string;
  toastError: (options: Omit<ToastOptions, 'status'> | string) => string;
  toastWarning: (options: Omit<ToastOptions, 'status'> | string) => string;
  toastInfo: (options: Omit<ToastOptions, 'status'> | string) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export const ToastContext = createContext<ToastContextData | undefined>(
  undefined,
);
