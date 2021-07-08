import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from 'react';


function App() {
  const [tasks,setTasks] = useState( [
    //this is an immutable array, so if you want to update it, you have to use setTasks, make a copy and then update tasks.
    //put element here make it a global variable, so it can be accessed any where in your app
    {
        id:1,
        text: 'Doctore App',
        date: 'Monday',
        time: "9pm",
        reminder: true,
    },
    {
        id:2,
        text: 'Meeting',
        date: 'Tuesday',
        time: "6am",
        reminder: true,
    },
    {
        id:3,
        text: 'Study',
        date: "Wed",
        time: "12m",
        reminder: false,
    },
]);

//Delete Task
const deleteTask =(id)=>{
  setTasks(tasks.filter(el => el.id !== id))
  //notice that we have to use method that return a new array here because the tasks is immutable by default. Same for the toggle reminder below
};
//Toggle Reminder
const toggleReminder=(id)=>{
  setTasks(tasks.map(el => 
    el.id === id ? {...el,reminder: !el.reminder} : el));
};


  return (
    <div className="container">
      <Header />
    {tasks.length >0 ? <Tasks  x={tasks} 
    onDelete = {deleteTask} 
    onToggle={toggleReminder}/> : <h3>Find things to do cuzzy</h3>}
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

