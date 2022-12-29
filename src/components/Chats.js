import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const history = useHistory();

  const { user } = useAuth();
  // { user } will hold the { user } values we provided
  // to AuthContextProvider through value prop in AuthContext.js
  // <AuthContext.Provider value={value}>
  // {value} holds the user data
  // console.log(user);

  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
    // This will redirect us back to the "/" home page (Login page)
    // once we signed out.
  };

  // ====================================================================================
  // const getFile = async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.blob();
  //   // blob() will allow us to transfer files in binary format like images or any
  //   // other type of file. This blob contains our image.
  // =================THIS THROWS AN ERROR SO I HAD TO REMOVE  IT========================
  // ====================================================================================

  //   return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  // };
  // This function will allow users to have an image

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    // This will re-direct to the homepage if no user is found.

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
          // This user-name and user-secret data is coming from useAuth context
        },
      })
      .then(() => {
        setLoading(false);
        // This will make a call to chatengine.io/users/me by using the headers provided.
        // This will load the chat data from an "already created user."
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        // This will create a new user if there's no user found in the ChatEngine

        // ====================================================================================
        // getFile(user.photoURL)
        //   .then((avatar) => {
        //     formdata.append("avatar", avatar, avatar.name);
        // });
        // =================THIS THROWS AN ERROR SO I HAD TO REMOVE  IT========================
        // ====================================================================================

        axios
          .post("https://api.chatengine.io/users", formdata, {
            headers: {
              "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
            },
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
        // This will finally post a new user in chatengine
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";
  // This will return a string called "Loading..." if there's no user or the app is still loading

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
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        // We need to be able to grab the userName and the userSecret from firebase auth
        // to be able to logged in
      />
    </div>
  );
};

export default Chats;
