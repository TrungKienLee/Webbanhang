import React from 'react'

const Product = ({productData}) =>{
    return (
        <div className= 'w-full'>
            <img src={productData?.images[0] || ''}
            alt =''
            className ='w-full object-contant'
            />.
        </div>
    )
}

export default Product