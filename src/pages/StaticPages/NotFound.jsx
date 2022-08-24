import React from "react";
import SearchPage from "../../components/SearchPage/SearchPage";
import "./NotFound.scss";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="searchSection">
        <p
          style={{
            fontSize: "5rem",
            lineHeight: "6rem",
            fontWeight: 600,
            marginBottom: "0",
          }}
        >
          404
        </p>
        <p style={{ fontSize: "2rem", marginBottom: "10px" }}>Page Not Found</p>
        <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
          You can search for organizations with the search bar below
        </p>
        <div style={{ width: "500px" }}>
          <SearchPage />
        </div>
      </div>
    </>
  );
}

export default NotFound;
