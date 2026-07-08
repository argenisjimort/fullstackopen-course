import { Link } from "react-router-dom"
import { useLoggedUserStore } from "../store/loggedUserStore"
import { useThemeStore } from "../store/themeStore"
const Header = () => {

    const logOut = useLoggedUserStore(state => state.logOut)
    const isLoggedIn = useLoggedUserStore(state => state.isLoggedIn)

    const changeTheme = useThemeStore(state => state.changeTheme)


    return (
        <header className="header" >
            <div className="header-content">
                <Link to={`/`} className="header-brand"> <h2>BlogsApp</h2> </Link>
                <nav className="header-nav">
                    <Link to={`/users`} className="nav-option" >Users</Link>
                    <Link to={`/blogs`} className="nav-option" >Blogs</Link>
                    <button className="button nav-option" onClick={changeTheme}> Change Theme </button>
                    {isLoggedIn &&
                        <button onClick={logOut} className="nav-option" > log Out </button>
                    }
                </nav>

            </div>
        </header>
    )
}

export default Header