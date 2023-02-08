import React, { useContext } from "react";
import AuthContext from '../store/auth-context'

function NavBar() {

    const authCtx = useContext(AuthContext);

    const Logout = () => {
        authCtx.logout()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Note It!</a>
                <div className="navbar-nav">
                    <a className="nav-link text-light" onClick={Logout}>Logout</a>
                </div>
            </div>
        </nav>
    )
}

export default NavBar