import React, { useEffect, useState } from 'react';
import AuthContext from '/src/context/AuthContext.jsx';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 🔐 Create new user with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔓 Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔑 Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🚪 Sign out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      localStorage.removeItem('access-token');
    });
  };

  // 🧠 Monitor user state & handle JWT
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const { data } = await axios.post(
            'https://your-server.com/jwt', // 🛠️ Replace with your actual backend endpoint
            { email: currentUser.email }
          );
          localStorage.setItem('access-token', data.token);
        } catch (err) {
          console.error('JWT error:', err.message);
        }
      } else {
        localStorage.removeItem('access-token');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
