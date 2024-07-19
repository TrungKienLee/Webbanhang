import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Home, Login, Public, Blogs,DetailProduct,FAQ,Products,Services} from './pages/public'
import path from './ultils/path'
import {getCategories} from './store/asyncActions'
import { useDispatch} from 'react-redux'
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
          <Route path={path.LOGIN} element = {<Login />}/>
          <Route path={path.BLOGS} element = {< />}/>
          <Route path={path.LOGIN} element = {<Login />}/>
          <Route path={path.LOGIN} element = {<Login />}/>
          <Route path={path.LOGIN} element = {<Login />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
