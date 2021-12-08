import React, {useEffect, useState} from 'react'
import axios from "axios"
import Cookie from "js-cookie"
import {Button} from "@material-ui/core"
import DeleteIcon from '@mui/icons-material/Delete';

function UserPostList(props) {
    const {text, user, timestamp,  joinedUsers}=props
    
    console.log("joinedUsers: ",joinedUsers)


    return (
        <div>
            <li style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", boxShadow: "1px 2px 5px #888888", width:"400px", marginBottom:"20px", padding:"20px", borderRadius:"24px"}}>
                    <div style={{fontSize:"20px", fontWeight:"bold", marginBottom:"10px"}}>{text}</div>
                    <div>{user}</div>
                    <div style={{fontSize:"14px", color:"grey", marginTop:"10px"}}>{timestamp.toString().slice(0,10)}</div>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"end"}}>
                    <div style={{fontSize:"16px", fontWeight:"bold", marginTop:"20px", marginBottom:"10px"}}>Joined Users</div>
                    {joinedUsers?.map((item)=>{
                        return <div 
                            key={item._id}
                           >
                               {item.joinedUser}
                           </div>
                    })
                    }
                    </div>
                    </div>  
                </div>
            </li>
        </div>
    )
}

export default UserPostList
