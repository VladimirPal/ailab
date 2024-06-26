import React from "react";

import Button from "./Button";

import CrossIcon from "../Icons/CrossIcon";

import * as S from "./styled";

const buttonAppearance = ["default", "primary", "success", "danger", "link"];
const Icons = {
  Cross: CrossIcon,
};

export const ButtonStory = (args) => {
  return (
    <S.ButtonsStory>
      {buttonAppearance.map((appearance) => {
        return (
          <S.ButtonsStoryRow key={appearance}>
            <S.ButtonStory>
              <Button {...args} appearance={appearance} />
              <div>{appearance}</div>
            </S.ButtonStory>
            <S.ButtonStory>
              <Button {...args} appearance={appearance} isLoading />
            </S.ButtonStory>
            <S.ButtonStory>
              <Button {...args} appearance={appearance} isDisabled />
            </S.ButtonStory>
          </S.ButtonsStoryRow>
        );
      })}
    </S.ButtonsStory>
  );
};

ButtonStory.args = {
  isDisabled: false,
  isSelected: false,
  children: "Text",
  className: "",
  type: "button",
  spacing: "default",
};
ButtonStory.argTypes = {
  isDisabled: { table: { disable: true } },
  isSelected: { control: { type: "boolean" } },
  fitContent: { control: { type: "boolean" } },
  spacing: {
    options: ["default", "compact", "none"],
    control: { type: "select" },
  },
  appearance: { table: { disable: true } },
  className: { table: { disable: true } },
  type: { table: { disable: true } },
  onClick: { table: { disable: true }, action: "clicked" },
  children: { table: { disable: true } },
};
ButtonStory.storyName = "Text Buttons";

export const IconButtonStory = (args) => {
  return (
    <S.ButtonsStory>
      {Object.keys(Icons).map((iconName) => {
        const Icon = Icons[iconName];
        return (
          <S.ButtonsStoryRow key={iconName}>
            <S.ButtonStory>
              <Button {...args} withIcon spacing="none">
                <Icon size="middle" shouldPadding />
              </Button>
            </S.ButtonStory>
            <S.ButtonStory>
              <Button {...args} withIcon>
                <Icon size="middle" shouldPadding />
                {iconName}
              </Button>
            </S.ButtonStory>
            <S.ButtonStory>
              <Button {...args} withIcon isDisabled>
                <Icon size="middle" shouldPadding />
                isDisabled
              </Button>
            </S.ButtonStory>
          </S.ButtonsStoryRow>
        );
      })}
    </S.ButtonsStory>
  );
};
IconButtonStory.args = {
  isDisabled: false,
  isSelected: false,
  fitContent: true,
  className: "",
  type: "button",
  appearance: "default",
  spacing: "default",
};
IconButtonStory.argTypes = {
  ...ButtonStory.argTypes,
};
IconButtonStory.storyName = "Icon Buttons";

export default {
  title: "Buttons",
  component: Button,
};
