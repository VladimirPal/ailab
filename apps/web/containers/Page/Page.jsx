import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";

import { mapState, initialize } from "@ailab/ui-toolkit/api-slices/app";

function Page() {
  const location = useLocation();
  const theme = useTheme();
  const { initializeInProcess, isAuthorized } = useSelector(
    mapState,
    shallowEqual,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize(navigate));
  }, []);

  if (initializeInProcess) {
    return <div>Initialize in process...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

Page.propTypes = {};

export default Page;
