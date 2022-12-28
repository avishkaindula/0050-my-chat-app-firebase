import React, { useContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      history.push("/chats");
      // history.push will re-navigate us to our chat application.
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
