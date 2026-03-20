import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

const ConfirmDelete = ({ isOpen, onClose, onConfirm, title = 'Delete Item?', text = 'Are you sure you want to delete this item? This action cannot be undone.', loading = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>Delete</Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center p-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-500 mb-4 animate-[spin_0.5s_ease-out]">
          <AlertTriangle size={24} />
        </div>
        <p className="text-text-secondary text-[14px] leading-relaxed">
          {text}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
