import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <div style={{ width: '200px', background: '#eee', padding: '1rem' }}>
        <h3>Menu</h3>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/support-tickets">Support Tickets</Link></li>
        </ul>
    </div>
);

export default Sidebar;
