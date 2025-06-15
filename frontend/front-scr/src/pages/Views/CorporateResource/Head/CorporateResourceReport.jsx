import { FormattedReport } from "../../../Shared/Report";

const department = "finance";
const reports = [
  { access: "summary", title: "Land & Shed Revenue" },
  { access: "arrears", title: "Arrears Summary" },
  { access: "overdue", title: "Overdue" },
  { access: "dues", title: "Payments due alert" },
  { access: "uncollected", title: "uncollected Report" },
];
export default function CorporateResourceReport() {
  return <FormattedReport reports={reports} department={department} />;
}
