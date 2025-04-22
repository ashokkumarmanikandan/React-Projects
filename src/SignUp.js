import {memo, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";


const SignUp = memo(({setCurrentUser, users, setUsers}) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [nameInfo, setNameInfo] = useState(null);
    const [emailInfo, setEmailInfo] = useState(null);
    const [passwordInfo, setPasswordInfo] = useState(null);
    const [duplicateUser, setDuplicateUser] = useState(null);


    function formValidation() {
        setNameInfo(null);
        setEmailInfo(null);
        setPasswordInfo(null);
        setDuplicateUser(null);


        const nameCheck = /^[A-Za-z]+\s?[A-Za-z]+$/.test(name)
        const emailCheck = /^[a-zA-Z]+[._+-]?[a-zA-Z]?@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)
        const passwordCheck = /^[A-Za-z0-9]+[^a-zA-Z0-9\s]+/.test(password)
        let duplicateCheck = true;

        if (!passwordCheck) {
            setPasswordInfo(true);
            passwordRef.current.focus();
        }
        if (!emailCheck) {
            setEmailInfo(true);
            emailRef.current.focus();
        }
        if (!nameCheck) {
            setNameInfo(true);
            nameRef.current.focus();
        }

        if(passwordCheck && emailCheck && nameCheck) {
        const isUserThere = users.some((user) => String(user.id).toLowerCase() === String(email).toLowerCase());
            if (isUserThere) {
                duplicateCheck = false;
                setDuplicateUser(true);
                emailRef.current.focus()
                console.log("duplicate")
            }}
        return passwordCheck && emailCheck && passwordCheck && duplicateCheck;
    }

    function signUp(e) {
        e.preventDefault();
        const validDetails = formValidation();
        if (validDetails) {
            const newUser = {id: email, password: password, checkedBooks: [], fav: []};
            setUsers([...users, newUser]);
            setCurrentUser(newUser);
            navigate("/user");
        }
    }

    return (
        <form className={"Signup"} onSubmit={(e) => signUp(e)}>
            <h1>Signup</h1>
            <input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} type={"text"}
                   placeholder={"Enter the name"}/>
            {nameInfo && <p className={"error"}>Enter valid name</p>}
            <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder={"Enter the email"}/>
            {emailInfo && <p className={"error"}>Enter valid email</p>}
            {duplicateUser && <p className={"error"}>Email already exists !</p>}

            <input ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)}
                   placeholder={"Enter the password"}/>
            {passwordInfo && <p className={"error"}>Password min contain 8 char(Upper,Lower,Special)</p>}
            <button type="submit">Sign Up</button>
            <br/>
            <Link to={"/"}> Back to login</Link>
        </form>
    )
})

export default SignUp;