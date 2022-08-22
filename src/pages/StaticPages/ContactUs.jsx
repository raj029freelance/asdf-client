import { Input, Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "./ContactUs.scss";

function ContactUs() {
  const history = useHistory();

  return (
    <div className="contact-wrapper">
      <div className="form-wrapper">
        <h2>
          <strong>Contact Us</strong>
        </h2>
        <form>
          <Input name="name" placeholder="Name" required type="text" />
          <Input
            name="email"
            placeholder="Email address"
            required
            type="email"
          />
          <Input.TextArea rows={8} name="message" placeholder="Message" />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </div>
      <div className="footer">
        <a href="javascript:void(0)" onClick={() => history.push("/")}>
          Home
        </a>
        <a href="javascript:void(0)" onClick={() => history.push("/terms")}>
          Terms and Conditions
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push("/privacy_policy")}
        >
          Privacy Policy
        </a>
        <span>@ Get Human</span>
      </div>
    </div>
  );
}

export default ContactUs;
