import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import PostList from "./PostList"
import Spinner from "../Spinner/Spinner"
import Cookie from "js-cookie"
import "./Protected.css"
import useChangeInputConfig from '../hooks/searchHooks'

function Protected(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [postArray, setPostArray] = useState([])
    const baseURL = process.env.NODE_ENV==="development"
    ? "http://localhost:3000/api"
    :"DEPLOYED LOCATION"

    const sortPosts = (postArray) => {
        const sorted =  postArray.sort(function(x, y){
            console.log({x,y})
            console.log(x.timestamp-y.timestamp)
          return new Date(y.timestamp) - new Date(x.timestamp);
        })
        console.log({postArray})
        return sorted;
      }

      useEffect(async() => {
        updateArray()
        }, [])
    

        async function updateArray(){
            try {
                const cookie = Cookie.get("jwt-cookie")
                let result = await axios.get(baseURL+"/post/get-all-posts", {headers:{authorization:`Bearer ${cookie}`}})
                let savedList = await axios.get(baseURL+"/post/get-saved-posts", {headers:{ authorization:`Bearer ${cookie}`}
                })
                console.log("savedList:", savedList)
                let closedList = await axios.get(baseURL+"/post/get-closed-posts", {headers:{ authorization:`Bearer ${cookie}`}
                })
                console.log("closedList:", closedList)

                let showResult = result.data.filter((item)=>{
                    if(savedList.data){
                        const postFound = savedList.data.find(({_id})=> item._id === _id)
                        if(postFound){
                            return false
                        }
                    }
                    return true
                })

                let showResult1 = showResult.filter((item)=>{
                    if(closedList.data){
                        const postFound = closedList.data.find(({_id})=> item._id === _id)
                        if(postFound){
                            return false
                        }
                    }
                    return true
                })
                
                let sortedResult = sortPosts(showResult1)
                setPostArray(sortedResult)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

            return (
                <React.Fragment style={{display:"flex", justifyContent:"flex-end", flexDirection:"column", alignItems:"center"}}>
                   <h1 style={{textAlign:"center", color:"black", marginTop:"50px", fontSize:"30px"}}>Wanna Hangout?</h1>
                        {!postArray 
                        ? (<h1 style={{textAlign:"center", color:"grey", marginTop:"200px", fontSize:"60px"}}>No posts</h1> )
                        :(<ul>
                            {postArray.map((item)=>{
                                return (<PostList 
                                    key={item._id}
                                    text={item.text}
                                    user={item.user}
                                    timestamp={item.timestamp.toString().slice(0,10)}
                                    _id = {item._id}
                                    updateArray={updateArray}
                                />
                                )
                            })}
                        </ul>)
                        }
                        
                </React.Fragment>
            )
        }

export default Protected
