import React, { useCallback } from "react";
import Modal from "../../../../components/Modal/Modal";
import { Token } from "../../../../types";

interface ModalClaimProps {
    isOpen: boolean,
    onDismiss: () => void,
    onSubmit: () => void,
    amount: string,
    token: Token
}

const ModalClaim: React.FC<ModalClaimProps> = ({ isOpen, onDismiss, onSubmit, amount, token }) => {

    const handleDismiss = useCallback(() => {
        onDismiss();
    }, [onDismiss]);

    const handleSubmit = useCallback(() => {
      onSubmit();
    }, [onSubmit]);
    
    return (
      <>
        <Modal title={`Claim ${token.ticker}`} isOpen={isOpen} onDismiss={handleDismiss}>
          <div className="border-t border-gray-300 pt-2">
            <div className="text-4xl mx-auto py-5 font-bold text-center">
              {amount} <img src={token.imageUri} className="h-9 pb-1 px-1 inline"/>
            </div>
            <div className="text-center mt-2">
              <button className="bg-blue-400 rounded-xl py-2 px-5 text-white" onClick={handleSubmit}>Claim</button>
            </div>
          </div>
        </Modal>
      </>
    );
};
 
export default ModalClaim;