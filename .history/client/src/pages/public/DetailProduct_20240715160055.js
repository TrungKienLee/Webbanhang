import React from 'react'
import {useParams} from 'react-router-dom'
const DeatailProduct = () =>{

    const {pid , title} = useParams()
    console.log(pid , title)


    return (
        <div className= 'border w-full flex-auto'>
            DetailProduct
        </div>
    )
}

export default DeatailProduct