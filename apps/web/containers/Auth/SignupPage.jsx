import { useCallback, useReducer } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ailabApi from "@ailab/api-client/ailabApi";
import { mapState, initialize } from "@ailab/ui-toolkit/api-slices/app";
import keyValueReducer from "@ailab/ui-toolkit/reducers/keyValueReducer";
import { setState } from "@ailab/ui-toolkit/actions";
import { delay } from "@ailab/utils";

import WarningIcon from "@ailab/components/Icons/WarningIcon";

import * as S from "./styled";

const initialState = {
  isLoading: false,
  formValues: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  formErrors: {},
};

function SignupPage() {
  const { isAuthorized } = useSelector(mapState, shallowEqual);
  const [state, internalDispatch] = useReducer(keyValueReducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const isValid =
      state.formValues.email.length > 0 &&
      state.formValues.password.length > 0 &&
      state.formValues.passwordConfirm.length > 0 &&
      state.formValues.password === state.formValues.passwordConfirm;

    const formErrors = {};
    if (!isValid) {
      if (state.formValues.email.length === 0) {
        formErrors.email = "Email is required.";
      } else if (state.formValues.password.length === 0) {
        formErrors.password = "Password is required.";
      } else if (state.formValues.passwordConfirm.length === 0) {
        formErrors.password = "Password confirm is required.";
      } else if (
        state.formValues.password !== state.formValues.passwordConfirm
      ) {
        formErrors.password = "Passwords do not match.";
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
        const { jwtToken } = await ailabApi.signup({
          body: state.formValues,
        });
        window.localStorage.setItem("ailabJWT", jwtToken);
        dispatch(initialize(navigate));
      } catch (err) {
        // Fake delay to demostrate loading progress
        await delay(1 * 1000);
        internalDispatch(
          setState("formErrors", {
            password: err.response?.data?.error ?? err.message ?? "Server error",
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
    <S.SignupPage>
      <S.AuthForm onSubmit={onSubmit}>
        <S.FormField>
          <S.InputField>
            <S.InputWithPlaceholder>
              <S.Input
                name="email"
                autoComplete="email"
                value={state.formValues.email}
                isValid={!state.formErrors.email}
                autoFocus
                isEmpty
                onChange={(ev) => {
                  internalDispatch(
                    setState({
                      formErrors: {},
                      formValues: {
                        email: ev.target.value,
                        _merge: true,
                      },
                    }),
                  );
                }}
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
                onChange={(ev) => {
                  internalDispatch(
                    setState({
                      formErrors: {},
                      formValues: {
                        password: ev.target.value,
                        _merge: true,
                      },
                    }),
                  );
                }}
              />
              <S.Placeholder
                isEmpty={state.formValues.password === ""}
                isValid={!state.formErrors.password}
              >
                Password
              </S.Placeholder>
            </S.InputWithPlaceholder>
            <S.InputBorder isValid={!state.formErrors.password} />
          </S.InputField>
          <S.InputField>
            <S.InputWithPlaceholder>
              <S.Input
                name="passwordConfirm"
                type="password"
                autoComplete="current-password"
                value={state.formValues.passwordConfirm}
                isValid={!state.formErrors.passwordConfirm}
                onChange={(ev) => {
                  internalDispatch(
                    setState({
                      formErrors: {},
                      formValues: {
                        passwordConfirm: ev.target.value,
                        _merge: true,
                      },
                    }),
                  );
                }}
              />
              <S.Placeholder
                isEmpty={state.formValues.passwordConfirm === ""}
                isValid={!state.formErrors.passwordConfirm}
              >
                Password Confirm
              </S.Placeholder>
            </S.InputWithPlaceholder>
            <S.InputBorder isValid={!state.formErrors.passwordConfirm} />
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
          isLoading={state.isLoading}
          withIcon
        >
          Sign up
        </S.SubmitButton>
      </S.AuthForm>
    </S.SignupPage>
  );
}

SignupPage.propTypes = {};

export default SignupPage;
