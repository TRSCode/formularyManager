import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = (props) => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    // submitHandler
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", user, {withCredentials: true})
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
            <form onSubmit={submitHandler}>
                <div>
                    <label>First Name: </label>
                    <input type="text" name="firstName" onChange={changeHandler} value={user.firstName}/>
                </div>
                <div>
                    <label>Last Name: </label>
                    <input type="text" name="lastName" onChange={changeHandler} value={user.lastName}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="text" name="email" onChange={changeHandler} value={user.email}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" onChange={changeHandler} value={user.password}/>
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input type="password" name="confirmPassword" onChange={changeHandler} value={user.confirmPassword}/>
                </div>
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Already have an account?</Link>
        </div>
    )};

    export default Register;