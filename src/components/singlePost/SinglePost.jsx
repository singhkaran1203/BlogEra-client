import { Link, useLocation, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import axios from "axios";
import Blogcontext from "../../context/blogcontext";

export default function SinglePost() {
  const location = useLocation();
  const history = useHistory();
  const [post, setpost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdatemode] = useState(false);
  const path = location.pathname.split("/")[2];
  const { currentuser,host } = useContext(Blogcontext);
  const PF="http://localhost:5000/images/"

  useEffect(() => {
    const getpost = async () => {
      const res = await axios.get(`${host}/api/post/` + path);
      setpost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
    };
    getpost();
  }, [location, path, updatemode]);

  const handledelete = async () => {
    try {
      await axios.delete(`${host}/api/post/${post._id}`, {
        data: { userid: currentuser._id },
      });
      history.push("/");
    } catch (err) {}
  };

  const handleupdate=async()=>{
    try{
      await axios.put(`${host}/api/post/`+path,{title:title,description:desc,userid:currentuser._id});
      await setUpdatemode(false);
    }catch(err){}
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF+post.photo} alt="" />
        )}

        {updatemode ? (
          <input
            type="text"
            value={title}
            autofocus="true"
            className="singlePostTitleInput"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {currentuser && post.userid === currentuser._id ? (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdatemode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handledelete}
                ></i>
              </div>
            ) : (
              ""
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updatemode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.description}</p>
        )}
        {updatemode && (
          <button className="singlePostButton" onClick={handleupdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
