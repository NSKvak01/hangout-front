import React, {useState} from 'react'
import InterestList from './InterestList'
import {Button} from "@material-ui/core"
import Cookie from "js-cookie"
import axios from "axios"
const baseURL = process.env.NODE_ENV==="development"
    ? "http://localhost:3000/api"
    : "/api/"


function Interests(props) {
    const [userInterests, setUserInterests] = useState([])
    const interestArray = [
        "museums",
        "coffee", 
        "food", 
        "sport",
        "volleyball",
        "tennis",
        "technology", 
        "music",
        "art",
        "outdoor activities",
        "community & environment",
        "video games",
        "anime",
        "movies",
        "health & wellbeing",
        "dogs",
        "cats",
        "travel",
        "hiking",
        "wine",
        "bars",
        "clubs",
        "music festivals",
        "photography",
        "AI",
        "cars",
        "basketball",
        "computers",
        "blockchain",
        "finance",
        "board games",
        "parties"
    ]

    async function handleOnClick(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let interests = {
                interests:userInterests
            }
            let foundList = await axios.put(baseURL+"/users/add-interests", interests, {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            props.history.push("/bio")

        } catch (e) {
            console.log(e)
        }
    }
    

    return (
        <div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"full", flexWrap:"wrap", marginTop:"50px", marginLeft:"50px", marginRight:"50px"}}>
                {interestArray.map((item)=>{
                    return (
                        <InterestList 
                        key={item}
                        item={item}
                        userInterests={userInterests}
                        setUserInterests={setUserInterests}
                        />
                    )
                })}
            </div>
                <div style={{marginTop:"100px", display:"flex", justifyContent:"flex-end", marginRight:"50px"}}>
                    <Button onClick={()=>handleOnClick()} style={{marginTop:"100px", backgroundColor:"rgb(98,1,238)", color:"white", border:"none", padding:"10px 25px"}}>
                    Next
                    </Button>
                </div>
        </div>
    )
}

export default Interests
