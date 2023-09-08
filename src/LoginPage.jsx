import React from 'react'
import GoogleButton from 'react-google-button'
import {signInWithPopup} from 'firebase/auth'
import {auth,provider} from './Firebase'
import { useNavigate } from 'react-router-dom';


const style = {
  login:`w-full h-screen flex justify-center place-items-center`
}


const LoginPage = () => {
  
  const loginPress = () =>{
  signInWithPopup(auth,provider).then((result)=>{
    navigate('/')
  }).catch((error)=>{console.log(error)})
}
  const navigate = useNavigate()
  return (
    <div className={style.login}>
      <GoogleButton onClick={loginPress}/>
      
    </div>
  )
}

export default LoginPage
