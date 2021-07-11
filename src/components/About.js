import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h4>Version 1.0.0</h4>
            <Link to="/">Go Back </Link>
        </div>
    )
}
//Replace <a> by <Link> to prevent the page to reload
export default About
