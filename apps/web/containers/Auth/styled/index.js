import styled from "@emotion/styled";
import { css } from "@emotion/react/macro";

import Button from "@ailab/components/Button";

export const SigninPage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

  background-color: var(--background-surface);
`;

export const SignupPage = styled(SigninPage)``;

export const AuthForm = styled.form`
  width: 350px;
`;

export const InputField = styled.div`
  display: flex;
  position: relative;
  height: 56px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const InputWithPlaceholder = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const Placeholder = styled.div`
  z-index: 1;
  width: auto;
  position: absolute;
  left: 8px;
  bottom: 17px;
  padding: 0 8px;
  pointer-events: none;
  color: var(--text);
  transition:
    transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Input = styled.input`
  width: 100%;
  z-index: 1;
  border: none;
  border-radius: 4px;
  height: 28px;
  margin: 1px 1px 0 1px;
  padding: 13px 15px;
  outline: none;

  &:focus ~ ${Placeholder} {
    transform: scale(0.75) translateY(-39px);
    color: ${(props) => (!props.isValid ? "var(--text-accent-red-light)" : "")};
  }

  & ~ ${Placeholder} {
    transform: ${(props) =>
      props.value ? "scale(0.75) translateY(-39px)" : "none"};
    color: ${(props) =>
      props.value && !props.isValid ? "var(--text-accent-red-light)" : ""};
  }
`;

const optionalBorderStyles = ({ isValid }) => {
  const style = {};
  if (!isValid) {
    style.borderColor = "var(--text-accent-red-light)";
  }
  return css(style);
};

export const InputBorder = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;

  ${optionalBorderStyles};
`;

export const SubmitButton = styled(Button)`
  height: 48px;
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-accent-red-light);
`;

export const ErrorMessage = styled.span`
  margin-left: 6px;
  font-size: 12px;
`;
