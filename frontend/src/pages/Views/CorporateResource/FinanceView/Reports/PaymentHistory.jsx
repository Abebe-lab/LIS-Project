import DisplayAppropriateReport from "../../../Shared/Report/DisplayAppropriateReport";

export default function PaymentHistory() {
  return <DisplayAppropriateReport reportType={"paymentHistory"} department={'finance'} title="Investor Payment History"/>;
}
