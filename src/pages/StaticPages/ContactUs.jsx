import { Input, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./ContactUs.scss";

function ContactUs() {
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
        <Link to="/">Home</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy_policy">Privacy Policy</Link>
        <span>@ Get Human</span>
      </div>
    </div>
  );
}

export default ContactUs;
