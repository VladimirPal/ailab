const theme = {
  name: "dracula",
  label: "🧛 Dracula",
  light: {
    color: {
      text: "#282a36",
      borderHour: "#bd93f9",
      clockHandBody: "#ff5555",
      intervalHandBody: "#50fa7b",
      clockHandTail: "#bd93f9",
    },
    background: {
      type: "color",
      color: "#f8f8f2",
    },
  },
  dark: {
    color: {
      text: "#f8f8f2",
      borderHour: "#44475a",
      clockHandBody: "#bd93f9",
      intervalHandBody: "#50fa7b",
      clockHandTail: "#ff79c6",
    },
    background: {
      type: "color",
      color: "#282a36",
    },
  },
  size: {
    borderHour: 1,
    clockHand: 2,
  },
  type: "system",
};

export default theme;
