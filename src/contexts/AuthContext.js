import React, { useContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) history.push("/chats");
      // history.push will re-navigate us to our /chats page.
      // if (user) will make user that we only navigate to /chats if we have a user.
      // I think it also means that if we have logged in as a user and try to navigate
      // to the "/" page (Login page), we will automatically get redirected to "/chats" page.
    });
  }, [user, history]);
  // We need to call useEffect whenever we add a user or when we re-navigate.
  // [user] will handle the cases where we add a user.
  // [history] will handle the cases where we re-navigate.

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* This means if not loading then show children. */}
    </AuthContext.Provider>
  );
}
