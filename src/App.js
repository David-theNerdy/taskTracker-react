// @ts-nocheck
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from 'react';
import  AddTask  from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route} from 'react-router-dom';


function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  //Fetch Tasks
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks');           //res: response, fetch return a promise
    const data = await res.json();
    
    return data;
  }

  useEffect(() => {
    const getTasks = async() =>{
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    }
    getTasks();
  }, []) //this will automatically run when you access to the server?
    //this is an immutable array, so if you want to update it, you have to use setTasks, make a copy and then update tasks.
    //put element here make it a global variable, so it can be accessed any where in your app


  //Fetch Task:
  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`);           //res: response, fetch return a promise
    const data = await res.json();
    return data;
  }
  
  //Add Task
  const addTask = async (newTask) =>{
    newTask.id = +(Date.now()+"").slice(-9,-2);
    let res = await fetch(`http://localhost:5000/tasks`,{
      method: "POST",
      headers:{
        "Content-type": "application/json"
        //let the HTTP knows this is a JSON file
      },
      body: JSON.stringify(newTask)
    });
    let data = await res.json();
    //Reminder: Because task here is an aray so .length works, not in the case of Object! (alternative is Map object)
    setTasks([...tasks,data]) //or setTasks([...task, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: "DELETE"
    });
    //we don't have to save it as an variable here because we don't receive any data back
    setTasks(tasks.filter(el => el.id !== id))
    //notice that we have to use method that return a new array here because the tasks (useState) is immutable by default. Same for the toggle reminder below
  };
  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id);
    const updateTask = {...taskToggle, reminder: !taskToggle.reminder}

    let res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: "PATCH",
      headers: {
        "Content-type" : "application/json" // HEY cuzzy!!! application.json WILL NOT work and it will fail silently.
      },
      body: JSON.stringify(updateTask)
    });
    let data = await res.json()
    console.log(res)
    setTasks(tasks.map(el =>
      el.id === id ? { ...el, reminder: data.reminder } : el));
    // setTasks([...tasks.filter(el => el.id !==id),data])
    // this work but it will list the changed task to the bottom, you know why
  };

   return (

    <Router>
    <div className="container">
      <Header 
      onAdd={() => setShowAddTask(!showAddTask) } 
      showAdd={showAddTask}
      />

      <Route path="/" exact render={(props) =>(
        <>
      {showAddTask && <AddTask onAdd={addTask}/>}

      {tasks.length > 0 ? 
      <Tasks x={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : <h3>Find things to do cuzzy</h3>}
      </>     
      )} />

      <Route path="/about" component={About}/>
      <Route path="/" exact component={Footer} />
    </div>
    
    </Router>
    //onDelete: state get passed down, action pass up
    //<h2></h2> <- Try this
    //This is JSX syntax, and you can only put return 1 single element is this return!!!! 
    //if you don't want a <div> around it: <> </> instead
  );
}
export default App;

//Use class:
/*
import React from 'react';
class App extends React.Component{
  render(){
    return <h1> </h1>;
  }
}

*/

