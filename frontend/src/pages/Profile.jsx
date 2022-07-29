import React from 'react'
import { useEffect, useState } from 'react';
import httpClient from '../utils/httpClient';

function Profile() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                setUser(resp.data);
            } catch (error) {
                console.log(error.message);
                console.log("Usuario no autorizado")
            }
        })();
    }, []);

    return (
        <div id="layoutSidenav_content">
            <main>
                <h1 className="title">
                    Welcome, {user != null ? user.name: <div></div>}
                </h1>
                <h2>
                    PRUEBA: Probando que funciona el Login
                </h2>
                <a href="/" className="btn btn-primary" style={{backgroundColor:"gray"}}> Go Home </a>
                <br></br>
                <a href="/admin" className="btn btn-primary" style={{backgroundColor:"gray"}}> CRUD (ADMIN) </a>
                <a href="/teacher" className="btn btn-primary" style={{backgroundColor:"gray"}}> CRUD (TEACHER) </a>
                <a href="/student" className="btn btn-primary" style={{backgroundColor:"gray"}}> CRUD (STUDENT) </a>
                <br></br>
                <a href="/webcam" className="btn btn-primary" style={{backgroundColor:"gray"}}> PROBAR WEBCAM </a>
            </main>
        </div>
    )
}

export default Profile