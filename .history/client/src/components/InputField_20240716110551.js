import React from 'react'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
  return (
    <div className="w-full relative">
        <label className='text-[25px] absolute top-0 left-[8-px]'htmlFor={nameKey} >{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} </label>
        <input 
        type= {type || 'text' }
        className = 'px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic'
        placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
        value = {value}
        onChange ={e =>setValue(prev => ({...prev, [nameKey]: e.target.value }))}

        />
    </div>
  )
}

export default InputField

