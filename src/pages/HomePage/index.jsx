import React from "react";
import { useHistory } from "react-router-dom";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import SearchPage from "../../components/SearchPage/SearchPage";
import "./index.scss";

const HomePage = () => {
  const history = useHistory();

  return (
    <div className="homePageWrapper">
      <div className="searchSection">
        <div className="search-elements">
          <h1>Fix Your Customer Service Issues Faster.</h1>
          <h2>Get a rep on the phone faster & get better help.</h2>
        </div>
        <div className="autoCompleteSection">
          <SearchPage />
        </div>
      </div>
      ß
      <RecentSearch />
      <div className="footer">
        <a href="javascript:void(0)" onClick={() => history.push("/contact")}>
          Contact Us
        </a>
        <a href="javascript:void(0)" onClick={() => history.push("/terms")}>
          Terms and Conditions
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push("/privacy_policy")}
        >
          Privacy Policy
        </a>
        <span>@ Get Human</span>
      </div>
    </div>
  );
};

export default HomePage;
