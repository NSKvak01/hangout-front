import React, {useEffect, useState} from 'react'
import axios from "axios"
import SavedList from './SavedList'
import Cookie from "js-cookie"
import jwtDecode from "jwt-decode"


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
            setSavedList(foundList.data)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDelete(id){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let deleted = {
                _id:id
            }
            let deletedPost = await axios.put(baseURL+`/post/delete-post`, deleted, {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            fetchPost()
        } catch (e) {
            console.log(e);
        }
    }

    async function handleDeleteJoinedUser(id){
        const cookie = Cookie.get("jwt-cookie")
        let jwtDecodedToken = jwtDecode(cookie)
        try {
            let deleted = {
                username:jwtDecodedToken.username
            }
            let deletedPost = await axios.put(baseURL+`/users/delete-joined-user/${id}`, deleted, {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
        } catch (e) {
            console.log(e);
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
                        handleDelete = {handleDelete}
                        handleDeleteJoinedUser={handleDeleteJoinedUser}
                        />
                    )
                })}
            </ul>
        </React.Fragment>
    )
}

export default Saved
