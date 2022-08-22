import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "antd/dist/antd.min.css";
import CompanyDetail from "./pages/CompanyDetail";
import TermsOfService from "./pages/StaticPages/TermsOfService";
import ContactUs from "./pages/StaticPages/ContactUs";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/privacy_policy" component={PrivacyPolicy} />
        <Route path="/contact" component={ContactUs} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/:id" component={CompanyDetail} />
      </Switch>
    </>
  );
}

export default App;
