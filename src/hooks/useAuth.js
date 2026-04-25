import { useContext } from "react"
import { AuthContext } from "../context/createContext"


export const useAuth = () =>{
    return useContext(AuthContext)
}