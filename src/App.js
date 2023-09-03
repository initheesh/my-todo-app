import React,{useEffect, useState} from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from "./Todo";
import {db} from './Firebase'
import {doc,  collection, onSnapshot,query, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

const style={
  bg:`bg-gradient-to-b from-green-600 via-lime-600 to-green-500 w-screen h-screen flex`,
  container:` bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg
" max-w-[500px] w-full m-auto rounded-md shadow-xl p-3 `,
  heading:`text-3xl font-bold text-center p-2`,
  form:`flex justify-between mb-6`,
  input:`w-full boder p-1 text-xl`,
  btn:`ml-1 border p-2 bg-green-400 text-slate-100`
}

function App() {
  const [todos,setTodos] =  useState([])
  const [input,setInput] = useState('')
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
      completed:false
    })
    setInput('')
  }

  //reading todos from firebase
  useEffect(() => {
   const q = query(collection(db,'todos'))
   const unsubscribe = onSnapshot(q,(querySnapshot)=>{
    let todoArr = []
    querySnapshot.forEach((doc)=>{
      todoArr.push({...doc.data(), id:doc.id}) 
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
              console.log(todo.id)
              return(
            <Todo key={index} todo={todo} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo}/>
          )})}          
          </ul>
          
      </div>
    </div>
  );
}

export default App;
