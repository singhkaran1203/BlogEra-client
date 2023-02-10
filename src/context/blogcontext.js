import { createContext, React, useState } from "react";
const Blogcontext = createContext(null);

export const Blogcontextprovider = (props) => {
  const [currentuser, setCurrentuser] = useState( JSON.parse(localStorage.getItem("bloguser")) || null);
  return (
    <Blogcontext.Provider value={ {currentuser, setCurrentuser} }>
      {props.children}
    </Blogcontext.Provider>
  );
};

export default Blogcontext;
