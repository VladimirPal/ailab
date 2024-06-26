import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

import { gradientsMap } from "@time2world/components/GradientPicker/gradients";

export const backgroundStyles = ({ theme }) => {
  if (theme.background.type === "gradient") {
    return `
      background-image: url(${gradientsMap[theme.background.gradientName]});
      ${theme.mode === "dark" ? `background-blend-mode: darken;` : ""}
      ${theme.mode === "dark" ? `background-color: #0000004d !important;` : ""}
    `;
  }

  if (theme.background.type === "color") {
    return `
      ${theme.mode === "dark" ? `background-blend-mode: darken;` : ""}
      background-color: ${theme.background.color};
    `;
  }

  if (theme.background.type === "image") {
    return `
      ${theme.mode === "dark" ? `background-blend-mode: darken;` : ""}
      ${theme.mode === "dark" ? `background-color: #0000004d !important;` : ""}
      background-image: url(${theme.background.image});
      background-size: cover;
      background-position: center;
    `;
  }

  if (theme.background.type === "animatedCanvas") {
    return `
      ${theme.mode === "dark" ? `background-blend-mode: darken;` : ""}
      ${theme.mode === "dark" ? `background-color: #0000004d !important;` : ""}
    `;
  }

  return "";
};

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  ${backgroundStyles}
`;

export const FullWidth = styled.div`
  display: flex;
  width: 100vw;
`;

export const Header = styled.header`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: stretch;
  margin: 0px auto;
  padding-left: max(3vw, 60px);
  padding-right: 3vw;
  color: var(--text);
  backdrop-filter: blur(4px);
  background: #0000003d;
  z-index: 800;
`;

export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 1.4em;

  &:hover {
    color: var(--background-brand-bold-hovered);
  }
`;

export const NavigationPanel = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavigationItem = styled.a`
  padding: 1.25rem 1rem 1rem;
  cursor: pointer;

  &:hover {
    color: var(--background-brand-bold-hovered);
  }
`;

export const GuestActionsList = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const ActionButton = styled(NavLink)`
  padding: 1.25rem 1rem 1rem;
  cursor: pointer;
  font-size: 1.2em;
  text-decoration: none;

  &:active,
  &:visited {
    color: var(--text);
    text-decoration: none;
  }

  &:hover {
    color: var(--background-brand-bold-hovered);
    text-decoration: none;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

export const TimespaceForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 8px;
  padding: 8px;
  background-color: var(--background-header);
  border-radius: 8px;
`;
