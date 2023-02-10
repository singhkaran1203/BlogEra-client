import "./login.css";
import { useRef,useContext } from "react";
import { useHistory,Link } from "react-router-dom";
import axios from "axios";
import Blogcontext from "../../context/blogcontext";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const { setCurrentuser }=useContext(Blogcontext);
  const history=useHistory()

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(userRef.current.value)
    try {
      const res = await axios.post("/api/auth/login", {
        email: userRef.current.value,
        password: passRef.current.value,
      });
      if(res.data){
          setCurrentuser(res.data);
          localStorage.setItem("bloguser",JSON.stringify(res.data));
          // console.log(currentuser);
          history.push("/");
      }
    } catch (err) {
      window.alert("Wrong credentials !!");
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handlesubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <Link to="/register"><button className="loginRegisterButton">Register</button></Link>
    </div>
  );
}
