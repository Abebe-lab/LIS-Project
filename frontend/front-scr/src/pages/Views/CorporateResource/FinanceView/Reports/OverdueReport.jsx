import DisplayAppropriateReport from "../../../Shared/Report/DisplayAppropriateReport";

export default function OverdueReports() {
  return <DisplayAppropriateReport reportType={"overdue"} department={'finance'} title="Overdue Report"/>;
}
