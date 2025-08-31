import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { availableFields } from '../../constants/table';
import './modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedFields: string[];
  onChange: (fields: string[]) => void;
};

export default function Modal({
  isOpen,
  onClose,
  selectedFields,
  onChange,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Choose additional fields</h2>
        <ul className="field-list">
          {availableFields.map(({ value, label }) => (
            <li key={value}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFields.includes(value)}
                  onChange={(e) => {
                    const updated: string[] = e.target.checked
                      ? [...selectedFields, value]
                      : selectedFields.filter((f) => f !== value);
                    onChange(updated);
                  }}
                />
                {'    ' + label}
              </label>
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
