const theme = {
  name: "solarized",
  label: "🌞 Solarized",
  light: {
    color: {
      text: "#073642",
      borderHour: "#268bd2",
      clockHandBody: "#b58900",
      intervalHandBody: "#b58900",
      clockHandTail: "#2aa198",
    },
    background: {
      type: "color",
      color: "#fdf6e3",
    },
  },
  dark: {
    color: {
      text: "#fdf6e3",
      borderHour: "#839496",
      clockHandBody: "#268bd2",
      intervalHandBody: "#268bd2",
      clockHandTail: "#b58900",
    },
    background: {
      type: "color",
      color: "#002b36",
    },
  },
  size: {
    borderHour: 1,
    clockHand: 2,
  },
  type: "system",
};

export default theme;
