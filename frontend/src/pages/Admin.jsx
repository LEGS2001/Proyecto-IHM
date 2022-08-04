import React, { useState, useEffect } from 'react'
import httpClient from "../utils/httpClient";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

function Admin() {
    const [user, setUser] = useState(null)
    const [table_user, setTable_user] = useState(null)
    const [table_course, setTable_course] = useState(null)
    const [table_reading, setTable_reading] = useState(null)

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
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/admin");
                setTable_user(resp.data[0]);
                setTable_course(resp.data[1]);
                setTable_reading(resp.data[2]);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <div id="layoutAuthentication" className="bg-primary row justify-content-center container-fluid px-4">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5" style={{ width: "160%" }}>
                                    {(user && user.user_type == "Admin") ? (
                                        <>
                                            <div className="card-header">
                                                <h3 className="text-center font-weight-light my-4">CRUD - Admin</h3>
                                            </div>
                                            <div className="card mb-4">
                                                <div className="card-body">
                                                <div className="card-header">
                                                    <th>
                                                        <FontAwesomeIcon icon={faTable} />
                                                    </th>
                                                    <th>
                                                        <div> &nbsp; Reading Database </div>
                                                    </th>
                                                </div>
                                                    <table className="table">
                                                        <thead className="table-dark">
                                                            <tr >
                                                                <th style={{ color:"white" }}>User Type</th>
                                                                <th style={{ color:"white" }}>Name</th>
                                                                <th style={{ color:"white" }}>Email</th>
                                                                <th style={{ color:"white" }}>Edit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="table-light table-striped table-hover">
                                                            {(table_user) ? table_user.map((item, i) => (
                                                                <>
                                                                    <tr>
                                                                        <th>{item[3]}</th>
                                                                        <th>{item[1]}</th>
                                                                        <th>{item[2]}</th>
                                                                        <div style={{ flex: 1 }}>
                                                                            <form method="POST" action="/admin-update-user-getid">
                                                                                <input type="hidden" name="userid" value="{{ row[0] }}" />
                                                                                <button href="/admin-update-user" className="btn btn-primary" style={{ backgroundColor: "gray" }}>l</button>
                                                                            </form>
                                                                            <form method="POST" action="/admin-delete-user">
                                                                                <input type="hidden" name="userid" value="{{ row[0] }}" />
                                                                                <button className="btn btn-primary" style={{ backgroundColor: "gray" }}>x</button>
                                                                            </form>
                                                                        </div>
                                                                    </tr>
                                                                </>
                                                            )) : <></>}
                                                        </tbody>
                                                    </table>
                                                    <div className="card-header">
                                                        <th>
                                                            <FontAwesomeIcon icon={faTable} />
                                                        </th>
                                                        <th>
                                                            <div> &nbsp; Course Database </div>
                                                        </th>
                                                    </div>
                                                    <table className="table">
                                                        <thead className="table-dark">
                                                            <tr>
                                                                <th style={{ color:"white" }}>Course</th>
                                                                <th style={{ color:"white" }}>Teacher</th>
                                                                <th style={{ color:"white" }}>Entry Key</th>
                                                                <th style={{ color:"white" }}>Students</th>
                                                                <th style={{ color:"white" }}>Edit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="table-light table-striped table-hover">
                                                            {(table_course) ? table_course.map((item, i) => (
                                                                <>
                                                                    <tr>
                                                                        <th>{item[1]}</th>
                                                                        <th>{item[4]}</th>
                                                                        <th>{item[2]}</th>
                                                                        <th>WIP</th>
                                                                        <div style={{ flex: 1 }}>
                                                                            <form method="POST" action="/admin-update-course-getid">
                                                                                <input type="hidden" name="courseid" value="{{ row[0] }}" />
                                                                                <button href="/admin-update-course" className="btn btn-primary" style={{ backgroundColor: "gray" }}>l</button>
                                                                            </form>
                                                                            <form method="POST" action="/admin-delete-course">
                                                                                <input type="hidden" name="courseid" value="{{ row[0] }}" />
                                                                                <button className="btn btn-primary" style={{ backgroundColor: "gray" }}>x</button>
                                                                            </form>
                                                                        </div>
                                                                    </tr>
                                                                </>
                                                            )) : <></>}
                                                        </tbody>
                                                    </table>
                                                    <div className="card-header">
                                                        <th>
                                                            <FontAwesomeIcon icon={faTable} />
                                                        </th>
                                                        <th>
                                                            <div> &nbsp; Reading Database </div>
                                                        </th>
                                                    </div>
                                                    <table className="table">
                                                        <thead className="table-dark">
                                                            <tr>
                                                                <th style={{ color:"white" }}>Reading</th>
                                                                <th style={{ color:"white" }}>Text</th>
                                                                <th style={{ color:"white" }}>Edit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="table-light table-striped table-hover">
                                                            {(table_reading) ? table_reading.map((item, i) => (
                                                                <>
                                                                    <tr>
                                                                        <th>{item[1]}</th>
                                                                        <th>{item[3]}</th>
                                                                        <th>
                                                                            <div style={{ flex: 1 }}>
                                                                                <form method="POST" action="/admin-update-reading-getid">
                                                                                    <input type="hidden" name="readingid" value="{{ row[0] }}" />
                                                                                    <button href="/admin-update-reading" className="btn btn-primary" style={{ backgroundColor: "gray" }}>l</button>
                                                                                </form>
                                                                                <form method="POST" action="/admin-delete-reading">
                                                                                    <input type="hidden" name="readingid" value="{{ row[0] }}" />
                                                                                    <button className="btn btn-primary" style={{ backgroundColor: "gray" }}>x</button>
                                                                                </form>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </>
                                                            )) : <></>}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    ) : (<>
                                        <div className="card-header">
                                            <h3 className="text-center font-weight-light my-4">You're not supposed to be here...</h3>
                                        </div>
                                        <div className="card mb-4">
                                            <div className="card-header" style={{ textAlign: "center" }}>
                                                <a href="/profile"> Go back</a>
                                            </div>
                                        </div>
                                    </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Admin