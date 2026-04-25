import { useState } from "react"
import { HistoryContext } from "./createContext"


export const HistoryProvider = ({children}) =>{
    const [visited, setVisited] = useState([])

    function addVisit(page){
        setVisited((p)=>{
            const filtered = p.filter((p)=> p.id !== page.id)
            return [page, ...filtered].slice(0, 10)
        })
    }

    function clearHistory(){
        setVisited([])
    }

    return(
        <HistoryContext.Provider value={{visited, addVisit, clearHistory}}>
            {children}
        </HistoryContext.Provider>
    )
}