'use client';

import { useState } from 'react';
import Form from '../../forms/Form';
import { FormModal } from '../controlled-form-modal/form-modal';

export const ModalWrapper = () => {
  const [modalType, setModalType] = useState(null);
  const openFormModal = (type) => {
    setModalType(type);
  };
  const closeModal = () => setModalType(null);

  return (
    <>
      <button onClick={() => openFormModal('RHF')}>Open React Hook Form</button>
      <button onClick={() => openFormModal('uncontrolled')}>
        Open form with uncontrolled components
      </button>
      {modalType && (
        <FormModal onClose={closeModal}>
          {modalType === 'RHF' ? <Form /> : <Form />}
        </FormModal>
      )}
    </>
  );
};
