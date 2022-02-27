import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

// # 1 Import Auth Context from useAuthContext (need access to dispatch since we passed it through as a value in the provider) 
//  To Dispatch User Login Action (i.e., signup/login)

import { useAuthContext } from './useAuthContext';


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // #2 Destructure dispatch function from useAuthContext to gain access to dispatch function

    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {

        // State Handling
        setError(null)
        setIsPending(true)

        // Try Catch
        try {
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!response) {
                throw new Error('Could not complete signup request')
            }

            // display name

            response.user.updateProfile({ displayName })

            // #3 Dispatch Login Action

            // Dispatch needs 2 properties: type, payload
            //  type of action and payload to be stored

            dispatch({ type: 'LOGIN', payload: response.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }

}