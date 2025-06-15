const MpAndLBHeadReports = [
  { access: "ratioSummary", title: "Park Land use Proportion Summary (m2)" },
  { access: "buiding", title: "Building Proportion" },
  { access: "parcel", title: "Parcel Proportion (%)" }, 
  { access: "occupancy", title: "Occupancy Ratio" },
  { access: "zoneRatio", title: "Zone Proportion" },
  { access: "industryRation", title: "Occupancy by Industry" },
  { access: "shedVSParcelDevelopment", title: "Shed Vs Parcel" },
  { access: "roadRatioPerPark", title: "Road Proportion" },
  { access: "greenArea", title: "Green Area Proportion" },
  { access: "wasteTreatment", title: "Waste Treatment" }, //view_gis_waste_treatment
];
const LandAndInfraHeadReports = [
  { access: "ratioSummary", title: "Park Land use Proportion Summary (m2)" },
  { access: "buiding", title: "Building Proportion" },
  { access: "parcel", title: "Parcel Proportion (%)" }, //const {startDate,endDate}=req.params
  { access: "occupancy", title: "Occupancy Ratio" },
  { access: "zoneRatio", title: "Zone Proportion" },
  { access: "industryRation", title: "Occupancy by Industry" },
  { access: "shedVSParcelDevelopment", title: "Shed Vs Parcel" },
  { access: "roadRatioPerPark", title: "Road Proportion" },
  { access: "greenArea", title: "Green Area Proportion" },
  { access: "wasteTreatment", title: "Waste Treatment" }, //view_gis_waste_treatment
];
const GisProfessionalReports = [
  { access: "ratioSummary", title: "Park Land use Proportion Summary (m2)" },
  { access: "buiding", title: "Building Ratio" },
  { access: "parcel", title: "Parcel Proportion (%)" }, //const {startDate,endDate}=req.params
  { access: "occupancy", title: "Occupancy Ratio" },
  { access: "zoneRatio", title: "Zone Ratio" },
  { access: "industryRation", title: "Occupancy by Industry" },
  { access: "shedVSParcelDevelopment", title: "Shed Vs Parcel" },
  { access: "roadRatioPerPark", title: "Road Proportion" },
  { access: "greenArea", title: "Green Area Proportion" },
  { access: "wasteTreatment", title: "Waste Treatment" }, //view_gis_waste_treatment
];

export { MpAndLBHeadReports, LandAndInfraHeadReports, GisProfessionalReports };
