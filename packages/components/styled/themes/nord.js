const theme = {
  name: "nord",
  label: "❄️ Nord",
  light: {
    color: {
      text: "#2e3440",
      borderHour: "#5e81ac",
      clockHandBody: "#bf616a",
      intervalHandBody: "#bf616a",
      clockHandTail: "#88c0d0",
    },
    background: {
      type: "color",
      color: "#eceff4",
    },
  },
  dark: {
    color: {
      text: "#d8dee9",
      borderHour: "#4c566a",
      clockHandBody: "#5e81ac",
      intervalHandBody: "#5e81ac",
      clockHandTail: "#bf616a",
    },
    background: {
      type: "color",
      color: "#2e3440",
    },
  },
  size: {
    borderHour: 1,
    clockHand: 2,
  },
  type: "system",
};

export default theme;
