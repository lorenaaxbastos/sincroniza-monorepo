import { useContext } from 'react';
import { ToastContext } from './ToastContext';
import type { ToastContextData } from './ToastContext';

export const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser utilizado dentro de um ToastProvider');
  }
  return context;
};
