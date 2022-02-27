import React from 'react'

//  Import custom useAuthContext Hook to get access to global context

import { useAuthContext } from '../hooks/useAuthContext'

// import the custom logout hook

import { useLogout } from '../hooks/useLogout'

// React Router Link

import { Link } from 'react-router-dom'

// CSS Module

import styles from './Navbar.module.css'

export default function Navbar() {

    // destructure the logout function from useLogout

    const { logout } = useLogout();

    const { user } = useAuthContext();


    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>Finance Tracker</li>
                {!user && (
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}

                {user && (
                    <>
                        <li>
                            Hello, {user.displayName}
                        </li>
                        <li><Link to="/">Home </Link></li>
                        <li>
                            <button className="btn" onClick={logout}>Logout</button>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    )
}
