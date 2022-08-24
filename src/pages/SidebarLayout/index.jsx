import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import ReactLoading from "react-loading";
import axios from "axios";

const SideBarLayout = ({ children, loading }) => {
  const [isRecentsLoading, setRecentsLoading] = useState(true);
  const [recentSearch, setRecentSearch] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`)
      .then((res) => setRecentSearch(res.data?.searches))
      .catch(() => history.push("/not-found"))
      .finally(() => setRecentsLoading(false));
  }, []);

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
          {loading ? (
            <div
              style={{ height: "100vh", display: "grid", placeItems: "center" }}
            >
              <ReactLoading type="bars" color="#5f49d9" className="posCenter" />
            </div>
          ) : (
            children
          )}
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
          {isRecentsLoading ? (
            <div
              style={{ display: "grid", placeItems: "center", width: "100%" }}
            >
              <ReactLoading type="bars" color="#5f49d9" />
            </div>
          ) : (
            recentSearch &&
            recentSearch.map((organization, index) => (
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
            ))
          )}
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
