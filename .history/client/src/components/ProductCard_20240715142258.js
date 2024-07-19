import React from 'react'

const ProductCard = (price, totalRatings,title, thumb ) => {
  return (
    <div className = ' w-1/3 flex-auto border' >
        <img src={thumb} alt = 'products' />
    </div>
  )
}

export default ProductCard