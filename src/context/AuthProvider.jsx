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

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
      return () => {
        unSubscribe();
      };
    });
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    signInWithGoogle,
    signOutUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
}
