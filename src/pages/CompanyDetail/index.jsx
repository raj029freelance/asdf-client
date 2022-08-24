import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import QueryModal from "../../components/queryModal/QueryModal";
import { Helmet } from "react-helmet";
import OrganizationData from "./OrganizationData";

const CompanyDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [organizationData, setOrganizationData] = useState();
  const [isModalVisible, setIsModalvisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("React App");

  const [recentSearch, setRecentSearch] = useState([]);

  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/organizations/${id}`)
      .then((orgResp) => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`)
          .then((resp) => {
            setRecentSearch(resp.data?.searches);
            setOrganizationData(orgResp.data?.data?.organization);
          });
      })
      .catch(() => history.replace("/not-found"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!organizationData) return;
    setPageTitle(organizationData?.CompanyName);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`, {
      organization_name: organizationData?.CompanyName,
      organization_id: organizationData?._id,
    });
  }, [organizationData]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {isLoading ? (
        <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <ReactLoading type="bars" color="#5f49d9" className="posCenter" />
        </div>
      ) : (
        <>
          {organizationData && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="nav">
                <h1>Drektory</h1>
              </div>
              <div className="details-wrapper">
                <div
                  style={{ position: "fixed", height: "100vh" }}
                  className="sidebar-left"
                >
                  <p>Phone Numbers</p>
                  <p>Contact Information</p>
                  <p>Customer Service</p>
                  <p>Fix Common Issues</p>
                  <p>Local postings</p>
                </div>
                <div className="content" style={{ padding: "2rem" }}>
                  <OrganizationData
                    data={organizationData}
                    onHelpClicked={() => setIsModalvisible(true)}
                  />
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
                  {recentSearch.slice(0, 10).map((organization, index) => (
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
                  ))}
                </div>
              </div>
              <div className="footer">
                <Link to="/contact">Contact Us</Link>
                <Link to="/terms">Terms and Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <span>@ Get Human</span>
              </div>
            </div>
          )}
          <QueryModal
            setIsModalvisible={setIsModalvisible}
            isModalVisible={isModalVisible}
          />{" "}
        </>
      )}
    </>
  );
};

export default CompanyDetail;
