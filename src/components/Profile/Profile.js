import React from 'react'
import Saved from '../Saved/Saved'
import SettingsIcon from '@mui/icons-material/Settings';


function Profile(props) {
    return (
        <div>
            <div style={{display:"flex", justifyContent:"flex-end"}}>
                <SettingsIcon onClick={()=>{props.history.push("/settings")}}/>
            </div>
            <Saved />
        </div>
    )
}

export default Profile
