import { FormattedReport } from "../../Shared/Report";

const department = "sa";
const reports = [
  { access: "departmentSumary", title: "Department Summary" },
  { access: "departmentUserCount", title: "Department user count" },
  { access: "inactiveUsersLog", title: "Users Report" },
  { access: "activityByRole", title: "Activity By role" },
];
export default function EICReports() {
  return <FormattedReport reports={reports} department={department} />;
}
