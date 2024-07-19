import React from 'react'
import {Outlet} from 'react-router-dom'
import {Header, Navigation} from '../../components'
const Public = () =>{
    return (
        <div className='w-full '>
            Public
            <Outlet />
        </div>
    )
}

export default Public