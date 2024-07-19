import React, {useState, useEffect} from 'react'
import {ProductCard} from './'
import {apiGetProducts} from '../apis'


const FeatureProducts = () => {
   
    const fetchProducts = async()=>{
        const response = await apiGetProducts({limit : 3 , page : Math.round(Math.random()*2)  , totalRatings : 5 })
        console.log(response)
    }
    useEffect(())






  return (
    <div className = 'w-full '>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main  '> FEATURE PRODUCTS  </h3>
    </div>
  )
}

export default FeatureProducts