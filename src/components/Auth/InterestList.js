import React, {useState, useEffect} from 'react'

function InterestList(props) {
    const [clicked, setClicked] = useState(false)
    const {item, userInterests, setUserInterests} = props

    function handleOnClick(){
        setClicked(!clicked)
    
        if(!clicked){
            userInterests.push(item)
            setUserInterests(userInterests)
        } else{
            let filteredArray = userInterests.filter((item1)=>{
                if(item1 !== item){
                    return item1
                }
            })
            console.log("filtered",filteredArray)
            setUserInterests(filteredArray)
        }
            console.log("userInterests",userInterests)
}
    
    

    return (
        <div>
            <div onClick={()=>handleOnClick()} style={!clicked ?{color:"grey", margin:"10px", border:"1px solid rgb(226, 226, 226)", padding:"5px 15px", borderRadius:"24px"}:{color:"white", margin:"10px", border:"1px solid rgb(98,1,238)", padding:"5px 15px", borderRadius:"24px", backgroundColor:"rgb(98,1,238)"}}>{item}</div>
        </div>
    )
}

export default InterestList
