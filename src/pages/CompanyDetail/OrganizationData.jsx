import React from "react";
import { Button, Card, Table } from "antd";
import ArticleDescriptionCard from "../../components/articleDescriptionCard/ArticleDescriptionCard";
import "./OrganizationData.scss";
function OrganizationData({ data, onHelpClicked }) {
  const cols = [
    {
      dataIndex: "left",
    },
    {
      dataIndex: "right",
    },
  ];

  const dataSource = [
    {
      key: "1",
      left: "Company Name",
      right: data.CompanyName,
    },
    {
      key: "2",
      left: "Department You are Calling",
      right: data.DepartmentYourCalling,
    },
    {
      key: "3",
      left: "Call Center Hours",
      right: data.CallCenterHours,
    },
    {
      key: "4",
      left: "Best time to Dial",
      right: data.BestTimeToDail,
    },
    {
      key: "5",
      left: "Phone Number",
      right: data.PhoneNumber,
    },
  ];

  return (
    <div id="phone-details" className="organization-wrapper">
      <div className="title-wrapper" style={{ marginBottom: "1rem" }}>
        <h1 align="start">{`${data.CompanyName} Phone Number`}</h1>
        <p align="start">{`${data.CompanyName} ${data.DepartmentYourCalling} with Drektory`}</p>
      </div>
      <Card id="contact-information">
        <div>
          <div className="section">
            <div>
              <h1 align="start">{data.PhoneNumber} </h1>
              <p align="start">{data.DepartmentYourCalling}</p>
            </div>
            <div>
              <h1 align="start">{data.CallCenterHours}</h1>
              <p align="start">Service Hours</p>
            </div>
            <div>
              <h1 align="start">{data.BestTimeToDail}</h1>
              <p align="start">Best Time to Dail</p>
            </div>
          </div>
          <div style={{ display: "grid", placeItems: "flex-start" }}>
            <Button type="primary" onClick={onHelpClicked}>
              Help with my issue
            </Button>
          </div>
        </div>
      </Card>
      <ArticleDescriptionCard overview={data.description} />
      <div id="company-details" style={{ padding: "2rem 0 2rem 0" }}>
        <div className="title-wrapper" style={{ marginBottom: "1rem" }}>
          <h1>Company Details</h1>
        </div>
        <hr style={{ marginBottom: "1rem" }} />
        <Table
          showHeader={false}
          pagination={false}
          dataSource={dataSource}
          columns={cols}
        />
      </div>
    </div>
  );
}

export default OrganizationData;
