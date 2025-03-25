import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

let Login = (props) => {
  var [email, setEmail] = useState("scott@test.com");
  var [password, setPassword] = useState("Scott123");
  let userContext = useContext(UserContext);
  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  let [message, setMessage] = useState("");

  let Validate = () => {
    let errorsData = [];

    //Email validation

    errorsData.email = [];
    let validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!email) {
      errorsData.email.push("Email can't be blank");
    }
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Proper email address is expected");
      }
    }

    //Password validation
    errorsData.password = [];

    let validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;

    if (!password) {
      errorsData.password.push("Password can't be blank");
    }

    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit"
        );
      }
    }
    setErrors(errorsData);
  };

  useEffect(Validate, [email, password]);

  let onLoginClick = async () => {
    //set all as dirty
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    Validate();

    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let body = await response.json();
        if (body.length > 0) {
          userContext.setUser({
            ...userContext.user,
            isLoggedIn: true,
            currentUserName: body[0].fullName,
            currentUserId: body[0].id,
          });
          setMessage("Login Successfull");
          props.history.replace("/dashboard");
        }
      } else {
        setMessage(
          <span className="text-danger">Invalid Login, please try again</span>
        );
      }
    } else {
      setMessage(
        <span className="text-danger">Unable to connect to server</span>
      );
    }
  };

  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  useEffect(() => {
    document.title = "Login - eCommerce";
  }, []);

  return (
    <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
            <h4
              style={{ fontSize: "40px" }}
              className="text-success text-center"
            >
              Login
            </h4>
            <ul className="text-danger">
              {Object.keys(errors).map((control) => {
                if (dirty[control]) {
                  return errors[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                } else {
                  return "";
                }
              })}
            </ul>
          </div>
          <div className="card-body border-bottom border-success">
            {/* email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  Validate();
                }}
                placeholder="Email"
              />
              <div className="text-danger">
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </div>
            </div>

            {/* password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  Validate();
                }}
                placeholder="Password"
              />
              <div className="text-danger">
                {dirty["password"] && errors["password"][0]
                  ? errors["password"]
                  : ""}
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <div className="m-1">{message}</div>
            <button className="btn btn-success m-2" onClick={onLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
