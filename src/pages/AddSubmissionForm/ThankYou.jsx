import { Button, Checkbox, Form, Input, Select, TimePicker } from "antd";
import axios from "axios";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import SideBarLayout from "../SidebarLayout";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ThankYouSubmission = () => {
  return (
    <>
      <Helmet>
        <title>Thank you for submitting your listing</title>
      </Helmet>
      <SideBarLayout>
        <div className="thankyou-wrapper">
          <FontAwesomeIcon icon={faCheckCircle} className="thankyou-icon" />
          <h1>Thank You for your submission </h1>
          <p>Our team will review your submission and will get back to you.</p>
        </div>
      </SideBarLayout>
    </>
  );
};

export default ThankYouSubmission;
