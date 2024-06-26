const theme = {
  name: "terminal",
  label: "✈️ Terminal",
  type: "system",
  font: "Workbench",
  uiScale: 1.4,
  light: {
    color: {
      text: "#172b4d",
      borderHour: "#091e4224",
      clockHandBody: "#0c66e4",
      intervalHandBody: "#0c66e4",
      clockHandTail: "#ae4787",
    },
    background: {
      type: "color",
      color: "#ffffff",
    },
  },
  dark: {
    color: {
      text: "#b6c2cf",
      borderHour: "#a6c5e229",
      clockHandBody: "#579dff",
      intervalHandBody: "#579dff",
      clockHandTail: "#e774bb",
    },
    background: {
      type: "color",
      color: "#212121",
    },
  },
  size: {
    borderHour: 4,
    clockHand: 4,
  },
};

export default theme;
