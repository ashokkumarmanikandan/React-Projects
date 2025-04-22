import './App.css';
import {memo, useCallback, useContext, useRef, useState} from "react";
import {Context} from "./App";
import {Link, useNavigate} from "react-router-dom";

const Login = memo(()=> {
    const {users,setCurrentUser} = useContext(Context);
    const [id, setID] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const LoginUser = useCallback((e, id, password) => {
        e.preventDefault();
        const currentUser = users.find((user) => Number(user.id) === Number(id) && user.Password === password);
        if(!currentUser){
            alert("Please provide valid details");
        } else if(currentUser.role === "Admin"){
            navigate("/admin");
        } else {
            navigate("/user");
            //setCurrentUser(currentUser);
        }
    }, []);


    return (
        <form className="Login" onSubmit={(e) => LoginUser(e, id, password)}>
            <h1>Login</h1>
            <input placeholder="Enter the id" value={id} onChange={(e) => setID(e.target.value)}/>
            <input type={"text"} placeholder="Enter the Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
            <p>Don't have an account ?<Link to={"/signup"}> Signup</Link></p>
        </form>
    )
})

export default Login;