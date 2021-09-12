import React, { useEffect, useMemo, useState, useCallback, useContext, useReducer } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'

const AuthenticationContext = React.createContext({
    handleAppAccess: (email, password) => {},
    handleLogOut: () => {}
});


export const AuthenticationContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginUrl = `${process.env.API_URL}/api/login`
    const registerUrl = `${process.env.API_URL}/api/signup`
    const logoutUrl = `${process.env.API_URL}/api/logout`
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const router = useRouter()

    const handleAppAccess = async (type, email, password) => {
        const accessUrl = type === "login" ? loginUrl : registerUrl
        const user = { "user": { "email": email, "password": password }}
        try {
            let response = await axios.post(accessUrl, user)
            console.log("RESPONSE FOR HANDLE APP ACCESS")
            console.log(response)
            localStorage.setItem("token", response.headers.authorization)
            setCookie("token", response.headers.authorization, { 
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true 
            })
            return response
        } catch (error) {
            return error.response
            // if (error.response.status === 401) {
            //     console.log(error.response.data.error)
            // } else {
            //     console.log(error.response)
            // }
            // router.push('/')
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