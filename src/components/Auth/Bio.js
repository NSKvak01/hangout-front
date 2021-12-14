import React, {useState} from 'react'
import {Button} from "@material-ui/core"
import axios from 'axios'
import Cookie from "js-cookie"

function Bio(props) {
    const baseURL = process.env.REACT_APP_ENV==="development"
    ? "http://localhost:3000/api"
    :"/api"

    const [text, setText] = useState("")

    function textOnChange(e){
        let value = e.target.value
        setText(value)
    }

    const handleOnSubmit = async ()=>{
        const cookie = Cookie.get("jwt-cookie")
        if (text !==""){
            try {
                let bio={bio:text}
                let createdBio = await axios.put(baseURL+"/users/add-bio", bio,{
                    headers:{authorization:`Bearer ${cookie}`}
                })
                props.history.push("/user-info")
                console.log(createdBio)
            } catch (e) {
                console.log(e)
            }
        }
    }
    

    return (
        <div>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"100px"}}>
            <textarea style={{width:"500px", height:"200px", fontSize:"20px", border:"none", borderRadius:"24px", boxShadow: "1px 2px 5px #888888", fontFamily:"sans-serif", padding:"20px", resize:"none" }}
            label="text" 
            name="text" 
            value={text} 
            onChange={textOnChange}>
            </textarea >
            <div style={{marginTop:"20px", display:"flex", justifyContent:"center"}}>
                <Button onClick={()=>handleOnSubmit()} style={{marginTop:"50px", backgroundColor:"rgb(98,1,238)", color:"white", border:"none", padding:"10px 25px"}}>
                    Next
                </Button>
            </div>
        </div>
        </div>
    )
}

export default Bio
