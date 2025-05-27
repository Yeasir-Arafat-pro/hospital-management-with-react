import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import './MainLayout.css'
const MainLayout = () => {
  return (
 <div id="root">
    <header className="app-header">
      <div className="logo">🏥 HospitalSys</div>
      <nav className="top-nav">
        <button className="nav-btn">🔔</button>
        <button className="nav-btn">⚙️</button>
        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="User" className="avatar"/>
          <span className="username">Dr. Smith</span>
        </div>
      </nav>
    </header>

    <div className="app-container">
      <aside className="app-sidebar">
        <ul className="sidebar-nav">
          <li><NavLink to="/" className="nav-link">🏠 Dashboard</NavLink></li>
          <li><NavLink to="/users" className="nav-link">👥 Users</NavLink></li>
          <li><NavLink to="/doctors" className="nav-link">🧑‍⚕️ Doctors</NavLink></li>
          <li><NavLink to="/patients" className="nav-link">🩺 Patients</NavLink></li>
          <li><NavLink to="/appointments" className="nav-link">📅 Appointments</NavLink></li>
          <li><NavLink to="/billing" className="nav-link">💰 Billing</NavLink></li>
          <li><NavLink to="/medicalRecords" className="nav-link">⚕️ Records</NavLink></li>
          
          <li><NavLink to="/rooms" className="nav-link">🛏 Rooms</NavLink></li><li><NavLink to="/departments" className="nav-link">🏬 Departments</NavLink></li>
        </ul>
        
      </aside>

      <main id="main-content">
        <Outlet />
      </main>
    </div>

    <footer className="app-footer">
      <span>© 2025 HospitalSys. All rights reserved.</span>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </footer>
  </div>
  )
}

export default MainLayout