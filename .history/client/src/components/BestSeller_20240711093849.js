import React, {useState, useEffect} from 'react'
import { apiGetProducts} from '../apis/product'
import {Product} from './'
import Slider from "react-slick";
const tabs = [
  { id: 1, name: "Best Sellers" },
  { id: 2, name: "New Arrivals" },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
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
            className='font-semibold uppercase px-8 border-r cursor-pointer text-gray-400 '>
            {el.name}
          </span>
        ))}
      </div>
      <div className='mt-4' >
        <Slider {...settings}>
        {bestSeller?.map(el =>(
            <Product 
            key ={el.id} 
            productData={el}
            />
        ))}
        {/* <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div> */}
    </Slider>
      </div>
    </div>
    )
}
export default BestSeller