import React, {useState, useEffect} from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import Cookie from "js-cookie"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import MailIcon from '@mui/icons-material/Mail';

function MyAccount() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [location, setLocation] = useState("")
    const [hometown, setHometown] = useState("")
    const [bio, setBio] = useState("")
    const [interests, setInterests] = useState([])
    
    useEffect(() => {
        fetchData()
    }, [])
    const baseURL = process.env.NODE_ENV==="development"
    ? "http://localhost:3000/api"
    :"DEPLOYED LOCATION"

    async function fetchData(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let fetchUser = await axios.get(baseURL+"/users/get-user-info",{
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            setFirstName(fetchUser.data.payload.firstName)
            setLastName(fetchUser.data.payload.lastName)
            setUsername(fetchUser.data.payload.username)
            setEmail(fetchUser.data.payload.email)
            setAge(fetchUser.data.payload.age)
            setLocation(fetchUser.data.payload.location)
            setHometown(fetchUser.data.payload.hometown)
            setBio(fetchUser.data.payload.bio)
            setInterests(fetchUser.data.payload.interests)
            
            console.log(interests)
            console.log(email)
            const alink = document.getElementById('email1').href = 'mailto:' + email;
            console.log(alink)
        } catch (e) {
            console.log(e)
        }
    }

    return (
            <div style={{display:"flex",justifyContent:"center", marginBottom:"30px"}}>
                <div style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"flex-start", width:"full"}}>
                    <div style={{fontSize:"60px", fontWeight:"bold", marginBottom:"10px"}}>{username}</div>
                    <div style={{display:"flex", flexDirection:"column", marginBottom:"10px"}}>
                        <div style={{fontSize:"28px", color:"grey", fontWeight:"bold", marginTop:"10px"}}>{firstName} {lastName}</div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start" , padding:"10px 20px", backgroundColor:"rgb(245, 245, 245)", borderRadius:"8px", boxShadow:"1px 1px 5px rgb(241, 241, 241)", marginBottom:"30px"}}>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"5px"}}>
                            <MailIcon style={{color:"rgb(98,1,238)", marginRight:"3px"}} />
                            <div> <a href id="email1" style={{color:"black"}}>{email}</a> </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", width:"400px" }}>
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <CakeIcon style={{color:"rgb(98,1,238)", marginRight:"3px"}} />
                                <div>{age}</div>
                            </div>
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <LocationOnIcon style={{color:"rgb(98,1,238)"}} />
                                <div>{location}</div>
                            </div>
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <HomeIcon style={{color:"rgb(98,1,238)"}}/>
                                <div> {hometown}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{fontSize:"24px", fontWeight:"bold", marginBottom:"20px"}}>About me</div>
                        <div style={{width:"400px", fontSize:"16px", border:"1px solid rgb(230, 230, 230)", borderRadius:"12px", boxShadow: "1px 1px 5px rgb(241, 241, 241)", fontFamily:"sans-serif", padding:"20px", marginBottom:"30px" }}>{bio}</div>
                    </div>
                    <div style={{fontSize:"24px", fontWeight:"bold", marginBottom:"20px"}}>My interests</div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", width:"400px", flexWrap:"wrap",}}>
                        {interests.map((item)=>{
                            return <div style={{color:"grey", margin:"5px", border:"1px solid rgb(226, 226, 226)", padding:"5px 15px", borderRadius:"24px"}}>{item}</div>
                            })}
                    </div>
                </div>
            </div>
    )
}

export default MyAccount
