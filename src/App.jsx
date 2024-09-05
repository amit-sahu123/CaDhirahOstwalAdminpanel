import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/homepage/HomeLayout';
import Meetings from './components/pages/Meetings';
import Contact from './components/pages/Contact';
import Career from './components/pages/Career';
import Dashboard from './components/pages/Dashboard';
import Login from './components/Login'; 
import { auth } from './firebase'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

        <Route path="/" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
        <Route path="/meeting" element={isAuthenticated ? <Layout><Meetings /></Layout> : <Navigate to="/login" />} />
        <Route path="/contact" element={isAuthenticated ? <Layout><Contact /></Layout> : <Navigate to="/login" />} />
        <Route path="/career" element={isAuthenticated ? <Layout><Career /></Layout> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}

export default App;

