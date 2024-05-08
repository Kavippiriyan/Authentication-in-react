import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './component/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginpage from './component/Loginpage';
import { DashboardPage } from './component/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/' element={<h1>Home</h1>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
