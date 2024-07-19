import React from 'react'
import {formatMoney} from '../ultils/helpers'
import {} from ''
const Product = ({productData}) =>{
    return (
       <div className='w-full px-[10px]'> 
         <div className= 'w-full border '>
            <img src={productData?.images[0] ||  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fdefault-image&psig=AOvVaw2N0QmkULq_mSXFseStgPx3&ust=1704253337687000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiric3kvYMDFQAAAAAdAAAAABAD"}
            alt =''
             className="w-[274px] h-[274px] object-cover"
            />
            <div className = ' flex flex-col gap-1 mt-[15px] items-start flex-col'> 
                <span className='line-clamp-1'> {productData?.title}</span>
                <span> {`${formatMoney(productData?.price)} VND`}</span>
            </div>
        </div>
       </div>
    )
}

export default Product