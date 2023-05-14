import React, { createContext, useContext, ReactNode } from "react";
import { SweetAlertResult } from "sweetalert2";

import {
  ToastSuccess,
  ToastError,
  ToastWarning,
  ToastInfo,
  ToastQuestion,
} from "../features/toast";

/* DEPECRATED - 14/05/23 */

interface SA2ContextProps {
  ToastSuccess: (msg: string) => Promise<SweetAlertResult<any>>;
  ToastError: (msg: string) => void;
  ToastWarning: (msg: string) => Promise<SweetAlertResult<any>>;
  ToastInfo: (msg: string) => Promise<SweetAlertResult<any>>;
  ToastQuestion: (msg: string) => Promise<SweetAlertResult<any>>;
}

export const SA2Context = createContext<SA2ContextProps | undefined>(undefined);

export const SA2Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <SA2Context.Provider
      value={{
        ToastSuccess,
        ToastError,
        ToastWarning,
        ToastInfo,
        ToastQuestion,
      }}
    >
      {children}
    </SA2Context.Provider>
  );
};

export const useSA2Toast = (): SA2ContextProps => {
  const context = useContext(SA2Context);
  if (!context) {
    throw new Error("useToast must be used within a SA2Provider");
  }
  return context;
};
