import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "antd/dist/antd.min.css";
import CompanyDetail from "./pages/CompanyDetail";
import TermsOfService from "./pages/StaticPages/TermsOfService";
import ContactUs from "./pages/StaticPages/ContactUs";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from "react-helmet";
import NotFound from "./pages/StaticPages/NotFound";
import Blog from "./pages/Blog";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>App Title</title>
      </Helmet>
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/blog/:id" component={Blog} />
          <Route path="/blog" component={Blog} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/:id" component={CompanyDetail} />
          <Redirect to="/not-found" />
        </Switch>
      </ScrollToTop>
    </div>
  );
}

export default App;
