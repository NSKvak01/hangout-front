import React, {useEffect, useState} from 'react'
import axios from "axios"
import Cookie from "js-cookie"
import jwtDecode from "jwt-decode"
import MyPostList from './MyPostList'


function MyPosts(props) {
    const {navigateToUser} = props
    const [myList, setMyList] = useState(null)
    const baseURL = process.env.NODE_ENV==="development"
    ? "http://localhost:3000/api"
    :"DEPLOYED LOCATION"

    useEffect(() => {
        fetchPost()
    }, [])

    const sortPosts = (postArray) => {
        const sorted =  postArray.sort(function(x, y){
            console.log({x,y})
            console.log(x.timestamp-y.timestamp)
          return new Date(y.timestamp) - new Date(x.timestamp);
        })
        console.log({postArray})
        return sorted;
      }

    async function fetchPost(){
        const cookie = Cookie.get("jwt-cookie")
        let jwtDecodedToken = jwtDecode(cookie)

        try {
            let allPosts = await axios.get(baseURL+"/post/get-all-posts", {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            let myPosts = allPosts.data.filter((item)=>{
                if(item.user===jwtDecodedToken.username){
                    return item
                }
                
            })
            setMyList(sortPosts(myPosts))
            console.log(myList)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDeleteOtherJoinedUser(id, username){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let deleted = {
                username:username,
                _id:id
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

    async function handleDeleteSavedPost(id, username){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let deleted = {
                username:username,
                _id:id
            }
            console.log(deleted)
            let deletedPost = await axios.put(baseURL+`/post/delete-post-from-declined/${username}`, deleted, {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            fetchPost()
            console.log(deletedPost)
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <React.Fragment>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:"flex",flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start",  margin:0}}>
                    <div style={{textAlign:"center", fontSize:"24px", fontWeight:"bold", marginLeft:"0px", marginBottom:"20px"}}>My Posts</div>
                    <ul style={{marginLeft:"-40px"}}>
                        {myList?.map((item)=>{
                            return (<MyPostList
                                key={item._id} 
                                item={item}
                                text={item.text}
                                user={item.user}
                                fetchPost={fetchPost}
                                baseURL={baseURL}
                                timestamp={item.timestamp}
                                handleDeleteOtherJoinedUser={handleDeleteOtherJoinedUser}
                                joinedUsers={item.joinedUsers}
                                handleDeleteSavedPost={handleDeleteSavedPost}
                                _id={item._id}
                                navigateToUser={navigateToUser}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MyPosts
