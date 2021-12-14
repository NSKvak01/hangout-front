import React, {useState} from 'react'
import {Button} from "@material-ui/core"
import axios from 'axios'
import Cookie from "js-cookie"
import { toast } from 'react-toastify'



function CreatePost() {
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
            let newText={text:text}
            let createdPost = await axios.post(baseURL+"/post/create-post", newText,{
                headers:{authorization:`Bearer ${cookie}`}
            })
            setText("")
            toast.success(`Post created`, {
                position: toast.POSITION.TOP_CENTER
              });
            console.log(createdPost)
        } catch (e) {
            console.log(e)
        }
    }
}

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"100px"}}>
            <textarea style={{width:"500px", height:"200px", fontSize:"20px", border:"none", borderRadius:"24px", boxShadow: "1px 2px 5px #888888", fontFamily:"sans-serif", padding:"20px", resize:"none" }}
            label="text" 
            name="text" 
            value={text} 
            onChange={textOnChange}>
            </textarea >
            <Button style={{marginTop:"50px", backgroundColor:"rgb(98,1,238)", color:"white", border:"none", padding:"10px 25px"}} onClick={()=>handleOnSubmit()}>
                Create post
            </Button>
        </div>
    )
}

export default CreatePost
