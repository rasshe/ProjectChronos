import { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


const Logout = () => {
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('access_token'))

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false)
        history.push("/")
        window.location.reload(false);
    }
    
    return  (isLoggedIn ? 
        <Button onClick={handleLogout} >Logout</Button>
: null
    )
}

export default Logout;