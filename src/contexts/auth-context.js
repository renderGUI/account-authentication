import { createContext, useState, useEffect, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { ref, set, onValue, push } from "firebase/database";
import { database } from "../firebase-config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

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

  const postData = (userId, chatMessage, timeSent) => {
    const db = database;
    const pathRef = ref(db, `chatlog/`);
    const newChatMessage = push(pathRef);

    set(newChatMessage, {
      chatMessage: chatMessage,
      sentBy: userId,
      timeSent: timeSent,
      id: newChatMessage.key,
    });
  };

  const readData = () => {
    setLoadingMessages(true);
    const db = database;
    const pathRef = ref(db, `chatlog/`);

    onValue(pathRef, (snapshot) => {
      const data = snapshot.val();
      const convertedData = Object.values(data); // Converts object of objects to array of objects.
      setMessages(convertedData);
      setLoadingMessages(false);
    });
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
    postData,
    readData,
    messages,
    loadingMessages,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
};
