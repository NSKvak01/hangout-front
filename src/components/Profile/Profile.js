import React from 'react'
import Saved from '../Saved/Saved'
import SettingsIcon from '@mui/icons-material/Settings';
import MyPosts from '../MyPosts/MyPosts';


function Profile(props) {
    return (
        <div>
            <div style={{display:"flex", justifyContent:"flex-end"}}>
                <SettingsIcon onClick={()=>{props.history.push("/settings")}}/>
            </div>
            <Saved />
            <MyPosts />
        </div>
    )
}

export default Profile
