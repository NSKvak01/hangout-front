import React from 'react'
import {Button} from "@material-ui/core"
import { toast } from 'react-toastify'



function JoinedUserList(props) {
    const {username,handleDeleteOtherJoinedUser,handleDeleteSavedPost, _id, fetchPost} = props
    function deleteOnClick(){
        handleDeleteOtherJoinedUser(_id, username)
        handleDeleteSavedPost(_id, username)
        toast.success(`User declined`, {
            position: toast.POSITION.TOP_CENTER
          });
        fetchPost()
       }
    return (
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
            <div style={{marginRight:"30px"}}>{username}</div>
            <div style={{display:"flex", justifyContent:"flex-end"}}>
                <Button onClick={()=>deleteOnClick()} style={{border:"1px solid red", color:"red", fontSize:"10px"}}>Decline</Button>
            </div>  
        </div>
    )
}

export default JoinedUserList
