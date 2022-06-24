import { createContext, useState, useEffect, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!currentUser;

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const changePassword = (user, newPassword) => {
    return updatePassword(user, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    isLoggedIn,
    currentUser,
    signup,
    login,
    changePassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
};
