import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import Blogcontext from "../../context/blogcontext";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const {host}=useContext(Blogcontext);
  useEffect(() => {
    const getcats = async () => {
      const respo = await axios.get(`${host}/api/categories`);
      setCats(respo.data);
    };
    getcats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat) => {
            return (
              <li className="sidebarListItem">
                <Link className="link" to={`/posts?cat=${cat.name}`}>
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-github-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
