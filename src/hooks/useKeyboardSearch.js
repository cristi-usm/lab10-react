import { useEffect } from "react"
import { useNavigate } from "react-router"

export const useKeyboardSearch = () =>{
    const navigate = useNavigate()

    useEffect(()=>{
        function handleKey(e){
            if(e.ctrlKey && e.key === "k"){
                e.preventDefault()
                navigate("/search")
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [navigate])
}