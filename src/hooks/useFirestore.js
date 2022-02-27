
// Add and remove documents from firestore collection

//  Will need to use reduce to fire actions, useEffect to cleanup the hook, state as part of cleanup

import { useReducer, useEffect, useState } from "react";

//  need projectFirestore to access the database, duh!

import { projectFirestore, timestamp } from "../firebase/config";


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}


const firestoreReducer = (state, action) => {
    switch (action.type) {

        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }

        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }

        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }

        default:
            return state
    }
}


// Create the custom useFirestore Hook

export const useFirestore = (collection) => {

    // response represents the response we get back from firestore
    //  dispatch is to dispatch actions based on the response we get back

    //  specify the firestore Reducer (the reducer we want to use and initial state)

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)


    // Collection ref

    const ref = projectFirestore.collection(collection)

    // Only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }


    //  Add document

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })

        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //  Delete Document

    const deleteDocument = async (id) => {

    }

    //  Cleanup function

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}

