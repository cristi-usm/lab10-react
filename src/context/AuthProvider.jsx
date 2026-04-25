import { useState } from "react"
import { AuthContext } from "./createContext"


export const AuthProvider = ({children}) => {
    const [isUnlocked, setIsUnlocked] = useState(false)

    function unlock(){
        setIsUnlocked(true)
    }

    function lock(){
        setIsUnlocked(false)
    }

    return(
        <AuthContext.Provider value={{isUnlocked, unlock, lock}}>
            {children}
        </AuthContext.Provider>
    )
}