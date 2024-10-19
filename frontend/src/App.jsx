import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login'
import HomePage from '../components/HomePage';
import Events from '../pages/Events';
import Notifications from '../pages/Notifications';
import Feedback from '../pages/Feedback';
import Profile from '../pages/Profile';
import Signup1 from '../components/Signup1';
import Admin from '../components/Admin';
import Aevents from '../pages/Aevents';
import Anotifications from '../pages/Anotifications';
import Afeedback from '../pages/Afeedback';
import Auser from '../pages/Auser';
import Layout from '../components/Layout';
import Alayout from '../components/Alayout';
import Aprofile from '../pages/Aprofile';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<Signup1/>} />
      <Route path="/" element={<Login/>} />
      </Routes>

      <Layout>
    
        <Routes>
          {/* Define routes for each page */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/events" element={<Events />} />
          <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/feedback" element={<Feedback />} />
          <Route path="/home/profile" element={<Profile />} />
         
        </Routes>
    </Layout>

  <Alayout>
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<Admin />}/>
        <Route path="/admin/events" element={<Aevents />} />
        <Route path="/admin/notifications" element={<Anotifications />} />
        <Route path="/admin/feedback" element={<Afeedback />} />
        <Route path="/admin/users" element={<Auser />} />
        <Route path='/admin/profile' element={<Aprofile/>}/>
      
    </Routes>
    </Alayout>
    </Router>
  );
}

export default App;

