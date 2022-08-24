import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";

const SideBarLayout = ({ children, recentSearches }) => {
  const history = useHistory();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="nav">
        <h1>Drektory</h1>
      </div>
      <div className="details-wrapper">
        <div
          style={{ position: "fixed", height: "100vh", userSelect: "none" }}
          className="sidebar-left"
        >
          <p>Phone Numbers</p>
          <p>Contact Information</p>
          <p>Customer Service</p>
          <p
            onClick={(e) => {
              e.preventDefault();
              history.push("/blog");
            }}
          >
            Our Blogs
          </p>
          <p>Local postings</p>
        </div>
        <div className="content" style={{ padding: "2rem" }}>
          {children}
        </div>
        <div className="sidebar-right">
          <h2>Recent Searched Companies</h2>
          <hr
            style={{
              width: "100%",
              borderColor: "hsl(249, 65%, 65%)",
              marginBottom: "1.5rem",
            }}
          />
          {recentSearches.slice(0, 10).map((organization, index) => (
            <a
              align="start"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                history.push(`/${organization?.organization_id}`);
                history.go(0);
              }}
            >
              {organization.organization_name}
            </a>
          ))}
        </div>
      </div>
      <div className="footer">
        <Link to="/contact">Contact Us</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <span>@ Get Human</span>
      </div>
    </div>
  );
};

export default SideBarLayout;