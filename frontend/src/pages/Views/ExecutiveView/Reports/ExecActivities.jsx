import { Container } from "@mui/material";
import DisplayAppropriateReport from "../../Shared/Report/DisplayAppropriateReport";
export default function ExecActivities() {
  return (
    <Container>
      <DisplayAppropriateReport
        reportType={"invActQuarterly"}
        department={"executives"}
        title={"Investor Activities"}
      />
    </Container>
  );
}
