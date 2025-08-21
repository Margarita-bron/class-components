'use client';
import { createPortal } from 'react-dom';
import './modal.css';
import { useAppDispatch } from '../../hooks/typed-react-redux-hooks';
import { clearAll } from '../../redux/selected-books/selected-books-slice';
import { useSelectedBooksSelector } from '../../redux/selectors/selected-books-selector';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { convertToCsv } from '../../app/[locale]/exportCsv';

export const Modal = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const t = useTranslations('MainPage');
  const dispatch = useAppDispatch();
  const selectedItems = useSelectedBooksSelector();

  if (selectedItems.length === 0) return null;

  const handleClearAll = () => {
    dispatch(clearAll());
  };

  const handleDownload = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    const csvArray = await convertToCsv(selectedItems);
    const csvContent = csvArray.join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${selectedItems.length}_items.csv`;
      downloadLinkRef.current.click();
    }
  };

  return createPortal(
    <div className="modal-container">
      <div className="modal-container-info">
        <span>{t('Modal.info')}</span>
        <span>{selectedItems.length}</span>
      </div>
      <div className="modal-container-buttons">
        <button className="modal-button" onClick={handleDownload}>
          {t('Modal.Download')}
        </button>
        <button className="modal-button" onClick={handleClearAll}>
          {t('Modal.Unselect all')}
        </button>
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
    </div>,
    document.body
  );
};
