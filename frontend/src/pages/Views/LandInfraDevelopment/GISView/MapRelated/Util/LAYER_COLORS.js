// Layer Styles
const LAYER_COLORS = {
  // Park
  PARK: { color: "rgba(0, 0, 0, 0.0)", border: "black" },

  // Block
  BLOCK: { color: "#beb297", border: "rgba(0, 0, 0, 0.5)" },

  // Shed
  SHED: { color: "#987db7", border: "black" },

  // Building
  BUILDING: { color: "#E9DFC9", border: "rgba(255, 255, 255, 0.5)" },

  // Road
  ROAD: { color: "grey", border: "rgba(0, 0, 0, 0.5)" },

  // Parcel
  PARCEL: {
    OCCUPIED: { color: "green", border: "rgba(0, 0, 0, 0.5)" },
    VACANT: { color: "orange", border: "rgba(0, 0, 0, 0.5)" },
    ON_HOLD: { color: "red", border: "rgba(0, 0, 0, 0.5)" },
  },

  // Green Area
  GREEN_AREA: { color: "#6aa84f", border: "#274e13" },

  //Green Forest

  GREEN_AREA_FOREST: { color: "#274e13", border: "#00ff00" },

  // New Plot
  NEW_PLOT: { color: "black", border: "rgba(0, 0, 0, 0.5)" },


  // Water
  WATER: { color: "lightblue", border: "white" },

  // Power
  POWER: { color: "red", border: "black" },

  // Communication
  COMMUNICATION: { color: "blue", border: "black" },

  // Waste
  WASTE: { color: "brown", border: "black" },

  // Unapproved Import
  STORAGE: { color: "rgb(0,0,0, 0.5)", border: "black" },

  //PLAN
  PLAN: { color: "coral", border: "#888c8f" },

  // Unapproved Import
  UNAPPROVED_IMPORT: { color: "red", border: "black" },

  // Default
  DEFAULT: { color: "grey", border: "#888c8f" },
};

export default LAYER_COLORS;
