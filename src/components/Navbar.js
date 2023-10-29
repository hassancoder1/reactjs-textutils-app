import React from 'react'
import logo from './assets/images/logo.png';
import { NavLink } from 'react-router-dom'

const Navbar = ({toggleThemeMode, themeMode, setCustomThemeColor}) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${themeMode} bg-${themeMode}`}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img src={logo} alt="Logo" width='50' /> TextUtils</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About TextUtils</NavLink>
                        </li>
                    </ul>
                    <div className="form-check form-switch text-light">
                        {/* <input type="color" onChange={(e)=>setCustomThemeColor(e.target.value)} /> */}
                        <input type="color" value='#6C3DD2' onChange={(e) => setCustomThemeColor(e.target.value)} style={{ borderRadius: '100%', width: '30px', height: '30px', padding: '0px',overflow: 'hidden' }} />
            
                        <input className="form-check-input" type="checkbox" onClick={toggleThemeMode}/>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
