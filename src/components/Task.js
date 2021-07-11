import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaTimes } from 'react-icons/fa';



const Task = ({task,onDelete,onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} 
        onDoubleClick={()=>onToggle(task.id)}>
            <h3>
                {task.text} 
                <FaTimes className="x-button"
                onClick={() => onDelete(task.id)}/>
            </h3>
            <p>{task.date}</p>
        </div>
    )
}
/* <FontAwesomeIcon icon={faTimes} />  */
//After installed frontAwesome you have to restart the server
//Otherwise, it will "Failed to compile" and "Module not found"

//why here has to be {task}? because in file Tasks.js you put in a prop task = {el}

export default Task
