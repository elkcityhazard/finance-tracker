//  need to import useContext 

import { useContext } from "react"

//  import AuthContext from context folder => so we can use our AuthContext 
import { AuthContext } from "../context/AuthContext"


// #3 Create custom AuthContext Hook


export const useAuthContext = () => {
    // consume the context by creating a new context and pass in the AuthContext
    const context = useContext(AuthContext)

    //  Throw an error if there is no AuthContext Provided to the hook
    if (!context) {
        throw Error('useAuthContext must be inside an AuthContext Provider')
    }

    //  Return the value of the context

    return context
}