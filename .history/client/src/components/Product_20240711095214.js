import React from 'react'

const Product = ({productData}) =>{
    return (
       <div className='w-full px-[10px]'> 
         <div className= 'w-full border '>
            <img src={productData?.images[0] ||  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fdefault-image&psig=AOvVaw2N0QmkULq_mSXFseStgPx3&ust=1704253337687000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiric3kvYMDFQAAAAAdAAAAABAD"}
            alt =''
             className="w-[274px] h-[274px] object-cover"
            />
            <div className = ' flex flex-col gap-2'> 
                <span className='line'> {productData?.title}</span>
                <span> {`${productData?.price} VND`}</span>
            </div>
        </div>
       </div>
    )
}

export default Product