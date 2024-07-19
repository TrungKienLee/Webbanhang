import React from 'react'

import { Header, Navigation, Sidebar, Banner } from '../../components'
const Home = () =>{
    return (
        <div className ='w-main flex'>
            <div className = 'flex flex-col gap-5 w-[25%]'>
                <Sidebar />
                <span> Deal daily</span>
            </div>
            <div className = 'flex flex-col gap-5 w-[75%'>
                <Banner />
                <span> Best seller</span>
            </div>
        </div>

        
    )
}

export default Home