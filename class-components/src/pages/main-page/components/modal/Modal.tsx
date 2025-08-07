import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import './modal.css';
import { clearAll } from '../../../../redux/selected-books/selected-books-slice';
import { selectedBooksSelector } from '../../../../redux/selected-books/selected-books-selector';

export const Modal = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectedBooksSelector);

  if (selectedItems.length === 0) return null;
  const handleClearAll = () => {
    dispatch(clearAll());
  };

  const handleDownload = () => {
    const headers = ['id', 'name', 'description'];
    const structuredData = [
      headers.join(','),
      ...selectedItems.map((item) =>
        headers
          .map((header) => {
            const val = item[header as keyof typeof item] ?? '';
            return `"${String(val).replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ];
    const bookData = structuredData.join('\n');
    const blob = new Blob([bookData], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div className="modal-container">
      <div className="modal-container-info">
        <span>Number of selected items:</span>
        <span>{selectedItems.length}</span>
      </div>
      <div className="modal-container-buttons">
        <button className="modal-button" onClick={handleDownload}>
          Download
        </button>
        <button className="modal-button" onClick={handleClearAll}>
          Unselect all
        </button>
      </div>
    </div>,
    document.body
  );
};
