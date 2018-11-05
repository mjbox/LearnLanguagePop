import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <Link to="/" > Home |</Link>
            <Link to="/about" > About |</Link>
            <Link to="/CreateView" > CreateView |</Link>
            <Link to="/about?filter=top2&origin=im" > About top2 im </Link>
            <hr/>
        </div>
    );
};
export default Menu;