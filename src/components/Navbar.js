import React from 'react'

// React Router Link

import { Link } from 'react-router-dom'

// CSS Module

import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>Finance Tracker</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>


            </ul>
        </nav>
    )
}
