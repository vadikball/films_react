import React, { useEffect, useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';

export function Auth({ user, setUser, emailRef, passwordRef }) {
  console.log(user);
  if (user.access_token) {
    return <Navigate to="/watch-together" replace />;
  }

  return (
    <div>
      <ChangeButton signIn={false} />
      <div className="Auth">
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <AuthButton signIn={true} p={passwordRef} e={emailRef} setUser={setUser} />
      </div>
    </div>
  );
}

export function SignUp({ user, setUser, emailRef, passwordRef }) {
  console.log(user);
  if (user.access_token) {
    return <Navigate to="/watch-together" replace />;
  }

  return (
    <div>
      <ChangeButton signIn={true} />
      <div className="Auth">
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <AuthButton signIn={false} p={passwordRef} e={emailRef} setUser={setUser} />
      </div>
    </div>
  );
}

function AuthButton({ signIn, setUser, p, e }) {
  const fetchUser = async () => {
    const raw = await fetch('http://localhost/api/auth/v1/sessions/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email: e.current.value, password: p.current.value }),
    });
    const content = await raw.json();
    e.current.value = '';
    p.current.value = '';
    setUser(content);
  };

  const signUpUser = async () => {
    if (p.current.value.length < 8) {
      window.alert('password length < 8');
      return;
    }

    const raw = await fetch('http://localhost/api/auth/v1/users/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email: e.current.value, password: p.current.value }),
    });
    fetchUser();
  };

  if (signIn) {
    return <input type="button" value="sign in" onClick={fetchUser} />;
  } else {
    return <input type="button" value="sign up" onClick={signUpUser} />;
  }
}

function ChangeButton({ signIn }) {
  if (signIn) {
    return (
      <div className="AuthTitleHolder">
        already have an account:
        <Link to="/auth">
          <input type="button" value="sign in!" />
        </Link>
      </div>
    );
  } else {
    return (
      <div className="AuthTitleHolder">
        don't have any account?
        <Link to="/signup">
          <input type="button" value="sign up!" />
        </Link>
      </div>
    );
  }
}
