import React, { useEffect, useMemo, useState, useCallback, useContext, useReducer } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

const AuthenticationContext = React.createContext({
    handleAppAccess: (email, password) => {},
    handleLogOut: () => {}
});


export const AuthenticationContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginUrl = `${process.env.API_URL}/users/sign_in`
    const registerUrl = `${process.env.API_URL}/users`
    const logoutUrl = `${process.env.API_URL}/users/sign_out`
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleAppAccess = async (type, email, password) => {
        const accessUrl = type === "login" ? loginUrl : registerUrl
        const user = { "user": { "email": email, "password": password }}
        try {
            let response = await axios.post(accessUrl, user)
            localStorage.setItem("token", response.headers.authorization)
            setCookie("token", response.headers.authorization, { 
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true 
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogOut = async () => {
        console.log('logging out')
        try {
            await axios.delete(logoutUrl, {headers: {'Authorization': `${localStorage.token}`}})
            localStorage.removeItem('token');
            removeCookie('token')

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