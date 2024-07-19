import React from 'react'

const ProductCard = (price, totalRatings,title, image ) => {
  return (
    <div className = ' w-1/3 flex-auto border' >
        {/* <img src={image} alt = 'products' className='w-[90px] object-contain p-4 ' /> */}
 <img src={image} alt="products" className='w-[120px] object-contain p-4' />
    </div>
  )
}

export default ProductCard



