import UserContext from "./userContext";
import PropTypes from "prop-types";
import { useState } from "react";

function UserStates({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = "https://unsplashbackend.onrender.com/";

  // Function to fetch images from the API
  const profile = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await fetch(url + "me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  // Function to fetch images from the API
  const registerUser = async (name, email, password) => {
    try {
      setLoading(true);

      const response = await fetch(url + "register", {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Ensure this header is set
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.pathname = "/";
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(url + "login", {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Ensure this header is set
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.pathname = "/";
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{ loading, registerUser, loginUser, user, profile }}>
      {children}
    </UserContext.Provider>
  );
}

UserStates.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserStates;
