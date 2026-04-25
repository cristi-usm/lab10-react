import { useLocation, useNavigate } from "react-router"
import {useAuth} from "../hooks/useAuth"

export const LoginPage = () =>{
    const {unlock} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "docs/private/secrets-builds"

    function handleUnlock(){
        unlock()
        navigate(from, {replace: true})
    }

    return (
    <div>
        <div>🔒</div>
        <h4>Dev Access Required</h4>
        <p>
        This section contains internal developer notes and pre-release content. Click below to unlock access.
        </p>
        <button onClick={handleUnlock}>
        Unlock Dev Access
        </button>
    </div>
    )
}