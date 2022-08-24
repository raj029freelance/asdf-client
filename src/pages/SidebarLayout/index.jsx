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
          {["Phone Numbers", "Contact Information", "Customer Service"].map(
            (item, index) => (
              <p
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/");
                }}
              >
                {item}
              </p>
            )
          )}
          <p
            onClick={(e) => {
              e.preventDefault();
              history.push("/blog");
            }}
          >
            Our Blogs
          </p>
          <p
            onClick={(e) => {
              e.preventDefault();
              history.push("/");
            }}
          >
            Local postings
          </p>
        </div>
        <div className="content" style={{ padding: "2rem" }}>
          {children}
        </div>
        <div className="sidebar-right">
          <h2>Comcast Contact Info</h2>
          <hr
            style={{
              width: "100%",
              borderColor: "hsl(249, 65%, 65%)",
              marginBottom: "1.5rem",
            }}
          />
          <p>Information gathered by drektory researchers</p>
          <p>Drektory Phone Number</p>
          <p>BEST Drektory Live Chat </p>
          <p>Drektory Help Desk Comcast on Twitter</p>

          <br />
          <br />
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
              style={{ marginBottom: 15 }}
              onClick={(e) => {
                e.preventDefault();
                history.push(`/${organization?.organization_id}`);
                history.go(0);
              }}
            >
              {organization.organization_name.length >= 30
                ? organization.organization_name.slice(0, 30) + ".."
                : organization.organization_name}
            </a>
          ))}
        </div>
      </div>
      <div className="footer">
        <Link to="/contact">Contact Us</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <span>&copy; Drektory</span>
      </div>
    </div>
  );
};

export default SideBarLayout;
