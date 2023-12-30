export const formatDate = (timestamp) => {
  return timestamp
    .substring(0, 10)
    .concat(" (", timestamp.substring(11, 19), ")");
};
