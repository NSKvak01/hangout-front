import React, {useContext, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core"
import {NavLink, Link} from "react-router-dom"
import Cookie from 'js-cookie'
import {withRouter} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import CheckAuthCookie from '../hooks/checkAuthCookie'


const useStyles = makeStyles((theme)=>({
    root:{
        flexGrow: 1,
    },
    menuButton:{
        marginRight:theme.spacing(2),

    },
    title:{
        flexGrow:1,
    },

}))

function Navbar(props) {
    const classes=useStyles()
    const {logUserIn} = CheckAuthCookie()
   
    useEffect(()=>{
        logUserIn()
    },[])

    const{state:{user},
        dispatch} = useContext(AuthContext)

        const isUserLoggedIn = user? true:false
        const navLinkTitleOne = isUserLoggedIn?"/profile":"/login"
        const navLinkDisplayOne = isUserLoggedIn? `${user.username}`:"login"
        const navLinkTitleTwo = isUserLoggedIn?"/logout":"/sign-up"
        const navLinkDisplayTwo = isUserLoggedIn? "Logout":"Sign up"

        const logoutButton = isUserLoggedIn? logout : ()=>{}

        async function logout(){
            dispatch({
                type:"LOG_OUT"
            })
            Cookie.remove('jwt-cookie')
            props.history.push('/login')
            window.sessionStorage.clear("address")
            window.sessionStorage.clear("term")
            try {
                let result = await axios.get('http://localhost:3000/api/users/logout')
                console.log(result)
            } catch (e) {
                console.log(e)
            }
        }
        

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar style={{backgroundColor:"rgb(98,1,238)"}}>
                <Typography variant='h6' className={classes.title}>
                    <Link to="/" style={{fontSize:"40px", fontWeight:"bold", color:"white", textDecoration:"none"}}>HANGOUT</Link>
                </Typography>

                {isUserLoggedIn && 
                (<NavLink style={{textDecoration:"none", marginRight:"20px"}} exact to="/create-post">
                    <Button style={{backgroundColor:"white", color:"rgb(98,1,238)", border:"none"}} onClick={()=>{props.history.push("/create-post")}}>
                        + Post activity
                   </Button>
                </NavLink>)
                }
                {isUserLoggedIn && 
                (<NavLink activeStyle={{color:"white"}} exact to="/protected">
                    <Button color="inherit" style={{color:"white", backgroundColor:"rgb(98,1,238)", border:"none"}} onClick={()=>{props.history.push("/protected")}}>
                        Feed
                    </Button>
                </NavLink>)
                }

                <NavLink activeStyle={{color:"white"}} exact to={navLinkTitleOne}>
                    <Button color="inherit" style={{color:"white", textDecoration:"none",backgroundColor:"rgb(98,1,238)", border:"none", textDecoration:"none"}}>
                        {navLinkDisplayOne}
                    </Button>
                </NavLink>
        
                <NavLink 
                activeStyle={{color:"white"}} 
                exact 
                to={navLinkTitleTwo} 
                onClick={logoutButton}>
                    <Button color="inherit" style={{color:"white", backgroundColor:"rgb(98,1,238)", border:"none", textDecoration:"none"}} >
                        {navLinkDisplayTwo}
                    </Button>
                </NavLink>
            </Toolbar>
        </AppBar>
        
    </div>
    )
}

export default withRouter(Navbar)
