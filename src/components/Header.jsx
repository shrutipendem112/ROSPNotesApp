import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import DarkMode from './DarkMode/DarkMode';
import { useNavigate } from 'react-router-dom';
import './pages/Login.css';

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={{color: "blueviolet"}}>Notes Application</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <DarkMode/>
        <Button variant="outline-danger"  className="ml-3 logout-btn" onClick={handleLogout}>
            Logout
          </Button>
      </Container>
    </Navbar>
  )
}

export default Header
