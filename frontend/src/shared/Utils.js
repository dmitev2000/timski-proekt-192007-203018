export const formatDate = (timestamp) => {
  return timestamp
    .substring(0, 10)
    .concat(" (", timestamp.substring(11, 19), ")");
};

export const translateRole = (roleID) => {
  switch (roleID) {
    case 1:
      return "Admin";
    case 2:
      return "Customer";
    case 3:
      return "Seller";
    default:
      return "User";
  }
};

export const getColor = (inputColor) => {
  const color = inputColor.toLowerCase();
  switch (color) {
    case "sierra blue":
      return "#BFDAF7";
    case "alpine green":
      return "#3A6436";
    case "graphite":
      return "#41424C";
    default:
      return color;
  }
};
