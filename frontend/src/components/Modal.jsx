import React from 'react'

const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black bg-opacity-50">
                    <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded z-10 text-right">
                        <button 
                            className='text-black font-semibold hover:text-red-600 focus:outline-none mr-2' 
                            onClick={onClose}
                        >
                            X
                        </button>
                        {children}
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default Modal