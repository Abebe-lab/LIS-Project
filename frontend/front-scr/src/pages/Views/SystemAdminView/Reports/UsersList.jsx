import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Container  } from "@mui/material";
import { IPDCReportTemplate } from "../../../../components";
import { GetInvestors, GetUsers } from "../../Shared/CommonData/CommonData";
export default function UsersList() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			const newData = await GetUsers();
			if (newData) {
				setData(newData);
			}
			setLoading(false);
			return true;
		};
		fetchUsers();
	}, []);
	if (loading) {
		return <CircularProgress />;
	}
	return (
		<Container>
			<Typography align="center" variant="h2">
				Yet to be defined
			</Typography>

			{data.length > 0 ? (
				<IPDCReportTemplate defaultTitle={"System Administrator Report"} data={data} setData={setData} />
			) : (
				<>{"No Data"}</>
			)}
		</Container>
	);
}
