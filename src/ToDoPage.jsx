import React,{useEffect, useState} from "react";
import {AiOutlinePlus, AiOutlineLogout} from 'react-icons/ai'
import Todo from "./Todo";
import {db} from './Firebase'
import {doc,  collection, onSnapshot,query, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { UserAuth } from "./AuthContext";


const style={
  bg:`bg-gradient-to-b from-green-600 via-lime-600 to-green-500 w-screen h-screen grid place-items-center`,
  container:` bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg
" max-w-[500px] w-full m-auto rounded-md shadow-xl p-3 `,
  heading:`text-3xl font-bold text-center p-2`,
  form:`flex justify-between mb-6`,
  input:`w-full boder p-1 text-xl`,
  btn:`ml-1 border p-2 bg-green-400 text-slate-100`,
  logout:`flex justify-between place-items-center gap-2 text-xl  font-bold bg-white border px-3 py-1 rounded-3xl cursor-pointer text-green-400 hover:scale-110 transition-transform`
}

const ToDoPage = () => {
  const [todos,setTodos] =  useState([])
  const [input,setInput] = useState('')
  const {logOut,user} = UserAuth()

  const handleLogout = async ()  =>{
    await logOut()
  }
//updating todo
const toggleCompleted = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };
  
  //deleting todo
  const deleteTodo = async(todo)=>{
    await deleteDoc(doc(db,'todos',todo.id))
  }

  //creating to do
  const createTodo = async(e)=>{
    e.preventDefault(e)
    if(input===''){
      alert("Empty String")
      return
    }
    await addDoc(collection(db,'todos'),{
      text:input,
      completed:false,
      uid : user.uid
    })
    setInput('')
  }

  //reading todos from firebase
  useEffect(() => {
   const q = query(collection(db,'todos'))
   const unsubscribe = onSnapshot(q,(querySnapshot)=>{
    let todoArr = []
    querySnapshot.forEach((doc)=>{
      
      if(doc.data().uid === user.uid){
        todoArr.push({...doc.data(), id:doc.id}) 
      }
    });
    setTodos(todoArr)
   })
   return ()=> unsubscribe()
  }, [])
  

  return (
        <div className={style.bg}>
      <div className={style.container}>
          <h2 className={style.heading}>My TODOS</h2>
          <form className={style.form} onSubmit={createTodo}>
            <input type="text" className={style.input} placeholder="Enter the todo" value={input} onChange={(e)=>setInput(e.target.value)} />
            <button className={style.btn}> <AiOutlinePlus size={30}> </AiOutlinePlus> </button>
          </form>
          <ul>
            {todos.map((todo,index)=>{
              
              return(
            <Todo key={index} todo={todo} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo}/>
          )})}          
          </ul>
          
      </div>
      <div className={style.logout} onClick={handleLogout}> Logout : <AiOutlineLogout size={30} /></div>
    </div>
  )
}

export default ToDoPage
