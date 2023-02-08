import React, { useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    return storedToken;
};

function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    const loginHandler = (token, expiresIn) => {
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expiresIn);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime")
    };

    const [token, setToken] = useState(tokenData);

    if (token) {
        const decodedJwt = parseJwt(tokenData);

        if (decodedJwt.exp * 1000 < Date.now()) {
            logoutHandler();
        }
    }

    const userIsLoggedIn = !!token;

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;