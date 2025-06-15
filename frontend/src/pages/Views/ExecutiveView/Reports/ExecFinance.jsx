import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Container  } from "@mui/material";
import { IPDCReportTemplate } from "../../../../components";
import { GetInvestors } from "../../Shared/CommonData/CommonData";
export default function ExecFinance() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInvestors = async () => {
			const newData = await GetInvestors();
			if (newData) {
				setData(newData);
			}
			setLoading(false);
			return true;
		};
		fetchInvestors();
	}, []);
	if (loading) {
		return <CircularProgress />;
	}
	return (
		<Container>
			<Typography align="center" variant="h4">
			Executive Finance
			</Typography>

			{data.length > 0 ? (
				<IPDCReportTemplate defaultTitle={"Executive Finance"} data={data} setData={setData} />
			) : (
				<>{"No Data"}</>
			)}
		</Container>
	);
}
