import {useState} from 'react';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
const [error, setError] = useState(null)
const [isPending, setIsPending] = useState(false)

const signup = async (email, password, displayName) => {

            // State Handling
            setError(null)
            setIsPending(true)

            // Try Catch
            try {

               const response = await projectAuth.createUserWithEmailAndPassword(email, password)
               console.log(response.user)

               if (!response) {
                   throw new Error('Could not complete signup request')
               }

               // display name

               response.user.updateProfile({ displayName })

               setIsPending(false)
               setError(null)

            } catch (err) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
}

return {error, isPending, signup}

}