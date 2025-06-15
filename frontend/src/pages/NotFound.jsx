import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="md" component="main" style={{ textAlign: "center", marginTop: "50px" }}>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          Please only use the system as specified. Only authenticated and authorized users are allowed to use the
          system.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/" style={{ marginTop: "20px" }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
