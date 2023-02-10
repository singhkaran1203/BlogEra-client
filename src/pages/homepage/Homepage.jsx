import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";

export default function Homepage() {
  const location = useLocation();
  // console.log(location.search)
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchallposts = async () => {
      let response = await axios.get("/api/post"+location.search);
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
