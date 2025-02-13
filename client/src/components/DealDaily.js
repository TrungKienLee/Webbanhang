import React , {useState, useEffect, memo} from 'react'
import {apiGetProducts} from '../apis/product'
import icons from '../ultils/icons'
import { renderStarFromNumber, formatMoney, secondsToHms } from '../ultils/helpers'
import { Countdown} from './'
import moment from 'moment';
const { FaStar, GiHamburgerMenu } = icons
let idInterval
const DealDaily = () => {
    const [dealdaily, setDealdaily] = useState(null)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const[expireTime, setExpireTime] = useState(false)


    const fetchDealDaily = async () => {
        const response = await apiGetProducts ({limit : 1, page : Math.round(Math.random()*2)  , totalRatings : 5  })
        if(response.success) {
            setDealdaily(response.products[0])
             const today = `${moment().format('MM/DD/YYYY')} 5:00:00`
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
            const number = secondsToHms(seconds)
            setHour(number.h)
            setMinute(number.m)
            setSecond(number.s)
        }else{
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
}
 
// useEffect(() =>{
//     fetchDealDaily()
// },[])
useEffect (() =>{
    if(expireTime){
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
    }
},[expireTime])
useEffect(() =>{
    idInterval = setInterval(() =>{
       
        if(second > 0 ) setSecond(prev => prev-1)
        else{
            if(minute > 0) {
            setMinute(prev => prev -1)
            setSecond(59)
            }
            else{
                if(hour > 0){
                    setHour(prev => prev -1)
                    setMinute(59)
                    setSecond(59)
                }
                else{
                    setExpireTime(!expireTime)
                }
            }
        }
    },1000)
    return ()=>{
        clearInterval(idInterval)
    }
},[second,minute,hour, expireTime])

    return (
        // <div className= 'border w-full flex-auto'>
        //     <div>
        //         <span> Deal Daily </span>
        //     </div>
        //     <div className = 'w-full flex flex-col items-center'> 
        //          <img src={dealdaily?.images[0] ||  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fdefault-image&psig=AOvVaw2N0QmkULq_mSXFseStgPx3&ust=1704253337687000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiric3kvYMDFQAAAAAdAAAAABAD"}
        //     alt =''
        //      className="w-full object contant"
        //     />
        //     </div>
        // </div>
        
               <div className='border w-full flex-auto'>
            <div className='flex items-center justify-between p-4 w-full'>
                <span className='flex-1 flex justify-center'><FaStar size={20} color='#DD1111' /></span>
                <span className='flex-8 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
                <span className='flex-1'></span>
            </div>
            <div class='w-full flex flex-col items-center pt-8 px-4 gap-2'>
                <img
                    src={
                        dealdaily?.thumb ||
                        "https://icon-library.com/images/no-image-icon/no-image-icon-27.jpg"
                    }
                    alt=""
                    className="w-[274px] h-[274px] object-cover"
                />
                <span className="flex h-4"> {renderStarFromNumber(dealdaily?.totalRatings, 20)?.map((el,index) => (<span key={index}> {el} </span>))}  </span>
                <span className="line-clamp-1 text-center">{dealdaily?.title}</span>
                <span>{`${formatMoney(dealdaily?.price)} VNĐ`}</span>

            </div>
            <div className = 'px-4 mt-8'> 
                <div className='flex justify-center gap-2 items-center mb-4'> 
                    <Countdown unit={'Hours'} number={hour}/>
                    <Countdown unit ={'Minutes'} number={minute}/>
                    <Countdown unit ={'Seconds'} number={second}/>

                </div>
                <button
                type= 'button'
                className = 'flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'
                >
                    <GiHamburgerMenu />
                    <span> Options </span>
                </button>
            </div>
            </div>
    
    )
}

export default memo (DealDaily)


// import React, { useState, useEffect, memo } from 'react'
// import icons from '../ultils/icons'
// import { apiGetProducts } from '../apis/product'
// import { renderStarFromNumber, formatMoney, secondsToHms } from '../ultils/helpers'
// import { Countdown } from '..'
// import moment from 'moment';
// const { FaStar, GiHamburgerMenu } = icons
// let idInterval
// const DealDaily = () => {
//     const [dealdaily, setDealdaily] = useState(null)
//     const [hour, setHour] = useState(0)
//     const [minute, setMinute] = useState(0)
//     const [second, setSecond] = useState(0)
//     const [expireTime, setexpireTime] = useState(false)

//     const fetchDalDaily = async () => {
//         const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5 })
//         if (response.success) {
//             setDealdaily(response?.products[0])
            // const today = `${moment().format('MM/DD/YYYY')} 5:00:00`
            // const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
            // const number = secondsToHms(seconds)
            // setHour(number.h)
            // setMinute(number.m)
            // setSecond(number.s)
//         } else {
//             setHour(0)
//             setMinute(59)
//             setSecond(59)
//         }
//     }

//     useEffect(() => {
//         idInterval && clearInterval(idInterval)
//         fetchDalDaily()
//     }, [expireTime])

//     useEffect(() => {
//         idInterval = setInterval(() => {
//             // console.log(1);
//             if (second > 0) setSecond(prev => prev - 1)
//             else {
//                 if (minute > 0) {
//                     setMinute(prev => prev - 1)
//                     setSecond(59)
//                 } else {
//                     if (hour > 0) {
//                         setHour(prev => prev - 1)
//                         setMinute(59)
//                         setSecond(59)
//                     } else {
//                         setexpireTime(!expireTime)
//                     }
//                 }
//             }
//         }, 1000)
//         return () => {
//             clearTimeout(idInterval)
//         }
//     }, [hour, minute, second, expireTime])

//     return (
        // <div className='border w-full flex-auto'>
        //     <div className='flex items-center justify-between p-4 w-full'>
        //         <span className='flex-1 flex justify-center'><FaStar size={20} color='#DD1111' /></span>
        //         <span className='flex-8 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
        //         <span className='flex-1'></span>
        //     </div>
        //     <div class='w-full flex flex-col items-center pt-8 px-4 gap-2'>
        //         <img
        //             src={
        //                 dealdaily?.thumb ||
        //                 "https://icon-library.com/images/no-image-icon/no-image-icon-27.jpg"
        //             }
        //             alt=""
        //             className="w-[274px] h-[274px] object-cover"
        //         />
        //         <span className="line-clamp-1 text-center">{dealdaily?.title}</span>
        //         <span className="flex">{renderStarFromNumber(dealdaily?.totalRatings, 20)?.map((el, index) => {
        //             <span key={index}>{el}</span>
        //         })}</span>
        //         <span>{`${formatMoney(dealdaily?.price)} VNĐ`}</span>
        //     </div>
//             <div className='px-4 mt-8'>
//                 <div className='flex justify-center gap-2 items-center mb-4'>
//                     <Countdown unit={'Hours'} number={hour} />
//                     <Countdown unit={'Minutes'} number={minute} />
//                     <Countdown unit={'Seconds'} number={second} />
            //     </div>
                // <button
                //     type='button'
                //     className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'
                // >
                //     <GiHamburgerMenu />
                //     <span>Options</span>
                // </button>
            // </div>
//         </div>
//     )
// }

// export default memo(DealDaily)