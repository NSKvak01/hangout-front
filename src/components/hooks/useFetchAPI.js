import { useState, useEffect, useContext } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
function useFetchAPI(url){
    const baseURL = process.env.NODE_ENV==="development"
    ? "http://localhost:3000/api"
    :"DEPLOYED LOCATION"
    
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [isMessageOpen, setIsMessageOpen] = useState(false)
    const [successMessageValue, setSuccessMessage] = useState(null)

    const {dispatch} = useContext(AuthContext)

    function handleMessageOpen(){
        setIsMessageOpen(true)
    }

        function handleMessageClose(){
            setError(null)
            setResponse(null)
            setIsMessageOpen(false)
            setSuccessMessage(null)
        }

        function handleAPICallButtonSubmit(options={}){
            setOptions(options)
            setIsLoading(true)
        }

        async function handleAPIFetchCall(props){
            const requestOptionObj = {
                ...options,
                withCredentials:true,
                credentials:"include",
                ...{
                    headers:{
                        authorization:null
                    }
                }
            }
            try {
                let response = await axios(baseURL+url, requestOptionObj)
                if(response.data.message === "Success - user created"){
                    setIsLoading(false)
                    handleMessageOpen()
                    setResponse(response.data.message)
                    setSuccessMessage(response.data.message)
                } else if (response.data.message==="Success login"){
                    setIsLoading(false)
                    handleMessageOpen()
                    setResponse(response.data.message)
                    setSuccessMessage(response.data.message)

                    dispatch({
                        type:"LOGIN",
                        user:{
                            username:response.data.user.username
                        }
                    })
                }

            } catch (e) {
                console.log(e)
                setError(e.response.data.message)
                setIsLoading(false)
                handleMessageOpen()
            }
        }

        useEffect(()=>{
            if(!isLoading){
                return
            }
            handleAPIFetchCall()
        }, [isLoading, url, options, baseURL])

        return[
            {isLoading, response, error, setError, setResponse},
            handleAPICallButtonSubmit,
            isMessageOpen,
            handleMessageClose, 
            handleMessageOpen,
            successMessageValue
        ]
}

export default useFetchAPI