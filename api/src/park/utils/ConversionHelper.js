const CleanAndConvertArea = (areaStr) => {
  if (!areaStr || areaStr === "") return 0;
  try {
    areaStr = areaStr.replace(/,/g, "") || 0; // Remove commas
    areaStr = areaStr.replace(/m2/g, ""); //remove m2
    const area = parseFloat(areaStr.replace(/[^\d.-]/g, "")) || 0; // Extract number, allow decimal point and minus sign

    if (
      areaStr.toLowerCase().includes("h") ||
      areaStr.toLowerCase().includes("ha")
    ) {
      return area * 10000; // Convert hectares to sq meters
    } else {
      return area; // Assume already in sq meters
    }
  } catch (error) {
    //console.log(error);
    return 0;
  }
};
function convertTextToNumber(value) {
  if (isNaN(value)) {
    return 0;
  } else {
    return parseFloat(value);
  }
}
export { CleanAndConvertArea,convertTextToNumber };
