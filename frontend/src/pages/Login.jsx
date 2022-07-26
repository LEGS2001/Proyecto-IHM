import React, { useState, useContext } from "react";
import httpClient from "../utils/httpClient";
import { UserContext } from "../utils/UserContext";

const Login = () => {

    const { user, setUser } = useContext(UserContext)

    const [data, setData] = useState({
        email: "",
        password: "",
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
            password: data.password,
        };

        try {
            const resp = await httpClient.post("http://localhost:5000/ajax_login", userData)
            setUser(resp.data)
        } catch (error) {
            alert(error.response.data.message)
        }

    };

    return (
        <div id="layoutAuthentication" className="bg-primary row justify-content-center container-fluid px-4">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header">
                                        <h3 className="text-center tfon-weight-light my-4">Login</h3>
                                    </div>
                                    <div className="card-body">

                                        {/* {% with messages = get_flashed_messages() %}
                                    {% if messages %}
                                    <div className="notification is-danger">
                                        {{ messages[0] }}
                                    </div>
                                    {% endif %}
                                    {% endwith %} */}

                                        <form id="loginForm" onSubmit={registrarUsuario}/*method="POST" action="/login" */>
                                            <div className="form-floating mb-3">
                                                <div className="control">
                                                    <input className="form-control" type="email" name="email" placeholder="Email" autofocus="" onChange={handleChange}></input>
                                                </div>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <div className="control">
                                                    <input className="form-control" type="password" name="password" placeholder="Your Password" onChange={handleChange}></input>
                                                </div>
                                            </div>

                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" name="remember" value="" />
                                                <label className="form-check-label" for="inputRememberPassword">Remember Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button className="small" href="password.html">Forgot Password?</button>
                                                <button id="loginButton" className="btn btn-primary">Login</button>
                                                {/* <img src="https://www.tennispro.es/skin/frontend/base/default/images/gomage/loadinfo.gif" id="loading" style="width: 100px; height: 100px; display:none;" /> */}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a href="/signup">Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Login;