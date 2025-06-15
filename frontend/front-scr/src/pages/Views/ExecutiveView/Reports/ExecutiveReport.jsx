import { FormattedReport } from "../../Shared/Report";

const department = "executives";
const reports = [
  { access: "investors", title: "Investors List" },
  { access: "investorsByParkAndSector", title: "Investors by Park and Sector" },
  { access: "invActQuarterly", title: "Investor Activities Quarterly" },
  { access: "referenceByTime", title: "References by Time" }, //const {startDate,endDate}=req.params
  { access: "adminReport", title: "Summary Report" },
  { access: "financeReport", title: "Financial Summary Report" },
  //	{ access: "referredDetail", title: "Detailed References" },
];
export default function ExecutiveReports() {
  return <FormattedReport reports={reports} department={department} />;
}
