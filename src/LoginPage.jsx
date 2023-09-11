import React, { useEffect} from 'react'
import GoogleButton from 'react-google-button'
import { UserAuth } from './AuthContext'
import {useNavigate} from 'react-router-dom'



const style = {
  login:`w-full h-screen flex justify-center place-items-center`
}


const LoginPage = () => {


  const navigate = useNavigate()
  const {googleSignIn,user} = UserAuth()
  const handleGoogleSignIn = async ()=>{
    try{
      await googleSignIn()
    }
    catch(error){
      console.log("login error " + error)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user,navigate]);


  return (
    <div className={style.login} >
      <GoogleButton onClick={handleGoogleSignIn}/>
    </div> 
  )
}

export default LoginPage
