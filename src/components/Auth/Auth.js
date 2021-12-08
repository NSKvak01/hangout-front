import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Grid, 
    Button, 
    TextField, 
    CircularProgress, 
    Snackbar,
    Input,
    Checkbox,
    FormControlLabel} from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import useChangeInputConfig from '../hooks/useInput'
import useFetchAPI from '../hooks/useFetchAPI'
import checkAuthCookie from '../hooks/checkAuthCookie'
import "./Auth.css"

const useStyles = makeStyles((theme)=>({
root:{
    "& > *":{
        margin:theme.spacing(1),
        width:"25ch"
    }
}
}))

function Auth(props) {
    const classes = useStyles()
    let isLoginRoute = props.match.path==="/login"
    let buttonTitle = isLoginRoute ? "Login":"Sign up"
    let apiURL = isLoginRoute? "/users/login":"/users/sign-up"

    const {checkIfCookieExists} = checkAuthCookie()

    const [{
        isLoading, response, error, setResponse
    }, 
    handleAPICallButtonSubmit,
    isMessageOpen,
    handleMessageClose,
    ,
    successMessageValue] = useFetchAPI(apiURL)

    const [email, handleEmailChange, isEmailError, ,emailErrorMessage, ,isEmailDisabled, clearEmailInput] = useChangeInputConfig("Email")
    const [emailUsername, handleEmailUsernameChange, isEmailUsernameError, ,emailUsernameErrorMessage, ,isEmailUsernameDisabled, clearEmailUsernameInput] = useChangeInputConfig("Email/Username")
    const [password, handlePasswordChange, isPasswordError, ,passwordErrorMessage, ,isPasswordDisabled, clearPasswordInput] = useChangeInputConfig("Password")
    const [passwordLogin, handlePasswordLoginChange, isPasswordLoginError, ,passwordLoginErrorMessage, ,isPasswordLoginDisabled, clearPasswordLoginInput] = useChangeInputConfig("Password ")
    const [username, handleUsernameChange, isUsernameError, ,usernameErrorMessage, ,isUsernameDisabled, clearUsernameInput] = useChangeInputConfig("Username")
    const [firstName, handleFirstNameChange, isFirstNameError, ,firstNameErrorMessage, ,isFirstNameDisabled, clearFirstNameInput] = useChangeInputConfig("First name")
    const [lastName, handleLastNameChange, isLastNameError, ,lastNameErrorMessage, ,isLastNameDisabled, clearLastNameInput] = useChangeInputConfig("Last name")
    const [confirmPassword, handleConfirmPasswordChange, isConfirmPasswordError, setIsConfirmPasswordError, confirmPasswordErrorMessage, setConfirmPasswordErrorMessage,isConfirmPasswordDisabled, clearConfirmPasswordInput] = useChangeInputConfig("Confirm password")
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [loginPasswordType, setLoginPasswordType] = useState("password")
    const [showLoginPassword, setShowLoginPassword] = useState(false)
    const [passwordType, setPasswordType] = useState("password")
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if(passwordTouched){
            if(password !== confirmPassword){
                    setIsConfirmPasswordError(true)
                    setConfirmPasswordErrorMessage(`Passwords don't match`)
            } else{
                setIsConfirmPasswordError(false)
                setConfirmPasswordErrorMessage(``)
            }
        }
    }, [password, confirmPassword])

    function handleOnFocus(){
        setPasswordTouched(true)
    }

    function showLoginPasswordOnChange(e){
        setShowLoginPassword(!showLoginPassword)
        if(!showLoginPassword){
            setLoginPasswordType("text")
        } else{
            setLoginPasswordType("password")
        }
    }
    function showPasswordOnChange(e){
        setShowPassword(!showPassword)
        if(!showPassword){
            setPasswordType("text")
        } else{
            setPasswordType("password")
        }
    }

    async function handleOnSubmit(e){
        e.preventDefault()
        const user = isLoginRoute ? {emailUsername, passwordLogin}:{firstName, lastName, username, email, password}

        handleAPICallButtonSubmit({
            method:"post",
            data:{
                ...user
            }
        })
    }

    function successMessage(){
        return(
            <Snackbar open={isMessageOpen} autoHideDuration={6000} onClose={handleMessageClose}
           >
                <Alert severity="success">{successMessageValue}</Alert>
            </Snackbar>
        )
    }
    
    function Alert(props){
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    function errorMessage(){
        return(
            <Snackbar open={isMessageOpen} autoHideDuration={6000} onClose={handleMessageClose}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        )
    }

    if(isLoading){
        return(
            <div style={{textAlign:"center"}}>
                <CircularProgress />
            </div>
        )
    }

    if(response ==="Success - user created"){
        clearEmailInput()
        clearUsernameInput()
        clearPasswordInput()
        clearPasswordLoginInput()
        clearConfirmPasswordInput()
        clearFirstNameInput()
        clearLastNameInput()
        setResponse(null)
        props.history.push('/interests')
    }
    
    if(response ==="Success login"){
        clearEmailUsernameInput()
        clearPasswordLoginInput()
        setResponse(null)
        if(checkIfCookieExists()){
            props.history.push("/protected")
        }
    }


    return (
        <Grid container spacing spacing={1} justifyContent="center">
            {successMessageValue && successMessage()}
            {error && errorMessage()}
            <form className={classes.root} onSubmit={handleOnSubmit}>
                {
                    !isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="First name" 
                            name="firstName" 
                            value={firstName} 
                            onChange={handleFirstNameChange}
                            error = {isFirstNameError}
                            helperText={firstNameErrorMessage}/>
                        </Grid>
                    )
                }
                {
                    !isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Last name" 
                            name="lastName" 
                            value={lastName} 
                            onChange={handleLastNameChange}
                            error = {isLastNameError}
                            helperText={lastNameErrorMessage}/>
                        </Grid>
                    )
                }
                {
                    !isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Username" 
                            name="username" 
                            value={username} 
                            onChange={handleUsernameChange}
                            error = {isUsernameError}
                            helperText={usernameErrorMessage}/>
                        </Grid>
                    )
                }
                 {
                    !isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Email" 
                            name="email" 
                            type="email"
                            value={email} 
                            onChange={handleEmailChange}
                            error = {isEmailError}
                            helperText={emailErrorMessage}/>
                        </Grid>
                    )
                }
                 {
                    isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Email/Username" 
                            name="emailUsername" 
                            value={emailUsername} 
                            onChange={handleEmailUsernameChange}
                            error = {isEmailUsernameError}
                            helperText={emailUsernameErrorMessage}/>
                        </Grid>
                    )
                }
                {isLoginRoute && (
                    <Grid item m={6}>
                    <TextField 
                    fullWidth 
                    label="Password" 
                    name="passwordLogin" 
                    value={passwordLogin} 
                    onChange={handlePasswordLoginChange}
                    error = {isPasswordLoginError}
                    helperText={passwordLoginErrorMessage}
                    type={loginPasswordType}
                    />
                    <FormControlLabel control={<Checkbox name="showPassword" onChange={showLoginPasswordOnChange}/>} label="Show password" />
                    </Grid>
                )}
                {!isLoginRoute && (
                    <Grid item m={6}>
                    <TextField 
                    fullWidth 
                    label="Password" 
                    name="password" 
                    value={password} 
                    onChange={handlePasswordChange}
                    error = {isPasswordError}
                    helperText={passwordErrorMessage}
                    type={passwordType}
                    />
                    <FormControlLabel control={<Checkbox name="showPassword" onChange={showPasswordOnChange}/>} label="Show password" />
                    </Grid>
                )}
                {
                    !isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Confirm password" 
                            name="confirmPassword" 
                            type="password"
                            value={confirmPassword} 
                            onChange={handleConfirmPasswordChange}
                            error = {isConfirmPasswordError}
                            helperText={confirmPasswordErrorMessage}
                            onFocus={handleOnFocus}
                            />
                        </Grid>
                    )
                }
                <Grid style={{textAlign:"center"}}>
                    <Button type="submit" variant="contained" color="primary" className="submitButton"
                    style={{marginTop:10}} disabled={isLoginRoute? isEmailUsernameDisabled || isPasswordLoginDisabled 
                    : isEmailDisabled || isPasswordDisabled || isUsernameDisabled||isFirstNameDisabled || isLastNameDisabled}>{buttonTitle}</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default Auth
