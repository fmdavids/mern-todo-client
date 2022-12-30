import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //Add item function
  const [todoItem, setTodoItem] = useState("");
  const [addItem, setAddItem] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [addUpdateTodoItem, setAddUpdateTodoItem] = useState("")

  const handleTodoItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-todo-app-backend.onrender.com/api/item", {
        item: todoItem,
      });
      setAddItem((prev) => [...prev, res.data]);
      setTodoItem("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTodoItem = async () => {
      try {
        const res = await axios.get("https://mern-todo-app-backend.onrender.com/api/items");
        setAddItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTodoItem();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://mern-todo-app-backend.onrender.com/api/remove/${id}`);
      const newTodo = addItem.filter((item) => item._id !== id);
      setAddItem(newTodo);
    } catch (error) {
      console.log(error);
    }
  };
  // uPDATE TODO

  const updateTodo = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`https://mern-todo-app-backend.onrender.com/api/item/${isUpdating}`,{item: addUpdateTodoItem});
      // console.log(res.data);
      const addUpdatedIndex = addItem.findIndex(item => item._id === isUpdating)
      const updatedItem = addItem[addUpdatedIndex].item = addUpdateTodoItem
      setAddUpdateTodoItem("")
      setIsUpdating("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>MERN TODO APP</h1>
      <div className="taskWraper">
        <form action="" onSubmit={(e) => handleTodoItem(e)}>
          <input
            type="text"
            onChange={(e) => {
              setTodoItem(e.target.value);
            }}
            value={todoItem}
          />
          <button type="submit">Add</button>
        </form>
        {addItem.map((item, key) => (
          <div className="" key={key}>
            {
            isUpdating === item._id ? 
              <form onSubmit={(e) => {updateTodo(e)}}>
                <input type="text" onChange={(e) =>{setAddUpdateTodoItem(e.target.value)}} value={addUpdateTodoItem} />
                <button type="submit">Update</button>
              </form>
             : 
              <>
                <p >{item.item}</p>
                <button onClick={() => {setIsUpdating(item._id)}}>Edit</button>
                <button onClick={() => {handleDelete(item._id)}}>Delete</button>
              </>
            }
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
