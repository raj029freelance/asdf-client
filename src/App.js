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
import SingleBlog from "./pages/SingleBlog";
import AddSubmissionForm from "./pages/AddSubmissionForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThankYouSubmission from "./pages/AddSubmissionForm/ThankYou";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Helmet>
        <title>Drektory</title>
      </Helmet>
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/blog/:slug" component={SingleBlog} />
          <Route path="/blog" component={Blog} />
          <Route path="/new" component={AddSubmissionForm} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/phone-number/:slug" component={CompanyDetail} />
          <Route path="/submission/success" component={ThankYouSubmission} />

          <Redirect to="/not-found" />
        </Switch>
      </ScrollToTop>
    </div>
  );
}

export default App;
