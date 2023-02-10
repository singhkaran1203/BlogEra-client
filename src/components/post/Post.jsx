import { Link } from "react-router-dom";
import "./post.css";

export default function Post(props) {
  const PF="http://localhost:5000/images/"
  return (
    <div className="post">
      {props.data.photo && (
        <img className="postImg" src={PF+props.data.photo} alt="" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {props.data.categories.map((cat) => {
            return <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                {cat.name}
              </Link>
            </span>;
          })}
        </div>
        <span className="postTitle">
          <Link to={`/post/${props.data._id}`} className="link">
            {props.data.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(props.data.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{props.data.description}</p>
    </div>
  );
}
