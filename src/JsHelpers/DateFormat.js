 export function formatDate(isoString) {
  const date = new Date(isoString);

  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return { formattedDate, formattedTime };
}

export function formatDateString(isoString) {
  const date = new Date(isoString);

  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} ${formattedTime}`;
}