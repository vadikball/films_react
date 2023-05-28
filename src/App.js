import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import { Auth, SignUp } from './Auth';
import MainComponent from './MainComponent';
import Main from './MainPage';
import Navbar from './NavBar';

function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [user, setUser] = useState({ access_token: null, refresh_token: null });

  return (
    <div className="App-header">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Root />
              </ProtectedRoute>
            }
          />
          <Route path="/watch-together" element={<Main user={user} setUser={setUser} />} />
          <Route path="/watch-together/room/:uuid" element={<MainComponent user={user} />} />
          <Route
            path="/auth"
            element={
              <Auth user={user} setUser={setUser} emailRef={emailRef} passwordRef={passwordRef} />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp user={user} setUser={setUser} emailRef={emailRef} passwordRef={passwordRef} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function Root() {
  return <Navigate to="/watch-together" replace />;
}

function NotFound() {
  return (
    <div className="App-header">
      <h1>404: page not found</h1>
    </div>
  );
}

export default App;
