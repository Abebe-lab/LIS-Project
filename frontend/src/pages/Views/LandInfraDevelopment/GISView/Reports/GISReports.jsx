import { FormattedReport } from "../../../Shared/Report";
import { GisProfessionalReports } from "../../Reports/LandAndInfraReports";
const department = "gis";

export default function GISReports() {
  return <FormattedReport reports={GisProfessionalReports} department={department} />;
}
