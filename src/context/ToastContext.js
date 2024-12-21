"use client";
import Toast from "@/components/Toast";
import { createContext, useState } from "react";
export const ToastContext = createContext();
export default function ToastProvider({ children }) {
  const [showToast, setShowToast] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });
  return (
    <>
      {showToast.isOpen ? (
        <Toast setShowToast={setShowToast} message={showToast.message} type={showToast.type} />
      ) : (
        ""
      )}
      <ToastContext.Provider value={{ showToast, setShowToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
}
