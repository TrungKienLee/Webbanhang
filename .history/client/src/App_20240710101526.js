import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {Home, Login, Public} from './pages/public'
import path from './ultils/path'
import {} from './store/'
function App() {
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
