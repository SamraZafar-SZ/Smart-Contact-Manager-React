import React from "react";
import Layout from "./Layout";
import "./Home.css"; // Import the Home CSS file

const Home = () => {
  return (
    <Layout>
      <section className="banner d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="font-weight-bold">Smart Contact Manager</h1>
          <p>
            Start collecting your contacts and handle them smartly and
            efficiently.
          </p>
          <button className="btn bg-primary btn-lg">Get Started</button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
