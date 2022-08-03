import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";


const getLocalStorage =()=>{
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    }
    else{
        return[]
    }
}


function GroceryBud() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle Submit...!");
    if (!name) {
      showAlert(true, "danger", "plz enter value");
      // setAlert({show: true, msg:'plz enter value',type:'danger' })
    } else if (name && isEditing) {
      setList(
        list.map((i) => {
          if (i.id === editID) {
            return { ...i, title: name };
          }
          return i;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "update item");
    } else {
      showAlert(true, "success", "item added to list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const remItem = (id) => {
    showAlert(true, "danger", "remove item");
    setList(list.filter((i) => i.id !== id));
  };
  const updateItem = (id) => {
    const selectedItem = list.find((i) => i.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(selectedItem.title);
  };

  useEffect(()=>{
      localStorage.setItem('list', JSON.stringify(list))
  },[list]);
  return (
    <section >
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} remAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div>
          <input
            type="text"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{isEditing ? "edit" : "submit"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div>
          <List item={list} remItem={remItem} updateItem={updateItem} />
          <button onClick={clearList}> clear items</button>
        </div>
      )}
    </section>
  );
}

export default GroceryBud;
