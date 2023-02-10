import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import Blogcontext from "./context/blogcontext";

function App() {
  const {currentuser} = useContext(Blogcontext);
  // console.log(currentuser)
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/posts">
          <Homepage />
        </Route>
        <Route exact path="/register">
          {currentuser ? <Homepage /> : <Register />}
        </Route>
        <Route exact path="/login">{currentuser ? <Homepage /> : <Login />}</Route>
        <Route exact path="/login">{currentuser ? <Homepage /> : <Login />}</Route>
        <Route exact path="/post/:id">
          <Single />
        </Route>
        <Route exact path="/write">{currentuser ? <Write /> : <Login />}</Route>
        <Route exact path="/settings">{currentuser ? <Settings /> : <Login />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
