const image =
  "https://images.unsplash.com/photo-1638306068960-1eebba9f887c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDMzOTR8MHwxfHNlYXJjaHwyfHxBcnJha2lzfGVufDB8fHx8MTcxNTkzODYwNHww&ixlib=rb-4.0.3&q=85%22}},%22light%22:{%22background%22:{%22type%22:%22image%22,%22image%22:%22https://images.unsplash.com/photo-1638306068960-1eebba9f887c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDMzOTR8MHwxfHNlYXJjaHwyfHxBcnJha2lzfGVufDB8fHx8MTcxNTkzODYwNHww&ixlib=rb-4.0.3&q=85";

const theme = {
  name: "solarized",
  label: "🌞 Solarized Arrakis",
  light: {
    color: {
      text: "#073642",
      borderHour: "#268bd2",
      clockHandBody: "#b58900",
      intervalHandBody: "#b58900",
      clockHandTail: "#2aa198",
    },
    background: {
      type: "image",
      image,
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
      type: "image",
      image,
    },
  },
  size: {
    borderHour: 1,
    clockHand: 2,
  },
  type: "system",
};

export default theme;
