import {Link, useNavigate} from "react-router-dom";
import {memo, useEffect} from "react";
import {useContext} from "react";
import {Context} from "../App";

const UserNav = memo((props) => {
    const {currentUser,setCurrentUser} = useContext(Context);
    const navigate = useNavigate();

    console.log(currentUser);

    // useEffect(() => {
    //     if(!currentUser){
    //         alert("You are not logged in");
    //         navigate('/');
    //     }
    // },[])

    if(!currentUser) return null;

    function logoutFunc() {
        //setCurrentUser(null);
    }

    return (
        <div className="User-Nav">
            <Link to="/user">Home</Link>
            <Link to={'/user/favourites'}>Favourites</Link>
            <Link to={'/user/history'}>History</Link>
            <Link to="/" className={"logout-button"} onClick={logoutFunc}>Logout</Link>
        </div>
    )
})

export default UserNav;

