import { useState } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router"
// import { useKeyBoardSearch} from "../hooks/useKeyboardSearch"

export const Layout = () =>{
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("")
    // useKeyBoardSearch("")


    function handleSearchSubmit(e){
        e.preventDefault()
        if(searchInput.trim()){
            navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
            setSearchInput("")
        }
    }


    return (
        <div>
            <nav>
                <div>
                    <Link to="/" >
                    LOGO LINK
                    </Link>

                    <div>
                        <form onSubmit={handleSearchSubmit}>
                            <input type="text" value={searchInput} onChange={()=>setSearchInput(Element.target.value)} />

                        </form>
                        <NavLink to="/" end >Home</NavLink>
                        <NavLink to="/docs" >Docs</NavLink>
                        <NavLink to="/search">Search</NavLink>
                        <NavLink to="/history">History</NavLink>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer>
                <div>
                    <span>.... project ...</span>
                    <div>
                        <a href="#discord">Discord</a>
                        <a href="#redit">Redit</a>
                    </div>
                </div>
            </footer>

        </div>
    )


}