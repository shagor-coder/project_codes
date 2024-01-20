export const format_date_time = (start_time_str) => {
  const start_time_obj = new Date(start_time_str);
  const only_start_date = start_time_obj.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    year: "numeric",
  });
  const only_start_time = start_time_obj.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return { only_start_date, only_start_time };
};
