import React, {useEffect, useState} from 'react'
import axios from "axios"
import SavedList from './SavedList'
import Cookie from "js-cookie"


function Saved() {
    const [savedList, setSavedList] = useState(null)
    const baseURL = process.env.NODE_ENV==="development"
    ? "http://localhost:3000/api"
    :"DEPLOYED LOCATION"

    useEffect(() => {
        fetchPost()
    }, [])


    async function fetchPost(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let foundList = await axios.get(baseURL+"/post/get-saved-posts", {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            setSavedList(foundList.data.post)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <React.Fragment>
            <div style={{textAlign:"center", fontSize:"24px", fontWeight:"bold"}}>Activities you joined</div>
            <ul>
                {savedList?.map((item)=>{
                    return (<SavedList
                        key={item._id} 
                        item={item}
                        text={item.text}
                        user={item.user}
                        fetchPost={fetchPost}
                        baseURL={baseURL}
                        timestamp={item.timestamp}
                        />
                    )
                })}
            </ul>
        </React.Fragment>
    )
}

export default Saved
