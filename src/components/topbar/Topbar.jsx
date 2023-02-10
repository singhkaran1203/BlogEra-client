import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext,useState } from "react";
import Blogcontext from "../../context/blogcontext";

export default function Topbar() {
  const {currentuser,setCurrentuser,host} = useContext(Blogcontext)
  const [toggle, setToggle] = useState(false)
  const PF=`${host}/images/`;
  const handlelogout=(e)=>{
    e.preventDefault();
    setCurrentuser(null);
    localStorage.setItem("bloguser",null); 
  }

  return (
    <div className="top">
      <div className="topLeft">
        <h1 className="topTitle">BlogEra</h1>
      </div>
      <div className={toggle?"topCenter":"topCenter toggle"}>
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          {/* <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li> */}
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {currentuser && <li className="topListItem" onClick={handlelogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className={toggle?"topRight":"topRight toggle"}>
        {currentuser ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={currentuser.profilePic && PF+currentuser.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
        <i className="topSearchIcon fas fa-bars" onClick={()=>setToggle(!toggle)}></i>
    </div>
  );
}
