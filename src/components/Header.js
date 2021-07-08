//Files with Uppercase at the first letter is a convention for components.
//rafce Enter with ES7 extension
import PropTypes from 'prop-types'; 
import React from 'react';
import Button from './Button';

const Header = ({title}) => {
    let onClick = () =>{
        console.log("click")
    }
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button
             color="black" 
             text="Add" 
             onClick = {onClick} //there are many other events that you can add double-click, summit,..
             />
        </header>
        
    )
}

Header.defaultProps ={
    title: 'Task Tracker',
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
//Header is the file name

