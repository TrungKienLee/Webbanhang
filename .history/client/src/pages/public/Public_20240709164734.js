import React from 'react'
import {Outlet} from 'react-router-dom'
import {Header, Navigation} from '../../components'
const Public = () =>{
    return (
        <div className='w-full flex justify-center'>
           
            <Header />
            <Navigation />
    
           <div className='w-main'>
            
           </div>
            
        </div>
    )
}

export default Public