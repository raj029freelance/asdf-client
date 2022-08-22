import React from "react";
import { Link, useHistory } from "react-router-dom";
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
        <Link to="/contact">Contact Us</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy_policy">Privacy Policy</Link>
        <span>@ Get Human</span>
      </div>
    </div>
  );
};

export default HomePage;
