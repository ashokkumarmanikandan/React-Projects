import {Link, useNavigate} from "react-router-dom";
import {memo, useContext, useEffect} from "react";
import {Context} from "../App";

const UserNav = memo(() =>{
    const {currentUser,setCurrentUser} = useContext(Context);
    const navigate = useNavigate();

    console.log(currentUser);

    useEffect(() => {
        if(!currentUser){
            alert("You are not logged in");
            navigate('/');
        }
    },[])

    function logoutFunc() {
        //setCurrentUser(null);
    }

    return (
        <div className="admin-nav">
            <Link to="/admin">Home</Link>
            <Link to={'/admin/deletedBooks'}>Removed Books</Link>
            <Link to="/" className={"logout-button"} onClick={logoutFunc}>Logout</Link>
        </div>
    )
})

export default UserNav;