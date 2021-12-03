import {useState} from "react"
import {isAlpha, isAlphanumeric, isEmail, isStrongPassword} from "validator"

function useChangeInputConfig(inputType){
    const [value, setValue] = useState("")
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)

    function onChange(e){
        let value = e.target.value
        setValue(value)
        checkInput(value)
    }

    function clearInput(){
        setValue("")
    }

    function checkInput(value){
        if(value.length===0){
            setIsError(true)
            setErrorMessage(`${inputType} is required`)
            setIsDisabled(true)
        } else {
            setIsError(false)
            setErrorMessage("")
            setIsDisabled(false)
        }

        if(inputType==="First name" || inputType==="Last name"){
            if(!isAlpha(value)){
                setIsError(true)
                setErrorMessage(`${inputType} can only contain letters`)
            }
        }
        if(inputType==="Username"){
            if(!isAlphanumeric(value)){
                setIsError(true)
                setErrorMessage(`${inputType} can only contain letters and numbers`)
            }
        }

        if(inputType==="Email"){
            if(!isEmail(value)){
                setIsError(true)
                setErrorMessage(`Please type email format`)
            }
        }

        if(inputType==="Password"){
            if(!isStrongPassword(value)){
                setIsError(true)
                setErrorMessage(`Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8`)
            }
        }
    }
    return [value, onChange, isError, setIsError, errorMessage, setErrorMessage, isDisabled, clearInput]
}

export default useChangeInputConfig 