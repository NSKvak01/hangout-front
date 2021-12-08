import React from 'react'
import Saved from '../Saved/Saved'
import SettingsIcon from '@mui/icons-material/Settings';
import MyPosts from '../MyPosts/MyPosts';
import MyAccount from './MyAccount';


function Profile(props) {

    const navigateToUser=()=>{
        props.history.push("/user-profile")
    }
    return (
        <div>
            <div style={{display:"flex", justifyContent:"flex-end", margin:"50px", color:"rgb(98,1,238)"}}>
                <SettingsIcon style={{fontSize:"35px"}} onClick={()=>{props.history.push("/settings")}}/>
            </div>
            <MyAccount />
            <Saved navigateToUser={navigateToUser}/>
            <MyPosts navigateToUser={navigateToUser}/>
        </div>
    )
}

export default Profile
