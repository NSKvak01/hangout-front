import React, {useState, useEffect} from 'react'
import {Grid, 
    Button, 
    TextField, 
   } from "@material-ui/core"
import useChangeInputConfig from '../hooks/useInput'
import Cookie from "js-cookie"
import axios from "axios"
import {NavLink, Link} from "react-router-dom"
import { toast } from 'react-toastify'


function UserInfo(props) {
    const baseURL = process.env.NODE_ENV==="development"
        ? "http://localhost:3000/api"
        :"DEPLOYED LOCATION"

    const [age, handleAgeChange] = useChangeInputConfig("Age")
    const [location, handleLocationChange] = useChangeInputConfig("Location")
    const [hometown, handleHometownChange] = useChangeInputConfig("Hometown")
    const [clicked, setClicked] = useState(false)
    async function handleOnSubmit(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let userInfo = {
                age:age,
                location:location,
                hometown:hometown
            }
            let foundList = await axios.put(baseURL+"/users/add-user-info", userInfo, {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            props.history.push("/protected")
            toast.success(`Welcome to Hangout!`, {
            position: toast.POSITION.TOP_CENTER
            });
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Grid container spacing spacing={1} justifyContent="center" style={{marginTop:"100px"}}>
            <form>
                <Grid item m={6}>
                    <TextField 
                    fullWidth 
                    label="Age" 
                    name="age" 
                    value={age} 
                    onChange={handleAgeChange}
                   />
                </Grid>

                <Grid item m={6}>
                    <TextField 
                    fullWidth 
                    label="Location" 
                    name="location" 
                    value={location} 
                    onChange={handleLocationChange}
                    />
                </Grid>
            
                <Grid item m={6}>
                    <TextField 
                    fullWidth 
                    label="Hometown" 
                    name="hometown" 
                    value={hometown} 
                    onChange={handleHometownChange}
                   />
                </Grid>
                
                <div style={{marginTop:"20px", display:"flex", justifyContent:"center",}}>
                    <Button onClick= {()=>handleOnSubmit()} style={{marginTop:"50px", backgroundColor:"rgb(98,1,238)", color:"white", border:"none", padding:"10px 25px"}}>
                        Save
                    </Button>
                </div>
            </form>
        </Grid>
    )
}

export default UserInfo
