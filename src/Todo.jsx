import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
const style ={
    li:`flex justify-between p-2 my-4 border-2 rounded-md bg-green-100 hover:bg-green-400`,
    row:`flex `,
    text:`p-1 text-lg cursor-pointer`
}

const Todo = ({todo,toggleCompleted ,deleteTodo}) => {
  return (
    
    <li className={style.li}>
        <div className={style.row}>
            <input type="checkbox" onChange={()=>toggleCompleted(todo)} checked={todo.completed ? 'checked' : ''}/>
            <p className={style.text} onClick={()=>toggleCompleted(todo)}>{todo.text}</p>   
        </div>
        <button onClick={()=>deleteTodo(todo)}> {<AiFillDelete/>} </button>    
    </li>
  )
}

export default Todo
