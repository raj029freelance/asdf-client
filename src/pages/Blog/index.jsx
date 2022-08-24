import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import "./index.scss";
import { Helmet } from "react-helmet";
import SideBarLayout from "../SidebarLayout";
import { useHistory, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "antd";

const Blog = () => {
  const { id } = useParams();

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [faqData, setFaqData] = useState();
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`)
      .then((resp) => {
        setRecentSearch(resp.data?.searches);
        let endpoint = `${process.env.REACT_APP_BACKEND_URL}/faq`;
        if (id) {
          endpoint = `${endpoint}/${id}`;
        }
        console.log(endpoint);
        axios.get(endpoint).then((faqResp) => {
          setFaqData(faqResp.data?.data);
        });
      })
      .catch(() => history.push("/not-found"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      {isLoading ? (
        <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <ReactLoading type="bars" color="#5f49d9" className="posCenter" />
        </div>
      ) : (
        faqData && (
          <SideBarLayout recentSearches={recentSearch}>
            <div className="blog-wrapper">
              {id ? (
                <BlogContent data={faqData[0]} />
              ) : (
                <ListOfBlogs data={faqData} />
              )}
            </div>
          </SideBarLayout>
        )
      )}
    </>
  );
};

const BlogContent = ({ data }) => {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className="title-wrapper">
        <div
          className="back-icon"
          onClick={() => {
            history.goBack();
          }}
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </div>
        <h1
          style={{ marginBottom: 0 }}
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
      </div>
      <p dangerouslySetInnerHTML={{ __html: data.description }} />
    </>
  );
};

const ListOfBlogs = ({ data }) => {
  const history = useHistory();
  return (
    <>
      <h1>Our Blogs</h1>
      {data.map((faq, index) => (
        <a
          onClick={(e) => {
            e.preventDefault();
            history.push(`/blog/${faq._id}`);
          }}
          style={{ fontSize: "1rem" }}
          key={index}
        >
          {faq.title}
        </a>
      ))}
    </>
  );
};

export default Blog;
