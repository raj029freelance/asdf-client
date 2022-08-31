import React, { useState, useEffect } from "react";
import "./index.scss";
import { Helmet } from "react-helmet";
import SideBarLayout from "../SidebarLayout";
import { useHistory } from "react-router-dom";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { TimePicker } from "antd";
import "./index.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { toast } from "react-toastify";
const { Option } = Select;

const initialState = {
  CompanyName: "",
  PhoneNumber: "",
  DepartmentYourCalling: "Customer Service",
  CallBackAvailable: "NO",
  CallPickedUpByARealPerson: "NO",
  BestTimeToDail: "111",
  serviceHours: 1,
  serviceDays: 1,
  CallCenterHours: `1 hour and 1 day`,
};
const validationSchema = Yup.object().shape({
  CompanyName: Yup.string().required("Company Name required"),
  PhoneNumber: Yup.string().required("Phone Number required"),
  DepartmentYourCalling: Yup.string().required(
    "Enter Department you are calling"
  ),
  BestTimeToDail: Yup.string().required("Best Time to Dail required"),
  serviceHours: Yup.string().required("Service Hours required"),
  serviceDays: Yup.string().required("Service Days required"),
});

const AddSubmissionForm = () => {
  const history = useHistory();
  const [editorState, setEditorState] = useState();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const htmlString = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      const formData = {
        ...values,
        CallCenterHours: `${values.serviceHours}hours , ${values.serviceDays}days`,
        description: htmlString,
      };

      let endpoint = `${process.env.REACT_APP_BACKEND_URL}/submissions`;
      axios
        .post(endpoint, formData, {})
        .then(() => {
          formik.resetForm();
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
    },
  });

  return (
    <>
      <Helmet>
        <title>Submit Phone Number</title>
      </Helmet>
      <SideBarLayout>
        <div className="submit-form-wrapper">
          <h1>Submit New Phone Number</h1>
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
              name="basic"
              labelCol={{ span: 8 }}
              layout="vertical"
              size="large"
              onFinish={(e) => e.preventDefault()}
              autoComplete="off"
            >
              <Form.Item required label="Company Name">
                <Input
                  size="large"
                  type="text"
                  name="CompanyName"
                  value={formik.values.CompanyName}
                  onChange={formik.handleChange}
                  placeholder="Company Name"
                />
              </Form.Item>
              <Form.Item required label="Phone Number">
                <Input
                  size="large"
                  type="text"
                  name="PhoneNumber"
                  value={formik.values.PhoneNumber}
                  onChange={formik.handleChange}
                  placeholder="Phone Number"
                />
              </Form.Item>

              <Form.Item
                name="department"
                label="Department your calling"
                required
              >
                <Select
                  placeholder="Enter Department you are calling"
                  name="DepartmentYourCalling"
                  value={formik.values.DepartmentYourCalling}
                  onChange={formik.handleChange}
                >
                  <Option value="Customer Service">Customer Service</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Service Hours" name="hour" required>
                <Input
                  size="large"
                  type="number"
                  name="serviceHours"
                  value={formik.values.serviceHours}
                  onChange={formik.handleChange}
                  placeholder="Enter Hour"
                  min={1}
                  max={24}
                />
              </Form.Item>
              <Form.Item label="Service Days" name="days" required>
                <Input
                  size="large"
                  type="number"
                  name="serviceDays"
                  value={formik.values.serviceDays}
                  onChange={formik.handleChange}
                  placeholder="Enter days"
                  min={1}
                  max={7}
                />
              </Form.Item>
              <div className="time-checkbox-wrapper">
                <div className="time-wrapper">
                  <p>Best Time to Dail</p>
                  <TimePicker
                    use12Hours
                    format="h:mm a"
                    onChange={(value) =>
                      formik.setFieldValue(
                        "BestTimeToDail",
                        value.format("h:mm a")
                      )
                    }
                  />
                </div>

                <div className="checkbox-wrapper">
                  <Checkbox
                    onChange={(e) =>
                      formik.setFieldValue(
                        "CallBackAvailable",
                        `${e.target.checked ? "YES" : "NO"}`
                      )
                    }
                  >
                    CallBack Available
                  </Checkbox>
                  <Checkbox
                    style={{ marginLeft: "0" }}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "CallPickedUpByARealPerson",
                        `${e.target.checked ? "YES" : "NO"}`
                      )
                    }
                  >
                    Call Picked
                  </Checkbox>
                </div>
              </div>
            </Form>
            <Editor
              editorState={editorState}
              editorClassName="editor"
              onEditorStateChange={(editState) => {
                setEditorState(editState);
              }}
            />
            <Button
              onClick={formik.handleSubmit}
              block
              size="large"
              type="primary"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </SideBarLayout>
    </>
  );
};

export default AddSubmissionForm;
