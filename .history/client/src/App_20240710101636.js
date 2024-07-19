import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Home, Login, Public} from './pages/public'
import path from './ultils/path'
import {getCategories} from './store/asyncAction'
import { useDispatch} from 'react-redux'
function App() {
  const 


  return (
    <div className="text-[30px]">
      <Routes>
        <Route path = {path.PUBLIC} element ={<Public />}>
          <Route path={path.HOME} element = {<Home />}/>
          <Route path={path.LOGIN} element = {<Login />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
