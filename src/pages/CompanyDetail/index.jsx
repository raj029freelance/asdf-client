import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import QueryModal from "../../components/queryModal/QueryModal";
import { Helmet } from "react-helmet";
import OrganizationData from "./OrganizationData";
import SideBarLayout from "../SidebarLayout";

const CompanyDetail = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [organizationData, setOrganizationData] = useState();
  const [isModalVisible, setIsModalvisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("React App");

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/organizations/slug/${slug}`)
      .then((orgResp) => setOrganizationData(orgResp.data?.data?.organization))
      .catch(() => history.replace("/not-found"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!organizationData) return;
    setPageTitle(organizationData?.CompanyName);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`, {
      organization_name: organizationData?.CompanyName,
      organization_id: organizationData?._id,
      organization_number: organizationData?.PhoneNumber,
      slug: organizationData?.slug,
    });
  }, [organizationData]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <SideBarLayout isOnCompanyDetails={true} loading={isLoading}>
        {organizationData && (
          <OrganizationData
            data={organizationData}
            onHelpClicked={() => setIsModalvisible(true)}
          />
        )}
      </SideBarLayout>

      <QueryModal
        setIsModalvisible={setIsModalvisible}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default CompanyDetail;
