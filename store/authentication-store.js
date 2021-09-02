import React, { useEffect, useMemo, useState, useCallback, useContext, useReducer } from "react";
import axios from "axios";

const AuthenticationContext = React.createContext({
    handleAppAccess: (email, password) => {},
    handleLogOut: () => {}
});


export const AuthenticationContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginUrl = "http://localhost:3000/users/sign_in"
    const registerUrl = "http://localhost:3000/users"
    const logoutUrl = "http://localhost:3000/users/sign_out"

    const handleAppAccess = async (type, email, password) => {
        console.log(type)
        const accessUrl = type === "login" ? loginUrl : registerUrl
        const user = { "user": { "email": email, "password": password }}
        try {
            let response = await axios.post(accessUrl, user)
            localStorage.setItem("token", response.headers.authorization)
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogOut = async () => {
        console.log('logging out')
        try {
            let response = await axios.delete(logoutUrl, {headers: {'Authorization': `${localStorage.token}`}})
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <AuthenticationContext.Provider
            value={{
                handleAppAccess: handleAppAccess,
                handleLogOut: handleLogOut
            }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    )

}

export default AuthenticationContext