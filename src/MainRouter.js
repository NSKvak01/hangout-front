import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

const Home = React.lazy(()=>import ("./components/Home/Home"))
const Auth = React.lazy(()=>import ('./components/Auth/Auth'))
const Interests = React.lazy(()=>import ('./components/Auth/Interests'))
const Bio = React.lazy(()=>import ('./components/Auth/Bio'))
const UserInfo = React.lazy(()=>import ('./components/Auth/UserInfo'))
const NotFound = React.lazy(()=> import ('./components/NotFound/NotFound'))
const Protected = React.lazy(()=>import ("./components/Protected/Protected"))
const Profile = React.lazy(()=>import ("./components/Profile/Profile"))
const ProfileSettings = React.lazy(()=>import ("./components/Profile/ProfileSettings"))
const Saved = React.lazy(()=>import ("./components/Saved/Saved"))
const CreatePost = React.lazy(()=>import ("./components/CreatePost/CreatePost"))
const UserProfile = React.lazy(()=>import ("./components/UserProfile/UserProfile"))

function MainRouter() {
    return (
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/sign-up" component = {Auth} />
                <Route exact path="/login" component = {Auth} />
                <Route exact path="/interests" component = {Interests} />
                <Route exact path="/bio" component = {Bio} />
                <Route exact path="/user-info" component = {UserInfo} />
                <Route exact path="/logout" render={()=><Redirect to="/login" />} />
                <Route exact path="/" component = {Home} />
                <PrivateRoute exact path="/protected" component={Protected} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/settings" component={ProfileSettings} />
                <PrivateRoute exact path="/saved" component={Saved} />
                <PrivateRoute exact path="/create-post" component={CreatePost} />
                <PrivateRoute exact path="/user-profile" component={UserProfile} />

                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
}

export default MainRouter
