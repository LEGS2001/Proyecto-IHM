import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

// importación de los íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faColumns, faSearch, faBars, faUser, faAngleDown, faBookOpen, faChartArea, faTable } from '@fortawesome/free-solid-svg-icons';



const Base = () => {

    // variable para mostrar sidebar
    const [mostrar, setMostrar] = useState(true);
    const { user, setUser } = useContext(UserContext)

    return (
        <body className="sb-nav-fixed">
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" style={{ position: "sticky" }}>

                <a className="navbar-brand ps-3" href="/">Start Bootstrap</a>

                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!" onClick={() => setMostrar(!mostrar)}><FontAwesomeIcon icon={faBars} /></button>

                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </form>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><FontAwesomeIcon icon={faUser} /></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/">Settings</a></li>
                            <li><a className="dropdown-item" href="/">About</a></li>
                            <li><hr className="dropdown-divider" /></li>

                            {(user != null) ? (
                                <div>
                                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                    <li><a className="dropdown-item" href="/logout">Log Out</a></li>
                                </div>) : (
                                <div>
                                    <li><a className="dropdown-item" href="/login">Login</a></li>
                                    <li><a className="dropdown-item" href="/signup">Register</a></li>
                                </div>)}

                        </ul>
                    </li>

                </ul>
            </nav>
            {mostrar ? <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" style={{ position: "sticky" }} id="sidenavAccordion" >
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Core</div>
                                <a className="nav-link" href="/">
                                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTachometerAlt} /></div>
                                    Dashboard
                                </a>
                                <div className="sb-sidenav-menu-heading">Interface</div>
                                <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faColumns} /></div>
                                    Layouts
                                    <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a className="nav-link" href="/">Static Navigation</a>
                                        <a className="nav-link" href="/">Light Sidenav</a>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBookOpen} /></div>
                                    Pages
                                    <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                                </a>
                                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                        <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                            Authentication
                                            <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                                        </a>
                                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="/login">Login</a>
                                                <a className="nav-link" href="/signup">Register</a>
                                                <a className="nav-link" href="/">Forgot Password</a>
                                            </nav>
                                        </div>
                                        <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                            Error
                                            <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                                        </a>
                                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="/">401 Page</a>
                                                <a className="nav-link" href="/">404 Page</a>
                                                <a className="nav-link" href="/">500 Page</a>
                                            </nav>
                                        </div>
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">Addons</div>
                                <a className="nav-link" href="/">
                                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faChartArea} /></div>
                                    Charts
                                </a>
                                <a className="nav-link" href="/">
                                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTable} /></div>
                                    Tables
                                </a>
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            {user != null ? (<div>{user.name}</div>) : <div>Guest</div>}
                        </div>
                    </nav>
                </div>

            </div> : null}
        </body>
    )
}
export default Base;