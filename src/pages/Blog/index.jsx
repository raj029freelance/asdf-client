import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";
import { Helmet } from "react-helmet";
import SideBarLayout from "../SidebarLayout";
import { Link, useHistory } from "react-router-dom";

const Blog = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [faqData, setFaqData] = useState();

  useEffect(() => {
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/faq`;
    axios
      .get(endpoint)
      .then((res) => setFaqData(res.data?.data))
      .catch(() => history.push("/not-found"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <SideBarLayout loading={isLoading}>
        {faqData && (
          <div className="blog-wrapper">
            <h1>Step By Step Guides for Solving Drektory Issues</h1>
            <p>Instructions to help with popular customer service issues</p>
            <hr
              style={{
                width: "100%",
                borderColor: "hsl(249, 65%, 65%)",
                marginBottom: "1.5rem",
              }}
            />
            <h2>Our Latest Blogs</h2>
            <br />

            {faqData.map((faq, index) => (
              <Link
                key={index}
                to={`/blog/${faq._id}`}
                style={{ fontSize: "1rem" }}
              >
                {faq.title}
              </Link>
            ))}
          </div>
        )}
      </SideBarLayout>
    </>
  );
};

export default Blog;
