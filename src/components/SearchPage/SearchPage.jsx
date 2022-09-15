import React from "react";
import "./SearchPage.scss";
import { useState } from "react";
import axios from "axios";
import DebounceSelect from "../DebounceSelect/DebounceSelect";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const retryRequest = async (username) => {
//   await sleep(1000);
//   return axios
//     .get(`${process.env.REACT_APP_BACKEND_URL}/organizations/?name=${username}`)
//     .then(function ({ data }) {
//       const structure = data.data.organizations.map((organization) => ({
//         label: `${organization.CompanyName}`,
//         value: organization.slug,
//       }));
//       return structure;
//     });
// };
async function fetchOrganizationList(username) {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/organizations/?name=${username}`)
    .then(function ({ data }) {
      const structure = data.data.organizations.map((organization) => ({
        label: `${organization.CompanyName}`,
        value: organization.slug,
      }));
      return structure;
    });
}
const SearchPage = () => {
  const [value, setValue] = useState("");

  return (
    <DebounceSelect
      value={value}
      fetchOptions={fetchOrganizationList}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export default SearchPage;
