import React from 'react'

import { Header, Navigation, Sidebar, Banner } from '../../components'
const Home = () =>{
    return (
        <div className ='w-main '>
            <div className = 'flex flex-col gap-5'>
                <Sidebar />
                <span> Deal daily</span>
            </div>
        </div>
    )
}

export default Home