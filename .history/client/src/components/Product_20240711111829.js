import React, {useState}   from 'react'
import {formatMoney} from '../ultils/helpers'
import {renderStarFromNumber} from '../ultils/helpers'
import {SelectOption} from './'
import icons from '../ultils/icons'

const { GiHamburgerMenu, FaEye, FaHeart } = icons
const Product = ({productData}) =>{
    const [isShowOption, setIsShowOption] = useState(false)
    return (
       <div className='w-full px-[10px]'> 
         <div 
         className= 'w-full border '
         onMouseEnter= {e => }
         >
            <div className = 'w-full relative'> 
                {isShowOption && <div
                 className = 'absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 animate-slide-top'
                 >
                      <SelectOption icon={<FaEye />} />
                      <SelectOption icon={<GiHamburgerMenu />} />
                      <SelectOption icon={<FaHeart />} />
                </div>}
            <img src={productData?.images[0] ||  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fdefault-image&psig=AOvVaw2N0QmkULq_mSXFseStgPx3&ust=1704253337687000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiric3kvYMDFQAAAAAdAAAAABAD"}
            alt =''
             className="w-[274px] h-[274px] object-cover"
            />
            </div>
            <div className = ' flex flex-col gap-1 mt-[15px] items-start flex-col'> 
                <span className = 'flex h-4'> {renderStarFromNumber(productData?.totalRatings)}</span>
                <span className='line-clamp-1'> {productData?.title}</span>
                <span className='line-clamp-1'> {`${formatMoney(productData?.price)} VND`}</span>
            </div>
        </div>
       </div>
    )
}

export default Product