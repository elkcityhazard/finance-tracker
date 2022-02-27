// Need for some local state
import { useEffect, useState } from 'react'

// project auth from firebase config to use the auth service to log out user
import { projectAuth } from '../firebase/config'

//  this is to dispatch the login action 
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    //  get access to dispatch function to dispatch login action
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign out the user

        try {

            const response = await projectAuth.signInWithEmailAndPassword(email, password);

            // dispatch login action

            // don't need to provide a payload since the user will become null

            dispatch({ type: 'LOGIN', payload: response.user })

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

    return { login, error, isPending }
}
