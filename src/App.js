import Header from './components/Header';
import './App.css';
import axios from 'axios';
import Note from './components/Note';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Edit from './components/Edit';
import { Col, Container, Row } from 'react-bootstrap';
import BASE_URL from './api';
import { Navigate, Route, Routes } from 'react-router-dom';
import RefrshHandler from './RefrshHandler';

import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Notes from './components/pages/Notes';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App"> 
    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Notes setIsAuthenticated={setIsAuthenticated}/>} />} />
      </Routes>
        </div>
  );
}

export default App;
