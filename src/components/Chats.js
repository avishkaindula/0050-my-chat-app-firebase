import React from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const history = useHistory();

  const { user } = useAuth();
  // { user } will hold the { user } values we provided
  // to AuthContextProvider through value prop in AuthContext.js
  // <AuthContext.Provider value={value}>
  // {value} holds the user data
  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
    // This will redirect us back to the "/" home page (Login page)
    // once we signed out.
  };

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="47e205cb-ec9f-4bfc-9e04-caa92f2e3904"
        userName="."
        userSecret="."
        // We need to be able to grab the userName and the userSecret from firebase auth
        // to be able to logged in
      />
    </div>
  );
};

export default Chats;
