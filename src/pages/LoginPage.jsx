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
    <div className="container py-5 text-center" style={{ maxWidth: "400px" }}>
        <h5 className="fw-bold mb-2">🔒 Dev Access Required</h5>
        <p className="text-muted mb-4" style={{ fontSize: "0.88rem" }}>
        This section contains internal developer notes. Click below to unlock.
        </p>
        <button onClick={handleUnlock} className="btn btn-primary px-5">
        Unlock Dev Access
        </button>
    </div>
    )
}