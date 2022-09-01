import { Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";

const SideBarLayout = ({
  children,
  loading = false,
  isOnCompanyDetails = false,
}) => {
  const [isRecentsLoading, setRecentsLoading] = useState(true);
  const [recentSearch, setRecentSearch] = useState();
  const history = useHistory();
  const [pageLogo, setPageLogo] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`)
      .then((res) => setRecentSearch(res.data?.searches))
      .catch(() => history.push("/not-found"))
      .finally(() => setRecentsLoading(false));

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/pageControl`)
      .then((res) => setPageLogo(res.data.data.pageData.siteLogo))
      .catch(() => {});
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="nav">
        <Link to="/">{pageLogo && <img alt="Drektory" src={pageLogo} />}</Link>
      </div>

      <div className="details-wrapper">
        <div
          style={{ position: "fixed", height: "100vh", userSelect: "none" }}
          className="sidebar-left"
        >
          <Link to="/">
            {pageLogo ? (
              <img
                alt="drektory"
                src={pageLogo}
                style={{ width: "100%", marginBottom: 50 }}
              />
            ) : (
              <Skeleton.Input active style={{ marginBottom: "2rem" }} />
            )}
          </Link>
          {[
            { title: "Phone Numbers", id: "phone-details" },
            { title: "Contact Information", id: "contact-information" },
            { title: "Company Details", id: "company-details" },
            { title: "Customer Service", id: "company-details" },
          ].map(({ title, id }, index) => (
            <p
              key={index}
              onClick={(e) => {
                e.preventDefault();
                if (isOnCompanyDetails) {
                  const target = document.getElementById(id);
                  target.scrollIntoView();
                  return;
                }
                history.push("/");
              }}
            >
              {title}
            </p>
          ))}
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
          <p
            onClick={(e) => {
              e.preventDefault();
              history.push("/new");
            }}
          >
            Submit New Phone
          </p>
        </div>

        <div className="content" style={{ padding: "2rem" }}>
          {loading ? (
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Skeleton active paragraph={{ rows: 20 }} />
            </div>
          ) : (
            children
          )}
        </div>

        <div className="sidebar-right">
          <h2>Drektory Contact Info</h2>
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
          <p>Drektory Help Desk on Twitter</p>

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
          {isRecentsLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              {[...Array(4)].map((_, index) => (
                <Skeleton.Input key={index} block size="small" active />
              ))}
            </div>
          ) : (
            recentSearch &&
            recentSearch.map((organization, index) => (
              <p
                align="start"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/phone-number/${organization?.slug}`);
                  if (isOnCompanyDetails) history.go(0);
                }}
              >
                {organization.organization_name}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="footer">
        <Link to="/">Home</Link>
        <Link to="/blog">Our Blog</Link>
        <Link to="/new">Submit new Phone</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <span>&copy; Drektory</span>
      </div>
    </div>
  );
};

export default SideBarLayout;
