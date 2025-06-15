import defaultFlag from "../../../../../../assets/image/flags/Ethiopia.svg";
import { Style, Text, Fill, Stroke, Icon } from "ol/style";
import StringToColor from "../../../../../../utils/StringToColor";

// Mapping countries to their flag image URLs
const countryFlags = {
  "u.s.a.": "../../../../../../assets/image/flags/Usa.svg",
  india: "../../../../../../assets/image/flags/India.svg",
  china: "../../../../../../assets/image/flags/China.svg",
  bangladesh: "../../../../../../assets/image/flags/Bangladesh.svg",
  ethiopia: "../../../../../../assets/image/flags/Ethiopia.svg",
  // Add more countries and their corresponding flag URLs
};
const isFeatureWide = (feature) => {
  let isWide = false;
  try {
    const geometry = feature.getGeometry();
    const extent = geometry.getExtent();
    const width = extent[2] - extent[0];
    const height = extent[3] - extent[1];
    isWide = width > height;
    return isWide;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getParcelColorByCountry = (feature, countries = null) => {
  try {
    const upin = feature?.get("upin");
    const country = feature?.get("nationality_origin")?.toLowerCase();
    let fillColor = "grey"; // Default color
    if (countries) {
      const countryIndex = countries?.findIndex((c) => c.toLowerCase() === country);
      if (countryIndex !== -1) {
        fillColor = countries[countryIndex] && StringToColor(countries[countryIndex]); // Unique color for each country
      }
    }
    var flagUrl = countryFlags[country] || defaultFlag; // Default flag if country not found
    //console.log(flagUrl);
    return new Style({
      fill: new Fill({ color: fillColor }),
      stroke: new Stroke({ color: "#888c8f", width: 1 }),
      image: new Icon({
        src: flagUrl,
        scale: 1, // Adjust the scale of the flag image to fit the parcel
      }),
      text: getStyledText(
        feature,
        country === "n/a"
          ? upin
          : country
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
        "white",
      ),
    });
  } catch (error) {
    console.log(error);
    return getDefaultParcelStyle(feature);
  }
};
const getParcelColorBySector = (feature, sectors) => {
  try {
    const functionValue = feature.get("current_function") ? feature?.get("current_function")?.toLowerCase() : "N/A";
    //    console.log(functionValue)
    const upin = feature?.get("upin")||"N/A";
    let fillColor = "white"; // Default color
    if (sectors) {
      const sectorIndex = sectors.findIndex((s) => s?.toLowerCase() === functionValue);
      if (sectorIndex !== -1) {
        fillColor = sectors[sectorIndex] ? StringToColor(sectors[sectorIndex]) : "grey"; // Unique color for each sector
      }
    }

    return new Style({
      fill: new Fill({ color: fillColor, opacity: 0.5 }),
      stroke: new Stroke({ color: "#888c8f", width: 1 }),
      text: getStyledText(
        feature,functionValue === "N/A"
        ? upin
        : 
        functionValue
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        "black",
      ),
    });
  } catch (error) {
    console.log(error);
    return getDefaultParcelStyle(feature);
  }
};
//GET FEATURE BY occupancy
const getParcelColorByOccupancy = (feature, showText = true, showCompanyName = false) => {
  try {
    const occupancyStatus = feature.get("occupancy_status").toLowerCase();
    const upin = feature.get("upin");
    const tenantCompany = feature.get("tenant_company");
    const textToShow =
      (upin ? upin : "") +
      (showCompanyName
        ? occupancyStatus === "vacant"
          ? ""
          : occupancyStatus === "reserved"
          ? "\nReserved"
          : occupancyStatus === "started process"
          ? "\nOngoing"
          : tenantCompany
          ? "\n" + (tenantCompany.length <= 18 ? tenantCompany : tenantCompany.substring(0, 15) + "...")
          : ""
        : "");
    // Define colors for different occupancy statuses
    let fillColor = "grey"; // Default color
    let textColor = "yellow"; // Default text color

    switch (occupancyStatus) {
      case "vacant":
        fillColor = "orange";
        textColor = "white";
        break;
      case "occupied":
        fillColor = "green";
        break;
      case "started process":
        fillColor = "yellow";
        break;
      case "reserved":
        fillColor = "red";
        break;
      default:
        fillColor = "grey"; // Default color for unknown occupancy
        break;
    }
    const stl = new Style({
      fill: new Fill({ color: fillColor }),
      stroke: new Stroke({ color: "#888c8f", width: 1 }),
      text: showText ? getStyledText(feature, textToShow, textColor) : null,
    });
    return stl;
  } catch (err) {
    console.log(err);
    return getDefaultParcelStyle(feature);
  }
};
//UTILITIES

const getStyledText = (feature, textToDisplay, textColor = "white") => {
  const isWide = isFeatureWide(feature);
  try {
    const fontSize = isWide ? 12 : 8; // Adjust font size based on width
    const padding = isWide ? 1 : 0.5; // Adjust padding based on width

    return new Text({
      font: `bold ${fontSize}px Calibri,sans-serif`,
      placement: "point",
      fill: new Fill({ color: textColor }),
      text: textToDisplay,
      rotation: isWide ? 0 : Math.PI / 2, // Rotate 90 degrees for tall features
      textAlign: "center",
      offsetX: padding, // Add offset to create padding
      offsetY: padding, // Add offset to create padding
    });
  } catch (error) {
    console.log(error);
    return getDefaultParcelStyle(feature);
  }
};
const getDefaultParcelStyle = (feature) => {
  try {
    const upin = feature?.get("upin");
    return new Style({
      fill: new Fill({ color: "grey" }),
      stroke: new Stroke({ color: "#888c8f", width: 1 }),
      text: getStyledText(feature, upin),
    });
  } catch (error) {
    console.log(error);
  }
};
export { getParcelColorBySector, getParcelColorByOccupancy, getParcelColorByCountry };
