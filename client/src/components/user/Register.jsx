import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = (props) => {
    const navigate = useNavigate();
    const { setIsLogged } = props;
    const {user, setUser} = props;
    const [ruser, setRuser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState('')

    const changeHandler = (e) => {
        setRuser({ ...ruser, [e.target.name]: e.target.value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", ruser, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                setIsLogged(true);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
                setIsLogged(false);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div className="container-fluid formBG pb-3">
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5">
                <h2 className="text-light mb-4">Register</h2>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                        {errors? 
                            <p className="bg-warning text-secondary">Invalid Registration Attempt</p>:""}
                            <label className="text-light">First Name:</label>
                            <input type="text" className="form-control" name="firstName" onChange={changeHandler} value={ruser.firstName} />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Last Name:</label>
                            <input type="text" className="form-control" name="lastName" onChange={changeHandler} value={ruser.lastName} />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Email:</label>
                            <input type="text" className="form-control" name="email" onChange={changeHandler} value={ruser.email} />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password:</label>
                            <input type="password" className="form-control" name="password" onChange={changeHandler} value={ruser.password} />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Confirm Password:</label>
                            <input type="password" className="form-control" name="confirmPassword" onChange={changeHandler} value={ruser.confirmPassword} />
                        </div>

                        <button type="submit" className="btn btn-dark">Register</button>
                    </form>

                    <Link to="/login" className="text-light mt-3">Already have an account?</Link>
                </div>
            </div>
        </div>
    )
};

export default Register;
