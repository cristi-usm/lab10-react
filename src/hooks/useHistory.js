import { useContext } from "react"
import { HistoryContext } from "../context/createContext"


export const useHistory = () =>{
    return useContext(HistoryContext)
}