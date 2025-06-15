import { FormattedReport } from "../../Shared/Report";

const department = "operation";
const reports = [
  { access: "activeContracts", title: "Active Contracts" },
  { access: "invActQuarterly", title: "Investor Activity Report" },
  { access: "invByIndustry", title: "Investment by Industry" },
  { access: "invDaily", title: "Daily Activity" },
  { access: "invSummary", title: "Investor Summary" },
  { access: "ParkQuarterly", title: "Quarterly Report" },
  { access: "arrears", title: "Arrear Report" },
  { access: "overdue", title: "Overdue Report" },
  { access: "dues", title: "Payments Due Report" },
  { access: "uncollected", title: "Uncollected Report" },
  { access: "financialSummary", title: "Financial Summary" },
];
export default function ParkStaffReports() {
  return <FormattedReport reports={reports} department={department} />;
}
