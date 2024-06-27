import { createSlice } from "@reduxjs/toolkit";
import ailabApi from "@ailab/api-client/ailabApi";

export const REDUCER_NAME = "app";

const initialState = {
  ui: {
    isAuthorized: null,
    initializeInProcess: true,
  },
  profile: null,
};

const mergeValues = (values, state) =>
  Object.keys(values).reduce((acc, key) => {
    const { _merge: shouldMerge, ...valueState } = values[key] ?? {};
    return {
      ...acc,
      [key]: shouldMerge ? mergeValues(valueState, state[key]) : values[key],
    };
  }, state);

export const appSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setUiState: (state, action) => {
      state.ui = mergeValues(action.payload, state.ui);
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

const selectSelf = (state) => state[REDUCER_NAME];
export const getUiState = (keyOrKeys) => (state) => {
  const { ui } = selectSelf(state);
  return Array.isArray(keyOrKeys)
    ? keyOrKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: ui[key],
        }),
        {},
      )
    : ui[keyOrKeys];
};
export const selectProfile = (state) => selectSelf(state).profile;

export const mapState = (state) => ({
  profile: selectProfile(state),
  initializeInProcess: getUiState("initializeInProcess")(state),
  isAuthorized: getUiState("isAuthorized")(state),
});

export const { actions, reducer } = appSlice;

export const initialize =
  (navigate) => async (dispatch) => {
    dispatch(
      actions.setUiState({
        initializeInProcess: true,
      }),
    );
    const jwt = window.localStorage.getItem("ailabJWT");
    if (!jwt) {
      dispatch(
        actions.setUiState({
          isAuthorized: false,
          initializeInProcess: false,
        }),
      );
      navigate("/signin");
      return;
    }

    ailabApi.setJWT(jwt);

    try {
      //const profile = await ailabApi.me();
      const profile = {
        id: 1,
        name: "John Doe",
        email: "",
      };
      dispatch(actions.setProfile(profile));
      navigate("/");
    } catch (err) {
      log.error(err);
      if (err.response.data.errorMessage === "jwt expired") {
        window.localStorage.removeItem("ailabJWT");
        ailabApi.setJWT(null);
        dispatch(
          actions.setUiState({
            isAuthorized: false,
            initializeInProcess: false,
          }),
        );
        return;
      }
    }

    dispatch(
      actions.setUiState({
        isAuthorized: true,
        initializeInProcess: false,
      }),
    );
  };

export const logout = () => (dispatch) => {
  window.localStorage.removeItem("ailabJWT");
  dispatch(
    actions.setUiState({
      isAuthorized: false,
    }),
  );
};

export const { setProfile } = actions;

export default reducer;
