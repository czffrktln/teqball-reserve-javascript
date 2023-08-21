import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const FinishLogin = () => {
    
    const navigate = useNavigate()
    const urlSearchParams = new URLSearchParams(window.location.search)
    const code = urlSearchParams.get("code")
    console.log(code);


const login = async () => {
    try{
        const response = await axios.post("http://localhost:3000/api/login/", {code})
        console.log(response.data)
        localStorage.setItem("token", response.data)
        navigate("/teams")
        return response
    }
    catch (error) {
    console.log(error)
    }
}

useEffect(() => {
    login()    
},[])

    return(
        <div>
            <p>Loading...</p>
        </div>
    )
}