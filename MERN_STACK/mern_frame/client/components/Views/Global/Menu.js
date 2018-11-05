import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <Link to="/" > Home |</Link>
            <Link to="/about" > About |</Link>
            <Link to="/create" > Create |</Link>
            <Link to="/about?filter=top2&origin=im" > Test </Link>
            <hr/>
        </div>
    );
};
export default Menu;