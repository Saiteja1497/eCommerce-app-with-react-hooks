import React, { useState } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";

function App() {
  let [user, setUser] = useState({
    isLoggedIn: false,
    currentUserName: null,
    currentUserId: null,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <HashRouter>
        <NavBar />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route path="*" exact={true} Component={NoMatchPage} />
          </Switch>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
