import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    passsword: "",
  });

  const { email, password } = formData;

  const changeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      /**
       e.target.name (the input's name attribute)
       e.target.value (what the user typed)
       */
    });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("awesome");
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Login in to your account info</p>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => changeHandler(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => changeHandler(e)}
            required
            minLength="4"
          />
        </div>
        <input type="submit" value="Register" />
        <p>
          Not registered yet? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
