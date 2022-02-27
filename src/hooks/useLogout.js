// Need for some local state
import { useEffect, useState } from 'react'

// project auth from firebase config to use the auth service to log out user
import { projectAuth } from '../firebase/config'

//  this is to dispatch the logout action 
import { useAuthContext } from './useAuthContext'

// don't forget to export the hook or else you won't be able to logout :-)

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    //  get access to dispatch function to dispatch logout action
    const { dispatch } = useAuthContext();


    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign out the user

        try {
            await projectAuth.signOut();

            // dispatch logout action

            // don't need to provide a payload since the user will become null

            dispatch({ type: 'LOGOUT' })

            // Update State

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }

    }

    // Need useEffect to fire off cleanup function
    // Manual cleanup function where when the componenet unmounts we set cancelled to true 

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}