export const formatReadableDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = hours < 12 ? "AM" : "PM";
  const formattedHours = hours % 12 || 12;
  return `${month} ${day}, ${year} at ${formattedHours}:${minutes} ${amPm}`;
};
