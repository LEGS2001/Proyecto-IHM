import React, { useState } from "react";
import { useContext } from "react";
import httpClient from "../utils/httpClient";
import { UserContext } from "../utils/UserContext";

const Signup = () => {

    const {user, setUser} = useContext(UserContext)

    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        user_type: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const registrarUsuario = async (e) => {
        e.preventDefault();
        const userData = {
            email: data.email,
            name: data.name,
            password: data.password,
            user_type: data.user_type
        };

        try{
            const resp = await httpClient.post("http://localhost:5000/ajax_signup", userData)
            setUser(resp.data)
        }catch(error){
            alert(error.response.data.message)
        }

    };

    return (
        <body>
            <div>
                <div id="layoutAuthentication" className="bg-primary row justify-content-center container-fluid px-4">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header">
                                                <h3 className="text-center font-weight-light my-4">Create Account</h3>
                                            </div>
                                            <div className="card-body">
                                                {/*
                                    {% with messages = get_flashed_messages() %}
                                    {% if messages %}
                                    <div className="notification is-danger">
                                        {{ messages[0] }}. Go to <a href="{{ url_for('auth.login') }}">login page</a>.
                                    </div>
                                    {% endif %}
                                    {% endwith %}
                                    */}
                                                <form id="signupForm" onSubmit={registrarUsuario}/*method="POST" action="/signup"*/>
                                                    <div className="form-floating mb-3">
                                                        <div className="control">
                                                            <input className="form-control" type="email" name="email" placeholder="Email" autofocus="" onChange={handleChange} required></input>
                                                        </div>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <div className="control">
                                                            <input className="form-control" type="text" name="name" placeholder="Name" autofocus="" onChange={handleChange} required></input>
                                                        </div>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <div className="control">
                                                            <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <div className="control">
                                                                    <input type="radio" id="student" name="user_type" value="Student" onClick={handleChange}></input>
                                                                    <label for="student">Student</label><br></br>
                                                                    <input type="radio" id="teacher" name="user_type" value="Teacher" onClick={handleChange}></input>
                                                                    <label for="teacher">Teacher</label><br></br>
                                                                    {/*
                                                        <input type="radio" id="admin" name="user_type" value="Admin"></input>
                                                        <label for="admin">Admin</label><br></br>
                                                        */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                        <button id="signupButton" className="btn btn-primary" type="submit">Sign Up</button>

                                                        {/*<img src="https://www.tennispro.es/skin/frontend/base/default/images/gomage/loadinfo.gif"
                                                    id="loading" width={100} height={100} display={"none"}/> */}
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="card-footer text-center py-3">
                                                <div className="small"><a href="/login">Have an account? Go to login</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Signup;