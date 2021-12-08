import React, {useContext} from 'react'
import {Button} from "@material-ui/core"
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'



function JoinedUserList(props) {
    const {username,handleDeleteOtherJoinedUser,handleDeleteSavedPost, _id, fetchPost, navigateToUser} = props
    const {otherUser, setOtherUser} = useContext(AuthContext)
    function deleteOnClick(){
        handleDeleteOtherJoinedUser(_id, username)
        handleDeleteSavedPost(_id, username)
        toast.success(`User declined`, {
            position: toast.POSITION.TOP_CENTER
          });
        fetchPost()
       }
       function navigateToUser1(){
        navigateToUser()
        setOtherUser(username)
    }
    return (
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
            <div style={{marginRight:"30px"}} onClick={()=>navigateToUser1()}>{username}</div>
            <div style={{display:"flex", justifyContent:"flex-end"}}>
                <Button onClick={()=>deleteOnClick()} style={{border:"1px solid red", color:"red", fontSize:"10px"}}>Decline</Button>
            </div>  
        </div>
    )
}

export default JoinedUserList
