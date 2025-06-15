import DisplayAppropriateReport from "../../../Shared/Report/DisplayAppropriateReport";

export default function UncollectedReport() {
  return <DisplayAppropriateReport reportType={"uncollected"} department={'finance'} title="Uncollected Report"/>;
}
