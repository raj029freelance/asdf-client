/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecentSearch.scss";
import { Skeleton, Space } from "antd";

const RecentSearch = () => {
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`)
      .then((resp) => setRecentSearch(resp.data?.searches))
      .catch(() => {});
  }, []);

  return (
    <div className="searchesWrapper">
      <h2>Recent Searches</h2>
      <div className="layout">
        {recentSearch
          ? recentSearch.map((organization, index) => (
              <Link key={index} to={`/${organization?.organization_id}`}>
                {organization.organization_name}
              </Link>
            ))
          : [...Array(6)].map(() => (
              <Skeleton.Input size="size" active block />
            ))}
      </div>
    </div>
  );
};

export default RecentSearch;
