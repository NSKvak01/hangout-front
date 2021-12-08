import React, {useEffect, useState} from 'react'
import axios from "axios"
import SavedList from './SavedList'
import Cookie from "js-cookie"
import jwtDecode from "jwt-decode"


function Saved(props) {
    const {navigateToUser} = props
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
            let result = await axios.get(baseURL+"/post/get-all-posts", {headers:{authorization:`Bearer ${cookie}`}})
            let foundList = await axios.get(baseURL+"/post/get-saved-posts", {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            let showResult = foundList.data.filter((item)=>{
                console.log("foundList.data",foundList.data)
                console.log(result.data)
                if(foundList.data){
                    const postFound = result.data.find(({_id})=> item._id === _id)
                    if(postFound){
                        return true
                    }
                }
                return false
            })
            console.log("showresult",showResult)
            setSavedList(showResult)
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
            fetchPost()
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <React.Fragment>
            <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{display:"flex",flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start",  marginBottom:"10px"}}>
                <div style={{textAlign:"center",fontSize:"24px", fontWeight:"bold", marginLeft:"0px", marginBottom:"20px"}}>Activities I joined</div>
                <ul style={{marginLeft:"-40px"}}>
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
                            navigateToUser = {navigateToUser}
                            />
                        )
                    })}
                </ul>
            </div>
            </div>
        </React.Fragment>
    )
}

export default Saved
