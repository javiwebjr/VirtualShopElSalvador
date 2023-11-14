import React from 'react'

const Message = ({variant, children}) => {
    const getVariantClass = () => {
        switch (variant){
            case 'success':
                return "bg-green-50 text-green-700"
            case 'error':
                return "bg-red-50 text-red-700"
            default: 
                return "bg-blue-100 text-blue-700"

        }
    }
    return (
        <div className={`p-4 rounded ${getVariantClass}`}>{children}</div>
    )
}

export default Message