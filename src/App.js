import React from "react";
import {Route,Routes} from 'react-router-dom'
import LoginPage from './LoginPage'
import ToDoPage from "./ToDoPage";
import { UserAuth } from "./AuthContext";


function App() {
 
  const {user} = UserAuth()

  return (
    <div>
    {user?.displayName ? <ToDoPage/> : <LoginPage/> }
      <Routes> 
        <Route path='/' element={<ToDoPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
