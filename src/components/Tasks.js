import React from 'react';
import Task from './Task';

const Tasks = ({x, onDelete, onToggle}) => {
    //why tasks is put inside the {}?
    return (
        <>
            {x.map(el => (
            <Task key={el.id} task={el}  
            onDelete={onDelete} 
            onToggle={onToggle}
            />))}
        </>
    )
    //task ={el} : pass in each task as a prop. {el} is a prop
}
//el.id provides for each h3 an unique id
export default Tasks
