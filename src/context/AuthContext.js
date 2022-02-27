// immport context and reducer hooks from react

import { createContext, useEffect, useReducer } from 'react'
import { projectAuth } from '../firebase/config';

// initialize a new context

export const AuthContext = createContext();


//  #4 create the authReducer function
//  create a reducer function to handle actions
//  this will take in the current state as well as the action (dispatch)
//  this will require a switch statement
//  make sure to spread out the current state to capture any properties that already exist
// add whatever the payload from the action is


export const authReducer = (state, action) => {

    //  make the login case for when we dispatch the login action
    //  spread current state, add the user which is action.payload
    //  the type of action is 'LOGIN' and the payload is the user object in this example
    // where do we dispatch the action from?  inside of useSignup custom hook

    switch (action.type) {
        case 'LOGIN':
            return ({ ...state, user: action.payload })

        case 'LOGOUT':
            return ({ ...state, user: null })

        case 'AUTH_IS_READY':
            return ({ ...state, user: action.payload, authIsReady: true })
        default:
            return state
    }
}

// #2 Auth Context Provider => it wraps the provider of the context

//  This is the function that we are wrapping are App Component With
//  This takes in the children as a prop (i.e., the App)
//  Specify the reducer function and some initial state

// return the template which is the AuthContext.Provider (this provides the context we are storing globally) => children is whatever is wrapped inside of the provider

export const AuthContextProvider = ({ children }) => {

    // #3 initialize state and reducer function
    // specify initial state and reducer function
    // when we dispatch the action we update the state 

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    // communicate with firebase on change in authentication state

    useEffect(() => {

        //  this only needs to fire once initially to establish the initial user 
        //  so we need to be able to cancel it after we perform it once
        const unsub = projectAuth.onAuthStateChanged((user) => {

            //  Dispatch AUTH_IS_READY Action and get logged in user
            dispatch({ type: 'AUTH_IS_READY', payload: user })

            // When we invoke unsub() we unsubscribe from the onAuthStateChanged listener
            //  Another way to put this: it unsubscribes the observable - namely the auth state
            unsub()
        })
    }, [])

    // console loging the state as it changes

    console.log('AuthContext state: ', state)

    //  we can store the vbalue of the state inside of the context provider
    //  this is stored in the value prop and needs to be an object
    //  the object will have the state spread out, as well as the result of the dispatch
    //  adding the dispatch function to the value will allow us to access it later on in custom hooks directly

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}