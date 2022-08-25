import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import SearchPage from "../../components/SearchPage/SearchPage";
import "./index.scss";
import axios from "axios";
import pageLogo from "../../assets/logo.png";

const HomePage = () => {
  const [title, setTitle] = useState(
    "Fix Your Customer Service Issues Faster."
  );
  const [subTitle, setSubTitle] = useState(
    "Get a rep on the phone faster & get better help."
  );
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/pageControl`)
      .then((res) => {
        const pageData = res.data.data.pageData;
        setTitle(pageData.title);
        setSubTitle(pageData.subtitle);

        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.getElementsByTagName("head")[0].appendChild(link);
        }
        link.href = pageData.faviconURL;
      })
      .catch(() => {});
  }, []);
  return (
    <>
      <Helmet>
        <title>How to Fix Common Customer Service Problems</title>
      </Helmet>
      <div className="pageHeader">
        <a href="/">
          <img alt="drektory" src="/logo.png" />
        </a>
      </div>
      <div className="homePageWrapper">
        <div className="searchSection">
          <div className="search-elements">
            <h1>How to Fix Common Customer Service Problems</h1>
            <h2>
              Free, step-by-step expert guides for fixing popular customer
              issues for any company
            </h2>
          </div>
          <div className="autoCompleteSection">
            <SearchPage />
          </div>
        </div>
        <RecentSearch />
        <div className="footer">
          <Link to="/contact">Contact Us</Link>
          <Link to="/terms">Terms and Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span>&copy; Drektory</span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
