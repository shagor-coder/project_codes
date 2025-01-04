export const formatReadableTime = (isoDateString) => {
  const date = new Date(isoDateString);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${date.toDateString()} ${hours}:${formattedMinutes} ${ampm}`;
};
