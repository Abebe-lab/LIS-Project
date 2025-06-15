export const SPATIAL_FEATURE_OPTIONS = {
    cadastral: [
      { value: "blocks", label: "Block" },
      { value: "parcels", label: "Parcel" },
      { value: "building", label: "Building" },
      { value: "sheds", label: "Shed" },
    ],
    infra_utility: [
      { value: "road", label: "Road" },
      { value: "communication", label: "Communication" },
      { value: "water", label: "Water" },
      { value: "power", label: "Electricity / Power" },
      { value: "storage", label: "Storage" },
      { value: "waste_disposal", label: "Waste Disposal" },
      { value: "other", label: "Other" },
    ],
    other: [
      { value: "zone", label: "Zone" },
      { value: "plan", label: "Plan" },
      { value: "green_area", label: "Green Area" },
      { value: "gcp", label: "Ground Control Points" },
    ],
  };
  
  export const FEATURE_CATEGORIES = [
    { value: "cadastral", label: "Cadastral" },
    { value: "infra_utility", label: "Infrastructure & Utility" },
    { value: "other", label: "Other" },
  ];