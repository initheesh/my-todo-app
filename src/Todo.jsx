import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
const style ={
    li:`flex justify-between p-2 my-2 border`,
    row:`flex`,
    text:`p-1 text-xl cursor-poiner`
}

const Todo = ({todo}) => {
  return (
    <li className={style.li}>
        <div className={style.row}>
            <input type="checkbox" />
            <p className={style.text}>{todo.text}</p>   
        </div>
        <button> {<AiFillDelete/>} </button>    
    </li>
  )
}

export default Todo
