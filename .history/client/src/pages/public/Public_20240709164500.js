import React from 'react'
import {Outlet} from 'react-router-dom'
import {Header, Navigation} from '../../components'
const Public = () =>{
    return (
        <div className='w-full flex justify-center'>
           <div>
            
           </div>
            <Outlet />
        </div>
    )
}

export default Public