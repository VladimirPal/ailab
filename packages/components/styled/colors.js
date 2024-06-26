import { css } from "@emotion/react";

const colorsCss = (theme) => css`
  :root {
    --surface-light: #ffffff;
    --surface-dark: #1d2125;
    --surface: var(--surface-${theme.mode});

    --surface-sunken-light: #f7f8f9;
    --surface-sunken-dark: #161a1d;
    --surface-sunken: var(--surface-sunken-${theme.mode});

    --surface-overlay-light: #ffffff;
    --surface-overlay-dark: #282e33;
    --surface-overlay: var(--surface-overlay-${theme.mode});

    --shadow-overlay-light: 0px 8px 12px #091e4226, 0px 0px 1px #091e424f;
    --shadow-overlay-dark: inset 0px 0px 0px 1px #bcd6f01f,
      0px 8px 12px #0304045c, 0px 0px 1px #03040480;
    --shadow-overlay: var(--shadow-overlay-${theme.mode});

    --link-light: #0c66e4;
    --link-dark: #579dff;
    --link: var(--link-${theme.mode});

    --text: ${theme.color.text};
    --text-subtle-light: #44546f;
    --text-subtle-dark: #9fadbc;
    --text-subtle: var(--text-subtle-${theme.mode});

    --text-inverse-light: #ffffff;
    --text-inverse-dark: #1d2125;
    --text-inverse: var(--text-inverse-${theme.mode});

    --text-accent-lime-light: #4c6b1f;
    --text-accent-lime-dark: #b3df72;
    --text-accent-lime: var(--text-accent-lime-${theme.mode});

    --text-accent-lime-bolder-light: #37471f;
    --text-accent-lime-bolder-dark: #d3f1a7;
    --text-accent-lime-bolder: var(--text-accent-lime-bolder-${theme.mode});

    --text-accent-red-light: #ae2a19;
    --text-accent-red-dark: #ff9c8f;
    --text-accent-red: var(--text-accent-red-${theme.mode});

    --text-accent-red-bolder-light: #601e16;
    --text-accent-red-bolder-dark: #ffd2cc;
    --text-accent-red-bolder: var(--text-accent-red-bolder-${theme.mode});

    --text-accent-orange-light: #974f0c;
    --text-accent-orange-dark: #fec57b;
    --text-accent-orange: var(--text-accent-orange-${theme.mode});

    --text-accent-orange-bolder-light: #5f3811;
    --text-accent-orange-bolder-dark: #ffe2bd;
    --text-accent-orange-bolder: var(--text-accent-orange-bolder-${theme.mode});

    --text-accent-yellow-light: #7f5f01;
    --text-accent-yellow-dark: #f5cd47;
    --text-accent-yellow: var(--text-accent-yellow-${theme.mode});

    --text-accent-yellow-bolder-light: #533f04;
    --text-accent-yellow-bolder-dark: #f8e6a0;
    --text-accent-yellow-bolder: var(--text-accent-yellow-bolder-${theme.mode});

    --text-accent-green-light: #216e4e;
    --text-accent-green-dark: #7ee2b8;
    --text-accent-green: var(--text-accent-green-${theme.mode});

    --text-accent-green-bolder-light: #164b35;
    --text-accent-green-bolder-dark: #baf3db;
    --text-accent-green-bolder: var(--text-accent-green-bolder-${theme.mode});

    --text-accent-teal-light: #206b74;
    --text-accent-teal-dark: #8bdbe5;
    --text-accent-teal: var(--text-accent-teal-${theme.mode});

    --text-accent-teal-bolder-light: #1d474c;
    --text-accent-teal-bolder-dark: #c1f0f5;
    --text-accent-teal-bolder: var(--text-accent-teal-bolder-${theme.mode});

    --text-accent-blue-light: #0055cc;
    --text-accent-blue-dark: #85b8ff;
    --text-accent-blue: var(--text-accent-blue-${theme.mode});

    --text-accent-blue-bolder-light: #09326c;
    --text-accent-blue-bolder-dark: #cce0ff;
    --text-accent-blue-bolder: var(--text-accent-blue-bolder-${theme.mode});

    --text-accent-purple-light: #5e4db2;
    --text-accent-purple-dark: #b8acf6;
    --text-accent-purple: var(--text-accent-purple-${theme.mode});

    --text-accent-purple-bolder-light: #352c63;
    --text-accent-purple-bolder-dark: #dfd8fd;
    --text-accent-purple-bolder: var(--text-accent-purple-bolder-${theme.mode});

    --text-accent-magenta-light: #943d73;
    --text-accent-magenta-dark: #f797d2;
    --text-accent-magenta: var(--text-accent-magenta-${theme.mode});

    --text-accent-magenta-bolder-light: #50253f;
    --text-accent-magenta-bolder-dark: #fdd0ec;
    --text-accent-magenta-bolder: var(
      --text-accent-magenta-bolder-${theme.mode}
    );

    --text-accent-gray-light: #44546f;
    --text-accent-gray-dark: #9fadbc;
    --text-accent-gray: var(--text-accent-gray-${theme.mode});

    --text-accent-gray-bolder-light: #091e42;
    --text-accent-gray-bolder-dark: #dee4ea;
    --text-accent-gray-bolder: var(--text-accent-gray-bolder-${theme.mode});

    --background-surface-light: #f1f2f4;
    --background-surface-dark: #323940;
    --background-surface: var(--background-surface-${theme.mode});

    --background-accent-lime-subtlest-light: #eefbda;
    --background-accent-lime-subtlest-dark: #2a3818;
    --background-accent-lime-subtlest: var(
      --background-accent-lime-subtlest-${theme.mode}
    );

    --background-accent-lime-subtler-light: #d3f1a7;
    --background-accent-lime-subtler-dark: #37471f;
    --background-accent-lime-subtler: var(
      --background-accent-lime-subtler-${theme.mode}
    );

    --background-accent-lime-subtle-light: #94c748;
    --background-accent-lime-subtle-dark: #4c6b1f;
    --background-accent-lime-subtle: var(
      --background-accent-lime-subtle-${theme.mode}
    );

    --background-accent-lime-bolder-light: #5b7f24;
    --background-accent-lime-bolder-dark: #94c748;
    --background-accent-lime-bolder: var(
      --background-accent-lime-bolder-${theme.mode}
    );

    --background-accent-red-subtlest-light: #ffedeb;
    --background-accent-red-subtlest-dark: #4f1c16;
    --background-accent-red-subtlest: var(
      --background-accent-red-subtlest-${theme.mode}
    );

    --background-accent-red-subtler-light: #ffd2cc;
    --background-accent-red-subtler-dark: #601e16;
    --background-accent-red-subtler: var(
      --background-accent-red-subtler-${theme.mode}
    );

    --background-accent-red-subtle-light: #f87462;
    --background-accent-red-subtle-dark: #ae2a19;
    --background-accent-red-subtle: var(
      --background-accent-red-subtle-${theme.mode}
    );

    --background-accent-red-bolder-light: #ca3521;
    --background-accent-red-bolder-dark: #f87462;
    --background-accent-red-bolder: var(
      --background-accent-red-bolder-${theme.mode}
    );

    --background-accent-orange-subtlest-light: #fff4e5;
    --background-accent-orange-subtlest-dark: #4a2b0f;
    --background-accent-orange-subtlest: var(
      --background-accent-orange-subtlest-${theme.mode}
    );

    --background-accent-orange-subtler-light: #ffe2bd;
    --background-accent-orange-subtler-dark: #5f3811;
    --background-accent-orange-subtler: var(
      --background-accent-orange-subtler-${theme.mode}
    );

    --background-accent-orange-subtle-light: #faa53d;
    --background-accent-orange-subtle-dark: #974f0c;
    --background-accent-orange-subtle: var(
      --background-accent-orange-subtle-${theme.mode}
    );

    --background-accent-orange-bolder-light: #b65c02;
    --background-accent-orange-bolder-dark: #faa53d;
    --background-accent-orange-bolder: var(
      --background-accent-orange-bolder-${theme.mode}
    );

    --background-accent-yellow-subtlest-dark: #3f3102;
    --background-accent-yellow-subtlest-light: #fff7d6;
    --background-accent-yellow-subtlest: var(
      --background-accent-yellow-subtlest-${theme.mode}
    );

    --background-accent-yellow-subtler-light: #f8e6a0;
    --background-accent-yellow-subtler-dark: #533f04;
    --background-accent-yellow-subtler: var(
      --background-accent-yellow-subtler-${theme.mode}
    );

    --background-accent-yellow-subtle-light: #e2b203;
    --background-accent-yellow-subtle-dark: #7f5f01;
    --background-accent-yellow-subtle: var(
      --background-accent-yellow-subtle-${theme.mode}
    );

    --background-accent-yellow-bolder-light: #946f00;
    --background-accent-yellow-bolder-dark: #e2b203;
    --background-accent-yellow-bolder: var(
      --background-accent-yellow-bolder-${theme.mode}
    );

    --background-accent-green-subtlest-light: #dffcf0;
    --background-accent-green-subtlest-dark: #143c2b;
    --background-accent-green-subtlest: var(
      --background-accent-green-subtlest-${theme.mode}
    );

    --background-accent-green-subtler-light: #baf3db;
    --background-accent-green-subtler-dark: #164b35;
    --background-accent-green-subtler: var(
      --background-accent-green-subtler-${theme.mode}
    );

    --background-accent-green-subtle-light: #4bce97;
    --background-accent-green-subtle-dark: #216e4e;
    --background-accent-green-subtle: var(
      --background-accent-green-subtle-${theme.mode}
    );

    --background-accent-green-bolder-light: #1f845a;
    --background-accent-green-bolder-dark: #4bce97;
    --background-accent-green-bolder: var(
      --background-accent-green-bolder-${theme.mode}
    );

    --background-accent-teal-subtlest-light: #e3fafc;
    --background-accent-teal-subtlest-dark: #15373b;
    --background-accent-teal-subtlest: var(
      --background-accent-teal-subtlest-${theme.mode}
    );

    --background-accent-teal-subtler-light: #c1f0f5;
    --background-accent-teal-subtler-dark: #1d474c;
    --background-accent-teal-subtler: var(
      --background-accent-teal-subtler-${theme.mode}
    );

    --background-accent-teal-subtle-light: #60c6d2;
    --background-accent-teal-subtle-dark: #206b74;
    --background-accent-teal-subtle: var(
      --background-accent-teal-subtle-${theme.mode}
    );

    --background-accent-teal-bolder-light: #1d7f8c;
    --background-accent-teal-bolder-dark: #60c6d2;
    --background-accent-teal-bolder: var(
      --background-accent-teal-bolder-${theme.mode}
    );

    --background-accent-blue-subtlest-light: #e9f2ff;
    --background-accent-blue-subtlest-dark: #092957;
    --background-accent-blue-subtlest: var(
      --background-accent-blue-subtlest-${theme.mode}
    );

    --background-accent-blue-subtler-light: #cce0ff;
    --background-accent-blue-subtler-dark: #09326c;
    --background-accent-blue-subtler: var(
      --background-accent-blue-subtler-${theme.mode}
    );

    --background-accent-blue-subtle-light: #579dff;
    --background-accent-blue-subtle-dark: #0055cc;
    --background-accent-blue-subtle: var(
      --background-accent-blue-subtle-${theme.mode}
    );

    --background-accent-blue-subtle-light: #85b8ff;
    --background-accent-blue-subtle-hovered-dark: #09326c;
    --background-accent-blue-subtle-hovered: var(
      --background-accent-blue-subtle-${theme.mode}
    );

    --background-accent-blue-bolder-light: #0c66e4;
    --background-accent-blue-bolder-dark: #579dff;
    --background-accent-blue-bolder: var(
      --background-accent-blue-bolder-${theme.mode}
    );

    --background-accent-purple-subtlest-light: #f3f0ff;
    --background-accent-purple-subtlest-dark: #2b2451;
    --background-accent-purple-subtlest: var(
      --background-accent-purple-subtlest-${theme.mode}
    );

    --background-accent-purple-subtler-light: #dfd8fd;
    --background-accent-purple-subtler-dark: #352c63;
    --background-accent-purple-subtler: var(
      --background-accent-purple-subtler-${theme.mode}
    );

    --background-accent-purple-subtle-light: #9f8fef;
    --background-accent-purple-subtle-dark: #5e4db2;
    --background-accent-purple-subtle: var(
      --background-accent-purple-subtle-${theme.mode}
    );

    --background-accent-purple-bolder-light: #6e5dc6;
    --background-accent-purple-bolder-dark: #9f8fef;
    --background-accent-purple-bolder: var(
      --background-accent-purple-bolder-${theme.mode}
    );

    --background-accent-magenta-subtlest-light: #ffecf8;
    --background-accent-magenta-subtlest-dark: #421f34;
    --background-accent-magenta-subtlest: var(
      --background-accent-magenta-subtlest-${theme.mode}
    );

    --background-accent-magenta-subtler-light: #fdd0ec;
    --background-accent-magenta-subtler-dark: #50253f;
    --background-accent-magenta-subtler: var(
      --background-accent-magenta-subtler-${theme.mode}
    );

    --background-accent-magenta-subtle-light: #e774bb;
    --background-accent-magenta-subtle-dark: #943d73;
    --background-accent-magenta-subtle: var(
      --background-accent-magenta-subtle-${theme.mode}
    );

    --background-accent-magenta-bolder-light: #ae4787;
    --background-accent-magenta-bolder-dark: #e774bb;
    --background-accent-magenta-bolder: var(
      --background-accent-magenta-bolder-${theme.mode}
    );

    --background-accent-gray-subtlest-light: #f1f2f4;
    --background-accent-gray-subtlest-dark: #2c333a;
    --background-accent-gray-subtlest: var(
      --background-accent-gray-subtlest-${theme.mode}
    );

    --background-accent-gray-subtler-light: #dcdfe4;
    --background-accent-gray-subtler-dark: #454f59;
    --background-accent-gray-subtler: var(
      --background-accent-gray-subtler-${theme.mode}
    );

    --background-accent-gray-subtle-light: #8590a2;
    --background-accent-gray-subtle-dark: #596773;
    --background-accent-gray-subtle: var(
      --background-accent-gray-subtle-${theme.mode}
    );

    --background-accent-gray-subtle-light: #8590a2;
    --background-accent-gray-subtle-dark: #596773;
    --background-accent-gray-subtle: var(
      --background-accent-gray-subtle-${theme.mode}
    );

    --background-accent-gray-subtled-light: #b2bdce;
    --background-accent-gray-subtled-dark: #596773;
    --background-accent-gray-subtled: var(
      --background-accent-gray-subtled-${theme.mode}
    );

    --background-accent-gray-bolder-light: #626f86;
    --background-accent-gray-bolder-dark: #8c9bab;
    --background-accent-gray-bolder: var(
      --background-accent-gray-bolder-${theme.mode}
    );

    --background-neutral-light: #091e420f;
    --background-neutral-dark: #a1bdd914;
    --background-neutral: var(--background-neutral-${theme.mode});

    --background-neutral-hovered-light: #091e4224;
    --background-neutral-hovered-dark: #a6c5e229;
    --background-neutral-hovered: var(
      --background-neutral-hovered-${theme.mode}
    );

    --background-brand-bold-light: #0c66e4;
    --background-brand-bold-dark: #579dff;
    --background-brand-bold: var(--background-brand-bold-${theme.mode});

    --background-brand-bold-hovered-light: #0055cc;
    --background-brand-bold-hovered-dark: #85b8ff;
    --background-brand-bold-hovered: var(
      --background-brand-bold-hovered-${theme.mode}
    );
    --background-danger-light: #ffeceb;
    --background-danger-dark: #42221f;
    --background-danger: var(--background-danger-${theme.mode});

    --background-danger-bold-light: #c9372c;
    --background-danger-bold-dark: #f87168;
    --background-danger-bold: var(--background-danger-bold-${theme.mode});

    --background-danger-bold-hovered-light: #ae2e24;
    --background-danger-bold-hovered-dark: #fd9891;
    --background-danger-bold-hovered: var(
      --background-danger-bold-hovered-${theme.mode}
    );

    --background-selected-light: #e9f2ff;
    --background-selected-dark: #1c2b41;
    --background-selected: var(--background-selected-${theme.mode});

    --background-selected-bold-light: #0c66e4;
    --background-selected-bold-dark: #579dff;
    --background-selected-bold: var(--background-selected-bold-${theme.mode});

    --background-selected-hovered-light: #cce0ff;
    --background-selected-hovered-dark: #09326c;
    --background-selected-hovered: var(
      --background-selected-hovered-${theme.mode}
    );

    --background-selected-pressed-light: #85b8ff;
    --background-selected-pressed-dark: #0055cc;
    --background-selected-pressed: var(
      --background-selected-pressed-${theme.mode}
    );

    --background-input-light: #ffffff;
    --background-input-dark: #22272b;
    --background-input: var(--background-input-${theme.mode});

    --background-disabled-light: #091e4208;
    --background-disabled-dark: #bcd6f00a;
    --background-disabled: var(--background-disabled-${theme.mode});

    --dynamic-background-transparent-light: hsla(218, 20.4%, 39.4%, 0.9);
    --dynamic-background-transparent-dark: hsla(206, 13.7%, 10%, 0.9);
    --dynamic-background: var(--dynamic-background-transparent-${theme.mode});

    --border-light: #091e4224;
    --border-dark: #a6c5e229;
    --border: var(--border-${theme.mode});

    --border-focused-light: #388bff;
    --border-focused-dark: #85b8ff;
    --border-focused: var(--border-focused-${theme.mode});

    --border-input-light: #091e4224;
    --border-input-dark: #a6c5e229;
    --border-input: var(--border-input-${theme.mode});

    --border-danger-light: #f15b50;
    --border-danger-dark: #f15b50;
    --border-danger: var(--border-danger-${theme.mode});

    --dynamic-button: transparent;

    --dynamic-text-light: #172b4d;
    --dynamic-text-dark: #ffffff;
    --dynamic-text: var(--dynamic-text-${theme.mode});

    --dynamic-button-hovered-light: #a6c5e229;
    --dynamic-button-hovered-dark: #a6c5e229;
    --dynamic-button-hovered: var(--dynamic-button-hovered-${theme.mode});

    --dynamic-button-highlighted-light: #dfe1e6;
    --dynamic-button-highlighted-dark: #dfe1e6;
    --dynamic-button-highlighted: var(
      --dynamic-button-highlighted-${theme.mode}
    );

    --dynamic-button-highlighted-text-light: #172b4d;
    --dynamic-button-highlighted-text-dark: #172b4d;
    --dynamic-button-highlighted-text: var(
      --dynamic-button-highlighted-text-${theme.mode}
    );
  }
`;

export default colorsCss;
