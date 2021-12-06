import React, {useEffect} from 'react'
import axios from "axios"
import Cookie from "js-cookie"
import {Button} from "@material-ui/core"

function SavedList(props) {
    const {_id} = props.item
    const {text, user, timestamp, baseURL, handleDelete, handleDeleteJoinedUser}=props

   function deleteOnClick(){
    handleDelete(_id)
    handleDeleteJoinedUser(_id)
   }

    return (
        <div>
            <li style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", boxShadow: "1px 2px 5px #888888", width:"400px", marginTop:"20px", marginBottom:"20px", padding:"20px", borderRadius:"24px"}}>
                    <div style={{fontSize:"20px", fontWeight:"bold", marginBottom:"10px"}}>{text}</div>
                    <div>{user}</div>
                    <div style={{fontSize:"14px", color:"grey", marginTop:"10px"}}>{timestamp.toString().slice(0,10)}</div>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=>deleteOnClick()} style={{border:"1px solid red", color:"red", fontSize:"10px"}}>Delete</Button>
                    </div>  
                </div>
            </li>
        </div>
    )
}

export default SavedList
