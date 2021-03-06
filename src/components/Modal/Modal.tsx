import React, { useCallback } from "react";
import { BsX } from "react-icons/bs";

interface ModalProps {
    title: string,
    isOpen: boolean;
    canDismiss?: boolean;
    onDismiss?: () => void,
}

const Modal: React.FC<ModalProps> = ({ isOpen, canDismiss=true, onDismiss, title, children }) => {
    const handleDismiss = useCallback(() => {
        if (onDismiss) onDismiss();
    }, [onDismiss]);
    
    return (
      <>
        {isOpen &&
          <div className="z-50 fixed inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center" onClick={handleDismiss}>
              <div className="bg-white shadow-lg p-4 rounded-2xl w-4/5 md:w-2/3 lg:w-1/3 mb-14" onClick={(e) => {e.stopPropagation()}}>
                  <div className="flex justify-between">
                      <span className="text-lg font-sans">{title}</span>
                      {canDismiss && <BsX className="text-3xl cursor-pointer" onClick={handleDismiss}/>}
                  </div>
                  <div className="mt-3">
                      {children}
                  </div>
              </div>
          </div>}
      </>
    );
};

export default Modal;
