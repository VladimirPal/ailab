const theme = {
  name: "bubbleWave",
  label: "🌊 Bubble Wave",
  type: "system",
  font: "Permanent Marker",
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
      type: "animatedCanvas",
      animation: "BubbleWave",
    },
  },
  dark: {
    color: {
      text: "#82fff7",
      borderHour: "#82fff7",
      clockHandBody: "#579dff",
      intervalHandBody: "#579dff",
      clockHandTail: "#e774bb",
    },
    background: {
      type: "animatedCanvas",
      animation: "BubbleWave",
    },
  },
  size: {
    borderHour: 4,
    clockHand: 4,
  },
};

export default theme;
