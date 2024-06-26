const theme = {
  name: "floatingLiquid",
  label: "🌡️ Floating Liquid",
  type: "system",
  light: {
    color: {
      text: "#172b4d",
      borderHour: "#091e4224",
      clockHandBody: "#0c66e4",
      intervalHandBody: "#0c66e4",
      clockHandTail: "#ae4787",
    },
    background: {
      type: "animatedCanvas",
      animation: "FloatingLiquid",
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
      type: "animatedCanvas",
      animation: "FloatingLiquid",
    },
  },
  size: {
    borderHour: 1,
    clockHand: 2,
  },
};

export default theme;
