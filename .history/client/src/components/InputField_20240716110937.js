import React, {useState} from 'react'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
  
  const [isHover, setIsHover] = useState(false)
  
  return (
    <div className="w-full relative">
        <label className='text-[10px] absolute top-0 left-[12px] block bg-white px-1'htmlFor={nameKey} >{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} </label>
        <input 
        type= {type || 'text' }
        className = 'px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic outline-none'
        placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
        value = {value}
        onChange ={e =>setValue(prev => ({...prev, [nameKey]: e.target.value }))}
        onFocus= {() => setIsHover(true)}
        onBlur
        />
    </div>
  )
}

export default InputField

