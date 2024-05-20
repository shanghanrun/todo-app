import React from "react";
import TodoItem from './TodoItem'

const TodoBoard = ({todoList}) => {
  return (
    <div>
      <h2>Todo List</h2>
      { todoList? (todoList.map((task)=>(
        <TodoItem key={task._id} task={task} />
      )))
      : (<h2>There is no Item to show</h2>)
      }
      
    </div>
  );
};

export default TodoBoard;
