import React, {useState} from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import Cookie from "js-cookie"
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { Button} from '@mui/material'


function PostList(props) {
    const {text, user, timestamp, _id} = props
    const [join, setJoin] = useState("join")
    const [clicked, setClicked] = useState(false)
    const baseURL = process.env.NODE_ENV==="development"
    ? "http://localhost:3000/api"
    :"DEPLOYED LOCATION"
    async function savePost(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let newPost = {
                _id,
                text,
                user,
                timestamp
            }
            let result = await axios.post(baseURL+"/post/save-post", newPost, {
                headers:{authorization:`Bearer ${cookie}`}
            })
            toast.success(`Have fun with ${user}!`);
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }
    async function closePost(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let newPost = {
                _id,
            }
            let result = await axios.post(baseURL+"/post/close-post", newPost, {
                headers:{authorization:`Bearer ${cookie}`}
            })
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    function buttonOnClick(){
        setClicked(true)
        setJoin("joined")
        savePost()
    }

    return (
        <React.Fragment>
            <li style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", boxShadow: "1px 2px 5px #888888", width:"400px", marginTop:"20px", marginBottom:"20px", padding:"20px", borderRadius:"24px"}}>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                    <CloseIcon onClick={()=>closePost()} style={{fontSize:"16px", marginBottom:"15px", color:"grey"}}/>
                    </div>
                    <div style={{fontSize:"20px", fontWeight:"bold", marginBottom:"10px"}}>{text}</div>
                    <div>{user}</div>
                    <div style={{fontSize:"14px", color:"grey", marginTop:"10px"}}>{timestamp}</div>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=> buttonOnClick()} style={clicked ? {backgroundColor:"rgb(98,1,238)", border:"none", color:"white", textDecoration:"none", width:"80px", fontSize:"14px"} : {backgroundColor:"rgb(150, 83, 244)", border:"none", color:"white", textDecoration:"none", width:"80px", fontSize:"14px"}}>{join}</Button>
                    </div>  
                </div>
            </li>

        </React.Fragment>
    )
}

export default PostList
