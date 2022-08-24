import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import axios from "axios";
import QueryModal from "../../components/queryModal/QueryModal";
import { Helmet } from "react-helmet";
import OrganizationData from "./OrganizationData";
import SideBarLayout from "../SidebarLayout";

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
            <SideBarLayout recentSearches={recentSearch}>
              <OrganizationData
                data={organizationData}
                onHelpClicked={() => setIsModalvisible(true)}
              />
            </SideBarLayout>
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
