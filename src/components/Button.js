import PropTypes from 'prop-types';  
import React from 'react'

const Button = ({color,text,onClick}) => {

    return (
        <div>
            <button 

            onClick={onClick} //this passed in as a prop, so you will have to catch it. Also this will call the onClick then send it to the Header   
            className="btn"   
            style={{backgroundColor: color}}

            >
                {text}
            </button>
        </div>
    )
}

Button.defaultProps = {
    color: 'green', ///???? what is this color belonged to?
    //overrided by setting color in Header.js
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}
export default Button
