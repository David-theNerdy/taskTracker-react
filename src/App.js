// @ts-nocheck
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from 'react';
import  AddTask  from "./components/AddTask";

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
  }, [])

    //this is an immutable array, so if you want to update it, you have to use setTasks, make a copy and then update tasks.
    //put element here make it a global variable, so it can be accessed any where in your app
    // {
    //   id: 1,
    //   text: 'Doctore App',
    //   date: 'Monday',
    //   time: "9pm",
    //   reminder: true,
    // },
    // {
    //   id: 2,
    //   text: 'Meeting',
    //   date: 'Tuesday',
    //   time: "6am",
    //   reminder: true,
    // },
    // {
    //   id: 3,
    //   text: 'Study',
    //   date: "Wed",
    //   time: "12m",
    //   reminder: false,
    // },

  
  //Add Task
  const addTask = (newTask) =>{
    newTask.id = tasks.length+1;
    //Reminder: Because task here is an aray so .length works, not in the case of Object! (alternative is Map object)
    setTasks(tasks.concat(newTask)) //or setTasks([...task, newTask])
  }

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(el => el.id !== id))
    //notice that we have to use method that return a new array here because the tasks (useState) is immutable by default. Same for the toggle reminder below
  };
  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map(el =>
      el.id === id ? { ...el, reminder: !el.reminder } : el));
  };


  return (
    <div className="container">
      <Header 
      onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask}/>}

      {tasks.length > 0 ? 
      <Tasks x={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : <h3>Find things to do cuzzy</h3>}
    </div>
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

