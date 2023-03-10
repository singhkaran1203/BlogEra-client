import "./register.css";
import { useState,useContext } from "react";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";
import Blogcontext from "../../context/blogcontext";

export default function Register() {
  const {host}=useContext(Blogcontext)
  const history=useHistory();
  const [userinfo, setUserinfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${host}/api/auth/register`, userinfo);
      res.data && history.push("/login");
    } catch (err) {
      window.alert("something went wrong !!");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handlesubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          value={userinfo.username}
          onChange={(e) => {
            setUserinfo({ ...userinfo, username: e.target.value });
          }}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          value={userinfo.email}
          onChange={(e) => {
            setUserinfo({ ...userinfo, email: e.target.value });
          }}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          value={userinfo.password}
          onChange={(e) => {
            setUserinfo({ ...userinfo, password: e.target.value });
          }}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <Link to="/login"><button className="registerLoginButton">Login</button></Link>
    </div>
  );
}
