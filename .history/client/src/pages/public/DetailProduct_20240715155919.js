import React from 'react'
import {useParams} from 'react-router-dom'
const DeatailProduct = () =>{

    const {pid} = useParams()


    return (
        <div className= 'border w-full flex-auto'>
            DetailProduct
        </div>
    )
}

export default DeatailProduct