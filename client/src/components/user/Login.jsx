import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const { setUser } = props;
    const { setIsLogged } = props;
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState('')

    const changeHandler = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", userLogin, { withCredentials: true })
            .then((res) => {
                console.log("login",res.data);
                setIsLogged(true);
                setUser(res.data)
                navigate("/dashboard");
            })
            .catch((err) => {
                setIsLogged(false);
                setErrors(err.response.data.errors);
                console.log(err.response.data.errors);
            })
    }

    return (
        <div className="container-fluid formBG pb-3">
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5">
                    <h2 className="text-light mb-4">Login</h2>
                    <form onSubmit={loginHandler}>
                        <div className="form-group">
                            {errors? 
                            <p className="bg-warning text-secondary">Invalid Login Attempt</p>:""}
                            <label className="text-light">Email:</label>
                            <input type="text" className="form-control" name="email" onChange={changeHandler} value={userLogin.email} />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password:</label>
                            <input type="password" className="form-control" name="password" onChange={changeHandler} value={userLogin.password} />
                        </div>

                        <button type="submit" className="btn btn-dark">Login</button>
                        <br />
                        <Link to="/" className="text-light">Don't have an account?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
