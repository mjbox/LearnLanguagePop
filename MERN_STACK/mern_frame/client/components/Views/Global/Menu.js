import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="header-wrap">
            <Link to="/" > Home |</Link>
            <Link to="/about" > About |</Link>
            <Link to="/create" > Create |</Link>
            <Link to="/about/test?filter=top2&origin=im" > Test1 |</Link>
            <Link to="/test/big_buck_bunny.mp4?type=local" > Test2 </Link>
        </div>
    );
};
export default Menu;