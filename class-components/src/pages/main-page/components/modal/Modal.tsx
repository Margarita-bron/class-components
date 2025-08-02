import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import { createPortal } from 'react-dom';
import './modal.css';
import { clearAll } from '../../../../store/selectedBooksSlice';

export const Modal = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedBooks.books
  );

  if (selectedItems.length === 0) return null;
  const handleClearAll = () => {
    dispatch(clearAll());
  };

  return createPortal(
    <div className="modal-container">
      <div className="modal-container-info">
        <span>Number of selected items:</span>
        <span>{selectedItems.length}</span>
      </div>
      <div className="modal-container-buttons">
        <button className="modal-button">Download</button>
        <button className="modal-button" onClick={handleClearAll}>
          Unselect all
        </button>
      </div>
    </div>,
    document.body
  );
};
