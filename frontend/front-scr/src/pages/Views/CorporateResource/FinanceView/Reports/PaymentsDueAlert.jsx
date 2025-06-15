import DisplayAppropriateReport from "../../../Shared/Report/DisplayAppropriateReport";

export default function PaymentDueAlert() {
  return <DisplayAppropriateReport reportType={"dues"} department={'finance'} title="Payments Due Report"/>;
}
