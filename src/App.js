import React,{useEffect, useState} from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from "./Todo";
import {db} from './Firebase'
import {doc,  collection, onSnapshot,query, updateDoc } from "firebase/firestore";

const style={
  bg:`bg-slate-500 w-screen h-screen`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-3`,
  heading:`text-3xl font-bold text-center p-2`,
  form:`flex justify-between`,
  input:`w-full boder p-1 text-xl`,
  btn:`ml-1 border p-2 bg-green-500 text-slate-100`
}

function App() {
  const [todos,setTodos] =  useState([])

const toggleCompleted = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  useEffect(() => {
   const q = query(collection(db,'todos'))
   const unsubscribe = onSnapshot(q,(querySnapshot)=>{
    let todoArr = []
    querySnapshot.forEach((doc)=>{
      todoArr.push({...doc.data(), id:doc.id})
    });
    setTodos(todoArr)
   })
   return ()=> unsubscribe
  }, [])
  

  return (
    <div className={style.bg}>
      <div className={style.container}>
          <h2 className={style.heading}>My TODOS</h2>
          <form className={style.form}>
            <input type="text" className={style.input} placeholder="Enter the todo" />
            <button className={style.btn}> <AiOutlinePlus size={30}> </AiOutlinePlus> </button>
          </form>
          <ul>
            {todos.map((todo,index)=>{
              console.log(todo.id)
              return(
            <Todo key={index} todo={todo} toggleCompleted={toggleCompleted}/>
          )})}          
          </ul>
          
      </div>
    </div>
  );
}

export default App;
