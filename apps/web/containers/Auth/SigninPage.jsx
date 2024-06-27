import { useReducer, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { mapState, initialize } from "@ailab/ui-toolkit/api-slices/app";
import keyValueReducer from "@ailab/ui-toolkit/reducers/keyValueReducer";
import { setState } from "@ailab/ui-toolkit/actions";
import { delay } from "@ailab/utils";
import ailabApi from "@ailab/api-client/ailabApi";

import WarningIcon from "@ailab/components/Icons/WarningIcon";

import * as S from "./styled";

const initialState = {
  isLoading: false,
  formValues: {
    email: "",
    password: "",
  },
  formErrors: {},
};

function SigninPage() {
  const { isAuthorized, initializeInProcess } = useSelector(mapState, shallowEqual);
  const [state, internalDispatch] = useReducer(keyValueReducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    internalDispatch(
      setState({
        formErrors: initialState.formErrors,
        formValues: {
          [name]: value,
          _merge: true,
        },
      }),
    );
  }

   const validateForm = () => {
    const isValid =
      state.formValues.email.length > 0 && state.formValues.password.length > 0;

    const formErrors = {};
    if (!isValid) {
      if (state.formValues.email.length === 0) {
        formErrors.email = "Email is required.";
      } else if (state.formValues.password.length === 0) {
        formErrors.password = "Password is required.";
      }
    }
    return [isValid, formErrors];
  };

  const onSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      const [isFormValid, formErrors] = validateForm();

      if (!isFormValid) {
        internalDispatch(
          setState({
            isLoading: false,
            formErrors,
          }),
        );
        return;
      }
      try {
        internalDispatch(
          setState({
            isLoading: true,
            formErrors: {},
          }),
        );
        const { jwtToken } = await ailabApi.signin({
          body: state.formValues,
        });
        window.localStorage.setItem("ailabJWT", jwtToken);
        dispatch(initialize(navigate));
      } catch (err) {
        log.error(err);
        // Fake delay to demonstrate loading progress
        await delay(1 * 1000);
        internalDispatch(
          setState("formErrors", {
            password: "Wrong email or password.",
          }),
        );
      } finally {
        internalDispatch(
          setState({
            isLoading: false,
          }),
        );
      }
    },
    [state.formValues],
  );

  return (
    <S.SigninPage>
      <S.AuthForm onSubmit={onSubmit}>
        <S.FormField>
          <S.InputField>
            <S.InputWithPlaceholder>
              <S.Input
                name="email"
                autoComplete="email"
                value={state.formValues.email}
                isValid={!state.formErrors.email}
                onChange={handleInputChange}
                autoFocus
                isEmpty
              />
              <S.Placeholder>Email</S.Placeholder>
            </S.InputWithPlaceholder>
            <S.InputBorder isValid={!state.formErrors.email} />
          </S.InputField>
        </S.FormField>

        <S.FormField>
          <S.InputField>
            <S.InputWithPlaceholder>
              <S.Input
                name="password"
                type="password"
                autoComplete="current-password"
                value={state.formValues.password}
                isValid={!state.formErrors.password}
                onChange={handleInputChange}
              />
              <S.Placeholder>
                Password
              </S.Placeholder>
            </S.InputWithPlaceholder>
            <S.InputBorder isValid={!state.formErrors.password} />
          </S.InputField>
          {state.formErrors.password && (
            <S.Error>
              <WarningIcon size="small" />
              <S.ErrorMessage>{state.formErrors.password}</S.ErrorMessage>
            </S.Error>
          )}
        </S.FormField>

        <S.SubmitButton
          fit
          appearance="primary"
          type="submit"
          isLoading={false}
          withIcon
        >
          Log in
        </S.SubmitButton>
      </S.AuthForm>
    </S.SigninPage>
  );
}
export default SigninPage;
