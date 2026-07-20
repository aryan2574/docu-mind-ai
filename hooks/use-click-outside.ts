"use client";

import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handler]);

  return ref;
}