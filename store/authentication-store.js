import React, { useEffect, useMemo, useState, useCallback, useContext, useReducer } from "react";
import axios from "axios";

const AuthenticationContext = React.createContext({
    isLoggedIn: false,
    handleAppAccess: (email, password) => {},
    handleLogOut: () => {}
});


export const AuthenticationContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginUrl = "http://localhost:3000/users/sign_in"
    const registerUrl = "http://localhost:3000/users"
    const logoutUrl = "http://localhost:3000/users/sign_out"
    

    // useEffect(() => {
    //     const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
    //     if (storedUserLoggedInInformation === '1') {
    //       setIsLoggedIn(true);
    //     }
    // }, []);

    const handleAppAccess = async (type, email, password) => {
        console.log(type)
        const accessUrl = type === "login" ? loginUrl : registerUrl
        const user = { "user": { "email": email, "password": password }}
        try {
            let response = await axios.post(accessUrl, user)
            console.log(response.headers.authorization)
            localStorage.setItem("token", response.headers.authorization)
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogOut = async () => {
        // console.log('logging out')
        console.log(localStorage.token)
        // try {
        //     let response = await axios.delete(logoutUrl, {headers: {'Authorization': `${localStorage.token}`}})
        //     console.log(response)
        // } catch (error) {
        //     console.error(error)
        // }
        try {
            let response = await axios.get(" http://localhost:3000/api/users", {headers: {'Authorization': `${localStorage.token}`}})
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <AuthenticationContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                handleAppAccess: handleAppAccess,
                handleLogOut: handleLogOut
            }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    )

}

export default AuthenticationContext