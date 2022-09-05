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

const initialState = {
  CompanyName: "",
  PhoneNumber: "",
  DepartmentYourCalling: "Customer Service",
  CallBackAvailable: false,
  CallPickedUpByARealPerson: false,
  BestTimeToDail: "",
  serviceHours: 0,
  serviceDays: 0,
  email: "",
};

const ThankYouSubmission = () => {
  const [editorState, setEditorState] = useState();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const htmlString = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const formData = {
      ...values,
      CallBackAvailable: values.CallBackAvailable ? "YES" : "NO",
      CallPickedUpByARealPerson: values.CallPickedUpByARealPerson
        ? "YES"
        : "NO",
      BestTimeToDail: values.BestTimeToDail.format("h:mm a"),
      CallCenterHours: `${values.serviceHours} hours, ${values.serviceDays} days`,
      description: htmlString,
    };

    console.log(formData);
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/submissions`;
    axios
      .post(endpoint, formData, {})
      .then(() => {
        form.resetFields();
        setEditorState(undefined);

        toast.success("Request Submitted", {
          autoClose: 2000,
          pauseOnHover: false,
        });
      })
      .catch(() => {
        toast.error(`Error submitting request`, {
          autoClose: 2000,
          pauseOnHover: false,
        });
      });
  };

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
