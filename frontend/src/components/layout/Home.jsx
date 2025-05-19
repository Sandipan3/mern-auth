import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <div>
        <div>
          <p>Professional Development</p>
          <h1>Learn more, earn more!</h1>
          <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
