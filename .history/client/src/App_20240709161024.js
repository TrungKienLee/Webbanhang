import React from 'react';
import {Route, Routes} from 'react-'
import {Home, Login, Public} from './pages/public'
import path from './ultils/path'
function App() {
  return (
    <div className="text-[30px]">
      <Routes>
        <Route path = {path.PUBLIC} element ={<Public />}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
