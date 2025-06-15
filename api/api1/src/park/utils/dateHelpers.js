function convertToDate(input) {
  let date;

  if (typeof input === "number") {
    const defaultStartDate = new Date(1900, 0, 1);
    date = new Date(defaultStartDate.getTime() + (input - 2) * 86400000);
  } else if (typeof input === "string") {
    date = new Date(input);
  }

  if (isNaN(date)) {
    //console.log("Invalid date, using default date: 1/1/1900");
    return new Date(1900, 0, 1);
  }

  return date;
}
const getValidDatesBySanitizingArray = (dates) => {
  return dates.map((date) => {
    return sanitizeDate(date);
  });
};
const sanitizeDate=(date)=>{
  if (date && !isNaN(Date.parse(date))) {
    return new Date(date).toISOString().slice(0, 10); // Format as YYYY-MM-DD
  } else {
    return new Date(); // Or handle invalid dates as needed
  }
}
export default { convertToDate,getValidDatesBySanitizingArray,sanitizeDate };
