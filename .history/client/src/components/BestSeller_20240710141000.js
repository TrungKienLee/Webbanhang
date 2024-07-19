import React, {useState, useEffect} from 'react'
import { apiGetProducts} from '../apis/product'

const tabs = [
  { id: 1, name: "Best Sellers" },
  { id: 2, name: "New Arrivals" },
];
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
          <div className="flex text-[20px] ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase px-8 border-r cursor-pointer text-gray-400 '>
              }
           
          
          </span>
        ))}
      </div>
    </div>
    )
}
export default BestSeller