import { Route, Routes, useLocation } from "react-router-dom";

import Page from "../Page";
import SigninPage from "../Auth/SigninPage";
import SignupPage from "../Auth/SignupPage";
import IndexPage from "../IndexPage";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Page />}>
        <Route index element={<IndexPage />} />
      </Route>
    </Routes>
  );
};

AppRoutes.propTypes = {};

export default AppRoutes;

