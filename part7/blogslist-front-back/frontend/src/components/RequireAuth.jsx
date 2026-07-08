import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useLoggedUserStore } from "../store/loggedUserStore"


const RequireAuth = () => {
    const isLoggedIn = useLoggedUserStore(state => state.isLoggedIn)
    const hasCheckedAuth = useLoggedUserStore(state => state.hasCheckedAuth)
    const location = useLocation()
    
    if(!hasCheckedAuth) return null //wait for verification of login
    
    //if its not logged in, go to /login
    if( !isLoggedIn ) return <Navigate to={'/login'} state={{from: location}}  replace />


    return <Outlet />
}


export default RequireAuth