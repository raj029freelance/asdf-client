import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "antd/dist/antd.min.css";
import CompanyDetail from "./pages/CompanyDetail";
import TermsOfService from "./pages/StaticPages/TermsOfService";
import ContactUs from "./pages/StaticPages/ContactUs";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>App Title</title>
      </Helmet>
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/privacy_policy" component={PrivacyPolicy} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/:id" component={CompanyDetail} />
        </Switch>
      </ScrollToTop>
    </div>
  );
}

export default App;
