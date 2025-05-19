import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passsword: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

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
    if (password != confirmPassword) console.log("Password mismtach");
    else console.log(formData);
  };

  return (
    <div>
      <h1>Register</h1>
      <p>Specify your account info</p>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => changeHandler(e)}
            required
          />
        </div>
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
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => changeHandler(e)}
            required
          />
        </div>

        <input type="submit" value="Register" />
        <p>
          Already have ana account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
