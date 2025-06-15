import { FormattedReport } from "../../../Shared/Report";
import { MpAndLBHeadReports } from "../../Reports/LandAndInfraReports";

const department = "gis";

export default function MPandLBReports() {
  return <FormattedReport reports={MpAndLBHeadReports} department={department} />;
}
