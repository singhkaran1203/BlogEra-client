import "./write.css";
import { useContext,useState } from "react";
import Blogcontext from "../../context/blogcontext";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function Write() {
  const {currentuser,host}=useContext(Blogcontext);
  const history=useHistory();
  const [file, setfile] = useState(null)
  const [postinfo, setpostinfo] = useState({
    title:"",
    username:currentuser.username,
    userid:currentuser._id,
    description:"",
  })

  const handlesubmit=async (e)=>{
    e.preventDefault();
    if(file){
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      postinfo.photo=filename;
      // console.log(postinfo)
      try{
        await axios.post(`${host}/api/upload`,data)
      }catch(err){}
    }

    try{
      const res=await axios.post(`${host}/api/post`,postinfo)
      console.log(res.data);
      history.push("/");
    }
    catch(err){
      window.alert("something went wrong");
    }
  }


  return (
    <div className="write">
      {file && <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />}
      <form className="writeForm" onSubmit={handlesubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e)=>{setfile(e.target.files[0])}} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>{
              setpostinfo({...postinfo,title:e.target.value})
            }}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>{
              setpostinfo({...postinfo,description:e.target.value})
            }}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
