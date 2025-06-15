import DisplayAppropriateReport from "../../../Shared/Report/DisplayAppropriateReport";

export default function FinancialSummaryReport() {
  return <DisplayAppropriateReport reportType={"summary"} department={'finance'} title="Financial Summary" />;
}
