import DisplayAppropriateReport from "../../../Shared/Report/DisplayAppropriateReport";

export default function ArreaReports() {
  return <DisplayAppropriateReport reportType={"arrears"} department={'finance'} title="Arrear Report" />;
}
