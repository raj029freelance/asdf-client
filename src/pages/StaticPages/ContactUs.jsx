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
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ContactUs.scss";
import { useHistory } from "react-router-dom";

const ContactUs = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    from: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const reqCall = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contact/us`,
        formData
      );
      history.push("/contact/success");
    } catch (err) {
      setLoading(false);
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
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Drektory</title>
      </Helmet>
      <SideBarLayout>
        <div className="contact-wrapper">
          <h1>React out to you us </h1>
          <p>Fill in the details and will get back to you.</p>
          <hr
            style={{
              width: "100%",
              borderColor: "hsl(249, 65%, 65%)",
              marginBottom: "1.5rem",
            }}
          />
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              name="name"
              placeholder="Name"
              required
              type="text"
              onChange={handleChange}
            />
            <Input
              name="from"
              placeholder="Email address"
              required
              type="email"
              onChange={handleChange}
            />
            <Input
              name="subject"
              placeholder="Subject"
              required
              type="text"
              onChange={handleChange}
            />
            <Input.TextArea
              rows={8}
              name="message"
              placeholder="Message"
              onChange={handleChange}
            />
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ marginRight: 10 }}
              />
              {loading ? "Sending...." : "Submit"}
            </Button>
          </form>
        </div>
      </SideBarLayout>
    </>
  );
};

export default ContactUs;
