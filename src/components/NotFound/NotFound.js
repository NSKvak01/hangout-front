import React from 'react'
import {Link} from "react-router-dom"

function NotFound() {
    return (
        <div>
            404 - Sorry what you're looking for foes not exist, please go back to the <Link to='/'>Home Page</Link>
        </div>
    )
}

export default NotFound
