import { createContext, useContext } from 'react';

export interface FormContextValue {
  disabled?: boolean;
}

export const FormContext = createContext<FormContextValue | undefined>(
  undefined,
);

export const useFormContext = (): FormContextValue => {
  return useContext(FormContext) ?? {};
};
