import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const Login = (props) => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", userLogin, {withCredentials: true})
            .then((res) => {
                console.log(res);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <label>Email: </label>
                <input type="text" name="email" onChange={changeHandler} value={userLogin.email}/>

                <label>Password: </label>
                <input type="password" name="password" onChange={changeHandler} value={userLogin.password}/>

                <button type="submit">Login</button>
                <br/>
                <Link to="/">Don't have an account?</Link>
            </form>
        </div>
    )
}

export default Login;
