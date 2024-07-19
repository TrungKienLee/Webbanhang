import React from 'react'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
  return (
    <div className="w-full">
        <input 
        type= {'type' || 'text' }
        className = 'px-4 py-2 rounded-sm '
        placeholder={nameKey.slice(0,1)}

        />
    </div>
  )
}

export default InputField