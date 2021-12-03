import {useState} from "react"

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

    function checkInput(value){
        if(value.length===0){
            setIsError(true)
            setErrorMessage(`${inputType} is required`)
        } else {
            setIsError(false)
            setErrorMessage("")
        }
    }
    return [value, onChange, isError, errorMessage]
}

export default useChangeInputConfig