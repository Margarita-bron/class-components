'use client';

import { createPortal } from 'react-dom';
import Form from '../../forms/Form';
import styles from './form-modal.module.css';
import { useEffect, useRef } from 'react';

export const FormModal = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return createPortal(
    <div className={styles.overlay}>
      <div
        role="dialog"
        aria-modal="true"
        className={styles.container}
        ref={modalRef}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
