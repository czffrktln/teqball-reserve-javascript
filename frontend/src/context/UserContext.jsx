import { createContext, useState, useEffect } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)

    useEffect (() => {
        const actualToken = localStorage.getItem("token")
        if (actualToken) {
            setIsLoggedIn(true)
            setToken(actualToken)
        }
    }, [])


    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, token}}>
        { children }
        </UserContext.Provider>
        )
}

export { UserContext, UserProvider }