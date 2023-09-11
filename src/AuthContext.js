import { useContext,createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth'
import { auth } from "./Firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{

    const [user,setUser] =useState({})
    const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  useEffect(()=>{
    const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
    })
    return()=>{
        unsubcribe()
    }
  },[])

  const logOut = () =>{
    signOut(auth)
  }

    return(
        <AuthContext.Provider value={{googleSignIn,user,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
  return useContext(AuthContext);
};