import { FormattedReport } from "../../Shared/Report";

const department = "eic";
const reports = [
  { access: "availableSpaces", title: "Available Options" },
  { access: "prospectiveInvestors", title: "Prospective Investors" },
  { access: "activeContracts", title: "Active Contracts" },
  { access: "adminReport", title: "Summary Report" },
  { access: "referenceByTime", title: "References by Time" }, //const {startDate,endDate}=req.params
  { access: "requestProgress", title: "Progress of References" },
  { access: "referredDetail", title: "Detailed References" },
];
export default function MarketingAndPromotionReports() {
  return <FormattedReport reports={reports} department={department} />;
}
