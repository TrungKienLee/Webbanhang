import React, {useState, useEffect} from 'react'
import { apiGetProducts} from '../apis/product'
const BestSeller = () => {
    const [bestSeller, setBestSellers] = useState(null)
    const [newProducts, setNewProducts] = useState(null)


    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({sort : '-sold'}), apiGetProducts({sort: '-createAt'})])
        if( response[0]?.success) setBestSellers(response[0].products)
        if( response[1]?.success) setNewProducts(response[1].products)
    }
    useEffect(()=>{
        fetchProducts()
    },[])



    return(
    <div>
        <div className ='flex text-[20px]'>
            <span font-bold capitalize bo> Best Seller</span>
            <span> New Arrivals</span>
        </div>

    </div>
    )
}
export default BestSeller