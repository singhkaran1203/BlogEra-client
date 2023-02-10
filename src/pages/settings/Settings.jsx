import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import Blogcontext from "../../context/blogcontext";
import axios from "axios";

export default function Settings() {
  const { currentuser } = useContext(Blogcontext);
  const [file, setFile] = useState(null);
  const [updateduser, setUpdateduser] = useState({
    userID:currentuser._id,
    username:currentuser.username,
    email:currentuser.email,
    password:""
  });

  const PF = "http://localhost:5000/images/";

  const handlesubmit = async (e) => {
    e.preventDefault();
    if(file){
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      updateduser.profilePic=filename;
      try{
        await axios.post("/api/upload",data);
      }
      catch(err){}
    }
    try{
      const res= await axios.put("/api/user/"+currentuser._id,updateduser)
      localStorage.setItem("bloguser",JSON.stringify(res.data));
      window.location.replace("/");
    }
    catch(err){
      window.alert("enter your information correctly");
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          {/* <span className="settingsTitleDelete">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handlesubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={
                file ? URL.createObjectURL(file) : currentuser.profilePic && PF + currentuser.profilePic
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            name="name"
            value={updateduser.username}
            onChange={(e) => {
              setUpdateduser({ ...updateduser, username: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={updateduser.email}
            onChange={(e) => {
              setUpdateduser({ ...updateduser, email: e.target.value });
            }}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              setUpdateduser({ ...updateduser, password: e.target.value });
            }}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
