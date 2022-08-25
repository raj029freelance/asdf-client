import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";
import { Helmet } from "react-helmet";
import SideBarLayout from "../SidebarLayout";
import { useHistory, useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/faq/${id}`)
      .then((res) => setSingleBlog(res.data?.data[0]))
      .catch(() => history.push("/not-found"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Blog - ${singleBlog?.title}` ?? "Blog"}</title>
      </Helmet>
      <SideBarLayout loading={isLoading}>
        {singleBlog && (
          <div className="blog-wrapper">
            <div className="title-wrapper">
              <div
                className="back-icon"
                onClick={() => {
                  history.push("/blog");
                  history.go(0);
                }}
              >
                <span class="material-symbols-outlined">arrow_back</span>
              </div>
              <h1 style={{ marginBottom: 0 }}>{singleBlog.title}</h1>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: singleBlog.description }}
              className="description"
            />
          </div>
        )}
      </SideBarLayout>
    </>
  );
};

export default SingleBlog;
