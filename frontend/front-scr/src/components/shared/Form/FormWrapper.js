import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const FormWrapper = ({ title, children, width = "300px", height = "80%", float = "right" }) => {
	return (
		<Container maxWidth="sm">
			<Paper elevation={3} >
				<Box p={3}>
          <Typography variant="h4" align="center" noWrap>{title}</Typography>
					{children}
				</Box>
			</Paper>
		</Container>
	);
};

export default FormWrapper;
