import React from 'react'
import {Outlet} from 'react-router-dom'
import {} from '../../components'
const Public = () =>{
    return (
        <div>
            Public
            <Outlet />
        </div>
    )
}

export default Public