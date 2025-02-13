// import React from 'react'

// const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
  
  
  
//   return (
//     <div className="w-full flex flex-col  relative">
//        {value.trim() !== '' &&  <label className='text-[10px] animate-slide-top-sm absolute top-0 left-[12px] block bg-white px-1'htmlFor={nameKey} >{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} </label>}
//         <input 
//         type= {type || 'text' }
//         className = 'px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic outline-none'
//         placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
//         value = {value}
//         onChange ={e =>setValue(prev => ({...prev, [nameKey]: e.target.value }))}
    
//         />
//         <small className ='text-main text-[10px] italic'> require </small>
//     </div>
//   )
// }
//  // [{name : password, mes : require }]
// export default InputField
import React, { useState, memo } from 'react'
import clsx from 'clsx'


const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFieds, style, fullWidth, placeholder, isHideLabel}) => {
 
  // const [focus, setFocus] = useState()
  return (
    <div className={clsx('flex flex-col relative mb-2', fullWidth && 'w-full')}>
        {!isHideLabel && value?.trim() !== '' && <label className='text-[13px] animate-slide-top-sm absolute top-0 left-[12px] block bg-white px-1' htmlFor={nameKey}>{nameKey?.slice(0,1).toUpperCase() + nameKey.slice(1)}</label>}
        <input 
            type={type || 'text'}
            className={clsx('px-4 py-2 rounded-sm border w-full mt-2 text-gray-950 placeholder:text-sm placeholder:italic outline-none', style)}
            placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            value={value}
            onChange={e => setValue(prev=> ({...prev, [nameKey]: e.target.value}))}
            onFocus={() => setInvalidFieds && setInvalidFieds([])}
            // onBlur={() => setFocus(false)}
        />
        {invalidFields?.some(el => el.name === nameKey) && <small className='text-main italic'>
          {invalidFields.find(el => el.name === nameKey)?.mes}  
        </small>}
    </div>
  )
}

export default memo(InputField)
