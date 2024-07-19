import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Home, Login, Public, Blogs,DetailProduct,FAQ,Products,Services, FinalRegister , ResetPassword} from './pages/public'
import path from './ultils/path'
import {getCategories} from './store/app/asyncActions'
import { useDispatch} from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  },[])


  return (
    <div className="text-[30px]">
      <Routes>
        <Route path = {path.PUBLIC} element ={<Public />}>
          <Route path={path.HOME} element = {<Home />}/>
          
          <Route path={path.BLOGS} element = {<Blogs />}/>
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element = {<DetailProduct />}/>
          <Route path={path.FAQ} element = {<FAQ />}/>
          <Route path={path.OUR_SERVICES} element = {<Services />}/>
          <Route path={path.PRODUCTS} element = {<Products />}/>
          <Route path={path.RESETPASSWORD} element = {<ResetPassword />}/>
        </Route>
          <Route path={path.FINAL_REGISTER} element = {<FinalRegister />}/>
        <Route path={path.LOGIN} element = {<Login />}/>
      </Routes>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
