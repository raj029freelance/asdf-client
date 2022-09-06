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
import { useHistory } from "react-router-dom";

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

const AddSubmissionForm = () => {
  const history = useHistory();

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
        history.push("/submission/success");
      })
      .catch((err) => {
        if (err.response.data.message !== undefined) {
          toast.error(err.response.data.message, {
            autoClose: 2000,
            pauseOnHover: false,
          });
        } else {
          toast.error(`Error submitting request.`, {
            autoClose: 2000,
            pauseOnHover: false,
          });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Submit Your Listing</title>
      </Helmet>
      <SideBarLayout>
        <div className="submit-form-wrapper">
          <h1>Submit your Listing </h1>
          <p>You can submit a request to add a new phone number</p>
          <hr
            style={{
              width: "100%",
              borderColor: "hsl(249, 65%, 65%)",
              marginBottom: "1.5rem",
            }}
          />
          <div className="organizationForm">
            <Form
              form={form}
              initialValues={initialState}
              name="basic"
              layout="vertical"
              size="large"
              onFinish={handleFinish}
              autoComplete="off"
            >
              <Form.Item
                rules={[{ required: true }]}
                name="CompanyName"
                label="Company Name"
              >
                <Input type="text" placeholder="Company Name" />
              </Form.Item>

              <Form.Item
                rules={[{ required: true }]}
                name="PhoneNumber"
                label="Phone Number"
              >
                <Input type="text" placeholder="Phone Number" />
              </Form.Item>

              <Form.Item
                rules={[{ required: true }]}
                name="email"
                label="Email (Will not be shown publicly)"
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="DepartmentYourCalling"
                label="Department your calling"
                rules={[{ required: true }]}
              >
                <Select placeholder="Enter Department you are calling">
                  <Select.Option value="Customer Service">
                    Customer Service
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="serviceHours"
                label="Service Hours"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Enter Hour" />
              </Form.Item>

              <Form.Item
                name="serviceDays"
                label="Service Days"
                rules={[{ required: true }]}
              >
                <Input size="large" type="number" placeholder="Enter days" />
              </Form.Item>

              <div className="time-checkbox-wrapper">
                <Form.Item label="Best Time to Dail" name="BestTimeToDail">
                  <TimePicker use12Hours format="h:mm a" />
                </Form.Item>
                <Form.Item name="CallBackAvailable" valuePropName="checked">
                  <Checkbox>CallBack Available</Checkbox>
                </Form.Item>
                <Form.Item
                  name="CallPickedUpByARealPerson"
                  valuePropName="checked"
                >
                  <Checkbox style={{ marginLeft: "0" }}>Call Picked</Checkbox>
                </Form.Item>
              </div>

              <Editor
                editorState={editorState}
                editorClassName="editor"
                onEditorStateChange={(editState) => {
                  setEditorState(editState);
                }}
              />
              <Form.Item>
                <Button htmlType="submit" block type="primary">
                  Submit Request
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </SideBarLayout>
    </>
  );
};

export default AddSubmissionForm;
