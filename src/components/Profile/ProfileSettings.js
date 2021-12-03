import React, {useEffect, useContext, useState} from 'react'
import axios from "axios"
import Cookie from "js-cookie"
import { toast } from 'react-toastify'
import useChangeInputConfig from '../hooks/profileInput'
import {makeStyles} from "@material-ui/core/styles"
import {Grid, 
    Button, 
    TextField,
    Checkbox,
    FormControlLabel 
    } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import { AuthContext } from '../../context/AuthContext'

const useStyles = makeStyles((theme)=>({
    root:{
        "& > *":{
            margin:theme.spacing(1),
            width:"25ch"
        }
    }
    }))

function Profile(props) {
    const classes = useStyles()
    const {dispatch} = useContext(AuthContext)

    const [email, setEmail] = useChangeInputConfig("Email")
    const [password, setPassword, handlePasswordChange, isPasswordError, passwordErrorMessage] = useChangeInputConfig("Password")
    const [username, setUsername, handleUsernameChange, isUsernameError, usernameErrorMessage ] = useChangeInputConfig("Username")
    const [firstName, setFirstName, handleFirstNameChange, isFirstNameError, firstNameErrorMessage ] = useChangeInputConfig("First name")
    const [lastName, setLastName, handleLastNameChange, isLastNameError, lastNameErrorMessage] = useChangeInputConfig("Last name")
    const cookie = Cookie.get("jwt-cookie")
    const [passwordType, setPasswordType] = useState("password")
    const [showPassword, setShowPassword] = useState(false)

    async function logout(){
        dispatch({
            type:"LOG_OUT"
        })
        Cookie.remove('jwt-cookie')
        props.history.push('/login')
        try {
            let result = await axios.get('http://localhost:3000/api/users/logout')
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDeleteUser(){
        try {
            let deleteUser = await axios.delete("http://localhost:3000/api/users/delete-user",{
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            dispatch({
                type:"LOG_OUT"
            })
            Cookie.remove('jwt-cookie')
            props.history.push('/login')
        } catch (e) {
            console.log(e)
        }
    }
    
    async function handleUserInfo(){
        try {
            let fetchUser = await axios.get("http://localhost:3000/api/users/get-user-info",{
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            setFirstName(fetchUser.data.payload.firstName)
            setLastName(fetchUser.data.payload.lastName)
            setUsername(fetchUser.data.payload.username)
            setEmail(fetchUser.data.payload.email)
            setPassword(fetchUser.data.payload.password)
            console.log(fetchUser.data.payload)
        } catch (e) {
            console.log(e)
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

    useEffect(() => {
       handleUserInfo()
    }, [])

    async function handleUpdate(event){
        event.preventDefault()
        try {
            let result = await axios.put("http://localhost:3000/api/users/update-user-profile", {
                firstName:firstName,
                lastName:lastName,
                username:username,
                password:password
            }, {
                headers:{
                    authorization: `Bearer ${cookie}`
                }
            })

            if(result.status===202){
                dispatch({
                    type:"LOG_OUT"
                })
                Cookie.remove('jwt-cookie')
                props.history.push('/login')
                try {
                    let result = await axios.get('http://localhost:3000/api/users/logout')
                } catch (e) {
                    console.log(e)
                }
                window.sessionStorage.clear("address")
                window.sessionStorage.clear("term")
                props.history.push("/login")
            } else {
                setFirstName(result.data.payload.firstName)
                setLastName(result.data.payload.lastName)
                setUsername(result.data.payload.username)
            }
            toast.success(`Changes saved`);

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <React.Fragment>
            
                <Grid container spacing spacing={0} justifyContent="center">
                    {/* {successMessageValue && successMessage()}
                    {error && errorMessage()} */}
                    <form className={classes.root} onSubmit={handleUpdate}>
                    <Grid>
                        <h2 style={{marginTop:"100px"}}>Change profile</h2>
                    </Grid>
                
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

                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Email" 
                            name="email" 
                            type="email"
                            value={email}
                            disabled="true"/>
                        </Grid>

                        
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
                        
                        <Grid style={{textAlign:"center"}}>
                            <Button type="submit" variant="contained" color="primary" className="submitButton"
                            style={{marginTop:10, backgroundColor:"red"}}>Submit</Button>
                        </Grid>

                        <Grid>
                        <div style={{color:"red", textAlign:"center", width:"250px", marginTop:"50px", textDecoration:"underline", cursor:"pointer"}}  onClick={handleDeleteUser}>Delete profile</div>

                        </Grid>
                    </form>
            </Grid>
        </React.Fragment>
       
    )
}

export default Profile
