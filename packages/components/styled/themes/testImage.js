/*
const image =
  "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1440/ff87be7dd5f04be5ea1975a2ed69feaa/photo-1714547827859-8117efb1e191.webp";
*/
const image =
  "https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDMzOTR8MHwxfGNvbGxlY3Rpb258MXw5WGh1ZW5QclpHd3x8fHx8Mnx8MTcxNTc0ODM5Nnw&ixlib=rb-4.0.3&q=85";

const theme = {
  light: {
    color: {
      text: "#172b4d",
      borderHour: "#091e4224",
      clockHandBody: "#0c66e4",
      clockHandTail: "#ae4787",
    },
    background: {
      type: "image",
      image,
    },
  },
  dark: {
    color: {
      text: "#b6c2cf",
      borderHour: "#a6c5e229",
      clockHandBody: "#579dff",
      clockHandTail: "#e774bb",
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
