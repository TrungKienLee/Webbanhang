import React, { userState, useEffect} from 'react'
import { apiGetCategories} from '../apis/app'
const Sidebar = () =>{

    const fecthCategories = async () => {
        const response = await apiGetCategories()
        console.log(response)
    }
    useEffect(())

    return (
        <div>
            Sidebar
        </div>
    )
}

export default Sidebar


// import React, { useState, useEffect, memo} from 'react'

// import { NavLink } from 'react-router-dom'
// import { createSlug } from 'ultils/helpers'
// import { useSelector } from 'react-redux'

// const Sidebar = () => {
//   const { categories } = useSelector(state => state.app)
//   return (
//     <div className='flex flex-col border'>
//       {categories?.map(el => (
//         <NavLink
//           key={createSlug(el.title)}
//           to={createSlug(el.title)}
//           className={({ isActive }) => isActive ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main' :
//             'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'}
//         >
//           {el.title}
//         </NavLink>
//       ))}
//     </div>
//   )
// }

// export default memo(Sidebar)
