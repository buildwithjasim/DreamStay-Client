// src/provider/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import AuthContext from '/src/context/AuthContext.jsx';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // ✅ Register user
  const createUser = async (email, password, name, photo) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: name || 'New User',
      photoURL: photo || 'https://i.ibb.co/2yqF1xF/default-user.png',
    });

    setUser({ ...userCredential.user, displayName: name, photoURL: photo });
    return userCredential;
  };

  // ✅ Login existing user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Sign out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access-token');
      })
      .finally(() => setLoading(false));
  };

  // ✅ Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: currentUser.email,
          });
          const fetchedToken = res.data?.token;
          if (fetchedToken) {
            setToken(fetchedToken);
            localStorage.setItem('access-token', fetchedToken);
          }
        } catch (err) {
          console.error('Error fetching JWT:', err.message);
        }
      } else {
        setToken(null);
        localStorage.removeItem('access-token');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Auth context values
  const authInfo = {
    user,
    loading,
    token,
    createUser,
    loginUser,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
