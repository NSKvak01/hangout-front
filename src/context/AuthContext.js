import {createContext, useReducer, useState} from 'react'

export const AuthContext = createContext({})
const initialState = {
    user:null
}
function reducer(state,action) {
    switch(action.type){
        case "LOGIN":
            return{
                user:{
                    username:action.user.username,
                    isAuth:true
                }
            }
        case "LOG_OUT":
            return{
                user:null
            }
        default:
            return state
    }
}

function AuthContextWrapper({children}){
const [state, dispatch] = useReducer(reducer, initialState)
const [otherUser, setOtherUser] = useState("")
return(
    <AuthContext.Provider value={{state,dispatch,otherUser, setOtherUser}}>
        {children}
    </AuthContext.Provider>
)
}


export default AuthContextWrapper
