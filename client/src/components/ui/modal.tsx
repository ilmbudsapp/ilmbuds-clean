import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="bg-primary text-white p-4">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;