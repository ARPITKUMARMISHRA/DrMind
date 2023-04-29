import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AuthState from '../../contexts/auth/authState';
import AuthContext from '../../contexts/auth/authContext';
// import { ReactComponent as Brand } from '../../../public/logo192.png';
import './navbar.css'


const Brand = () => {
    return (
        <NavLink href="/" className="brand">
            {/* <span class="brand-shape d-inline-block text-white">M</span> */}
            <span class="brandname">DrMind</span>
        </NavLink>
    );
}

const Navbar = () => {
    const nav = useNavigate();
    const [showNavbar, setShowNavbar] = useState(false);
    const [login, setLogin] = useContext(AuthContext);

    const handleShowNavbar = () => {
        setShowNavbar(true);
    }
    const handleHideNavbar = () => {
        setShowNavbar(false);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (res.status === 200) {
            setLogin(false);
            nav('/');
        } else {
            console.log('Could not logout');
        }
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Brand />
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <MenuIcon />
                </div>
                <div className={`nav-elements  ${showNavbar && 'active'}`}>
                    {showNavbar ? <CloseIcon onClick={handleHideNavbar} style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '30px' }} /> : null}
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {
                            login ?
                                <>
                                    <li>
                                        <NavLink to="/map">Find Nearby Healthcenters</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/chat">Chat App</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                </>
                        }
                        {
                            !login ?
                                <>
                                    <li>
                                        <NavLink to="/signin">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup">Signup</NavLink>
                                    </li>
                                </>
                                :
                                <li>
                                    <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;