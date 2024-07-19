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



// import React, {memo} from 'react'
// import { renderStarFromNumber, formatMoney } from '../ultils/helpers'

// const ProductCard = ({ price, totalRatings, title, image }) => {
//   return (
//     <div className='w-1/3 flex-auto px-[10px] mb-[20px]'>
//       <div className='w-full border flex'>
//         <img src={image} alt="products" className='w-[120px] object-contain p-4' />
//         <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
//           <span className="line-clamp-1 capitalize text-sm">{title.toLowerCase()}</span>
//           <span className="flex h-4">{renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
//             <span key={index}>{el}</span>
//           ))}</span>
//           <span>{`${formatMoney(price)} VNĐ`}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default memo(ProductCard)