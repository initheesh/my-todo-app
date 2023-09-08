import React from 'react'
import App from './App'
import {Routes,Route}  from 'react-router-dom'
import LoginPage from './LoginPage'
const Master = () => {
  return (
    <div>
      <Routes> 
        <Route path='/' element={<App/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default Master
