import React from "react";
import { Container, Button } from "@mui/material";
import Header from "./Header";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8";

const BuildingPermitCertificate = ({ data }) => {
  const [permitted, setPermitted] = React.useState("Permitted");

  const handleChange = (event) => {
    setPermitted(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Header date={data.date} serialNo={data.serialNo} />
      <Section1 data={data} />
      <Section2 decision={data.decision} />
      <Section3 permitted={permitted} handleChange={handleChange} />
      <Section4 dateOfIssue={data.dateOfIssue} expireDate={data.expireDate} />
      <Section5 reasons={data.reasons} />
      <Section6 relevantDocuments={data.relevantDocuments} />
      <Section7 checkedBy={data.checkedBy} certifiedBy={data.certifiedBy} approvedBy={data.approvedBy} />
      <Section8 />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          /* Add printing logic here */
        }}
      >
        Print
      </Button>
    </Container>
  );
};

export default BuildingPermitCertificate;
