import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const Navigate = useNavigate();
  const logOut=()=>{
localStorage.setItem("authO", false)
  }
  return (
    <div className="container-scroller">
      {/* partial:partials/_navbar.html */}
      <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <div className="me-3">
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
              <span className="icon-menu" />
            </button>
          </div>
          <div>
            <a className="navbar-brand brand-logo" href="index.html">
              <h1>Logo</h1>
            </a>
            <a className="navbar-brand brand-logo-mini" href="index.html">
              <img src="assets/images/logo-mini.svg" alt="logo" />
            </a>
          </div>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-top"> 
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown d-none d-lg-block user-dropdown">
              <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="img-xs rounded-circle" src="assets/images/faces/face8.jpg" alt="Profile image" /> </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                <div className="dropdown-header text-center">
                  <img className="img-md rounded-circle" src="assets/images/faces/face8.jpg" alt="Profile image" />
                  <p className="mb-1 mt-3 font-weight-semibold">Allen Moreno</p>
                  <p className="fw-light text-muted mb-0">allenmoreno@gmail.com</p>
                </div>
                <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" /> My Profile <span className="badge badge-pill badge-danger">1</span></a>
                <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-power text-primary me-2" onClick={()=>{logOut()}} />Sign Out</a>
              </div>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
            <span className="mdi mdi-menu" />
          </button>
        </div>
      </nav>
      {/* partial */}
      <div className="container-fluid page-body-wrapper">
        {/* partial:partials/_settings-panel.html */}
        <div className="theme-setting-wrapper">            
          <div id="theme-settings" className="settings-panel">
            <i className="settings-close ti-close" />
            <p className="settings-heading">SIDEBAR SKINS</p>
            <div className="sidebar-bg-options selected" id="sidebar-light-theme"><div className="img-ss rounded-circle bg-light border me-3" />Light</div>
            <div className="sidebar-bg-options" id="sidebar-dark-theme"><div className="img-ss rounded-circle bg-dark border me-3" />Dark</div>
            <p className="settings-heading mt-2">HEADER SKINS</p>
            <div className="color-tiles mx-0 px-4">
              <div className="tiles success" />
              <div className="tiles warning" />
              <div className="tiles danger" />
              <div className="tiles info" />
              <div className="tiles dark" />
              <div className="tiles default" />
            </div>
          </div>
        </div>
        <div id="right-sidebar" className="settings-panel">
          <i className="settings-close ti-close" />
          {/* ... settings panel content ... */}
        </div>
        {/* partial */}
        {/* partial:partials/_sidebar.html */}
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item" onClick={()=>{Navigate('/dashboard')}}>
              <a className="nav-link"  >
                <i className="mdi mdi-grid-large menu-icon" />
                <span className="menu-title">Dashboard</span>
              </a>
            </li>
            <li className="nav-item nav-category">Manegements</li>
            <li className="nav-item" onClick={()=>{Navigate('/dashboard/users')}}>
              <a className="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                <i className=" menu-icon mdi mdi-account-circle-outline" />
                <span className="menu-title" >users</span>
                <i className="menu-arrow"  />
              </a>
            </li>
            <li className="nav-item" onClick={()=>{Navigate('/dashboard/Routes')}}>
              <a className="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                <i className="menu-icon mdi mdi-card-text-outline" />
                <span className="menu-title" >Routes</span>
                <i className="menu-arrow" />
              </a>
            </li>
            <li className="nav-item" onClick={()=>{Navigate('/dashboard/Stocks')}}>
              <a className="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                <i className="menu-icon mdi mdi-table" />
                <span className="menu-title">Stocks</span>
                <i className="menu-arrow" />
              </a>
            </li>
            <li className="nav-item nav-category">Routes</li>
            <li className="nav-item" onClick={()=>{Navigate('/dashboard/AssignRoute')}}>
              <a className="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                <i className="menu-icon mdi mdi-table" />
                <span className="menu-title">Assign Routes</span>
                <i className="menu-arrow" />
              </a>
            </li>
          </ul>
        </nav>
        {/* partial */}
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet />
          </div>
          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <footer className="footer">
            <div className="d-sm-flex justify-content-center">
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Copyright © 2025. All rights reserved.</span>
            </div>
          </footer>
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>      
  );
}

export default DashboardLayout; 