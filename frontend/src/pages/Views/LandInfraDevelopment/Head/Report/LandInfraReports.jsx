import { FormattedReport } from "../../../Shared/Report";
import { LandAndInfraHeadReports } from "../../Reports/LandAndInfraReports";

const department = "gis";
export default function LandInfraReports() {
  return <FormattedReport reports={LandAndInfraHeadReports} department={department} />;
}
