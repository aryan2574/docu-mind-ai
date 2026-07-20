"use client";

import { useState, useCallback } from "react";

interface ToastProps {
  variant?: "default" | "destructive" | "success";
  title?: string;
  description: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const toast = useCallback(({ variant = "default", title, description }: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, variant, title, description };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}