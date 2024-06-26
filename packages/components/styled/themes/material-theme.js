const theme = {
  name: "material-theme",
  label: "📐 Material Theme",
  light: {
    color: {
      text: "#263238",
      borderHour: "#80cbc4",
      clockHandBody: "#ffcc80",
      clockHandTail: "#e91e63",
    },
    background: {
      type: "color",
      color: "#ffffff",
    },
  },
  dark: {
    color: {
      text: "#b0bec5",
      borderHour: "#546e7a",
      clockHandBody: "#80cbc4",
      clockHandTail: "#ffcc80",
    },
    background: {
      type: "color",
      color: "#263238",
    },
  },
  size: {
    borderHour: 1,
    clockHand: 2,
  },
  type: "system",
};

export default theme;
