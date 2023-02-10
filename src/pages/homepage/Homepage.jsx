import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import Blogcontext from "../../context/blogcontext";

export default function Homepage() {
  const location = useLocation();
  const {host}=useContext(Blogcontext)
  // console.log(location.search)
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchallposts = async () => {
      let response = await axios.get(`${host}/api/post`+location.search);
      setposts(response.data);
    };
    fetchallposts();
  }, [location.search]);

  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
}
