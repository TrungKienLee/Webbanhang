import React , { useEffect, useState}from 'react'

import {  Sidebar, Banner, BestSeller,DealDaily, FeatureProducts  } from '../../components'

const Home = () =>{

   
    return (
      <>
         <div className="w-main flex mt-6">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
       <div className ='my-8'> 
        <FeatureProducts />
       </div>



      </>
        
    )
}

export default Home



// import React, { useEffect, useState } from "react";
// import { Banner, Header, Sidebar, BestSeller, DealDaily, FeaturedProduct, CustomSlider } from "../../components";
// import { useSelector } from 'react-redux'
// import icons from '../../ultils/icons'

// const {IoIosArrowForward} = icons
// const Home = () => {
//   const {newProducts} = useSelector(state => state.products)
//   const { categories } = useSelector(state => state.app)
//   const { isLoggedIn, current } = useSelector(state => state.user)
//   console.log({ isLoggedIn, current })
//   return (
//     <>
//       <div className="w-main flex mt-6">
//         <div className="flex flex-col gap-5 w-[25%] flex-auto">
//           <Sidebar />
//           <DealDaily />
//         </div>
//         <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
//           <Banner />
//           <BestSeller />
//         </div>
//       </div>
//       <div className='my-8'>
//           <FeaturedProduct />
//       </div>
//       <div className='my-8 w-full'>
//         <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
//           NEW ARRIVALS
//         </h3>
//         <div className="mt-4 mx-[-10px]">
//           <CustomSlider
//             products = {newProducts}
//           />
//         </div>
//       </div>
//       <div className="my-8 w-full">
//           <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>HOT COLLECTIONS</h3>
//           <div className='flex flex-wrap gap-4 mt-4 min-h-[202px]'>
//               {categories?.filter(el => el.brand.length > 0)?.map(el => (
//                 <div key={el._id}
//                   className='w-[396px]'  
//                 >
//                   <div className='border flex p-4 gap-4 min-h-[190px]'>
//                       <img src={el?.image} alt='images hot collections' className="flex-1 w-[144px] h-[129px] object-cover" />
//                       <div className="flex-1 text-gray-700">
//                           <h4 className='font-semibold uppercase'>{el.title}</h4>
//                           <ul className='text-sm'>
//                               {el?.brand?.map(item => (
//                                 <span key={item} className="flex gap-1 items-center text-gray-500">
//                                    <IoIosArrowForward size={14} />
//                                   <li>{item}</li>
//                                 </span>
//                               ))}
//                           </ul>
//                       </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//       </div>
//       <div className="my-8 w-full">
//         <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>BLOG POSTS</h3>
//       </div>
//     </>
//   );
// };

// export default Home;
