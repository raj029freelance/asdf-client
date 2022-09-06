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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ThankYouContactUs = () => {
  return (
    <>
      <Helmet>
        <title>Thank you for reaching out to us</title>
      </Helmet>
      <SideBarLayout>
        <div className="thankyou-wrapper">
          <FontAwesomeIcon icon={faCheckCircle} className="thankyou-icon" />
          <h1>Thank You for reaching out to us </h1>
          <p>
            Our team has recieved your message and will get back to you soon.
          </p>
        </div>
      </SideBarLayout>
    </>
  );
};

export default ThankYouContactUs;
