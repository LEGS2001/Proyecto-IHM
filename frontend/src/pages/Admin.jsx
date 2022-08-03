import React, { useState, useEffect } from 'react'
import httpClient from "../utils/httpClient";

function Admin() {
    const [user, setUser] = useState(null)
    const [table_user, setTable_user] = useState(null)

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
                setTable_user(resp.data);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);

    return (

    <div id="layoutAuthentication" classNameName="bg-primary row justify-content-center container-fluid px-4">
        <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5" style={{width: "160%"}}>
                                {(user && user.user_type == "Admin")?(
                                <>
                                    <div className="card-header">
                                        <h3 className="text-center font-weight-light my-4">CRUD - Admin</h3>
                                    </div>

                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-table me-1"></i>
                                            Users Database
                                        </div>

                                        <div className="card-body">

                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>User Type</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>

                                                <tbody className="table-light table-striped table-hover">
                                                    {table_user.map((item, i) => (
                                                        <>
                                                            <tr>
                                                            <th>{item[3]}</th>
                                                            <th>{item[1]}</th>
                                                            <th>{item[2]}</th>
                                                            <div style={{flex: 1}}>
                                                                <form method="POST" action="/admin-update-user-getid">
                                                                    <input type="hidden" name="userid" value="{{ row[0] }}" />
                                                                    <button href="/admin-update-user" className="btn btn-primary" style={{backgroundColor:"gray"}}>l</button>
                                                                </form>
                                                                <form method="POST" action="/admin-delete-user">
                                                                    <input type="hidden" name="userid" value="{{ row[0] }}" />
                                                                    <button className="btn btn-primary" style={{backgroundColor:"gray"}}>x</button>
                                                                </form>
                                                            </div>
                                                            </tr>
                                                        </>
                                                        ))}
                                                </tbody>
                                            </table>
                                    
                                                
                                        <div className="card-header">
                                            <i className="fas fa-table me-1"></i>
                                            Course Database
                                        </div>
{/*
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Course</th>
                                                    <th>Teacher</th>
                                                    <th>Entry Key</th>
                                                    <th>Students</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>

                                            <tbody className="table-light table-striped table-hover">
                                                % for row in table_course %
                                                <tr>
                                                    <th>  row[1] </th>
                                                    <th>  row[4] </th>
                                                    <th>  row[2] /th>
                                                    <th>
                                                        % for row2 in table_student %
                                                        % if row2[3] == row[0] %
                                                         row2[2] .
                                                        % endif %
                                                        % endfor %
                                                    </th>
                                                    <th>
                                                        <div style="display: flex;">
                                                            <form method="POST" action="/admin-update-course-getid">

                                                                <input type="hidden" name="courseid" value="{{ row[0] }}" />
                                                                <button href="/admin-update-course" className="btn btn-primary" style="background-color:gray;">l</button>

                                                            </form>

                                                            <form method="POST" action="/admin-delete-course">

                                                                <input type="hidden" name="courseid" value="{{ row[0] }}" />
                                                                <button className="btn btn-primary" style="background-color:gray;">x</button>

                                                            </form>
                                                        </div>
                                                    </th>
                                                </tr>
                                                % endfor 
                                            </tbody>
                                        </table>


                                        <div className="card-header">
                                            <i className="fas fa-table me-1"></i>
                                            Reading Database
                                        </div>

                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Reading</th>
                                                    <th>Text</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>

                                            <tbody className="table-light table-striped table-hover">
                                                % for row in table_reading %
                                                <tr>
                                                    <th>  row[1] </th>
                                                    <th>  row[3]  </th>
                                                    <th>
                                                        <div style="display: flex;">
                                                            <form method="POST" action="/admin-update-reading-getid">

                                                                <input type="hidden" name="readingid" value="{{ row[0] }}" />
                                                                <button href="/admin-update-reading" className="btn btn-primary" style="background-color:gray;">l</button>

                                                            </form>

                                                            <form method="POST" action="/admin-delete-reading">

                                                                <input type="hidden" name="readingid" value="{{ row[0] }}" />
                                                                <button className="btn btn-primary" style="background-color:gray;">x</button>

                                                            </form>
                                                        </div>
                                                    </th>
                                                </tr>
                                                % endfor %
                                            </tbody>
                                        </table> 
                                                    */}
                                    </div>
                                </div>
                                </>
                                ):(<>
                                <div className="card-header">
                                    <h3 className="text-center font-weight-light my-4">You're not supposed to be here...</h3>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-header" style={{textAlign: "center"}}>
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