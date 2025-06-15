import React from "react";
import { Grid, Typography, Button, FormControl, TextField, InputLabel} from "@mui/material";
import { AttachFile } from "@mui/icons-material";

function CommitmentTab({
	ownerCommitment,
	setOwnerCommitment,
	consultantCommitment,
	setConsultantCommitment,
	contractorCommitment,
	setContractorCommitment,
	description,
	setDescription,
}) {
	//const [ownerCommitmentFile, setOwnerCommitmentFile] = useState(null);
	//const [consultantCommitmentFile, setConsultantCommitmentFile] = useState(null);
	//const [contractorCommitmentFile, setContractorCommitmentFile] = useState(null);

	const handleFileChange = (e, commitmentType) => {
		switch (commitmentType) {
			case "owner":
				setOwnerCommitment(e.target.files[0]);
				break;
			case "consultant":
				setConsultantCommitment(e.target.files[0]);
				break;
			case "contractor":
				setContractorCommitment(e.target.files[0]);
				break;
			default:
				break;
		}
	};

	return (
		<Grid container spacing={2} paddingLeft={6} paddingRight={6}>
			<Grid item xs={12}>
				<Typography variant="subtitle1">Commitments (Signed Documents)</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Attach Owner Commitment
						<input
							type="file"
							accept=".pdf, .docx, .doc, .jpeg, .jpg, .png"
							onChange={(e) => handleFileChange(e, "owner")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						<input
							type="file"
							accept=".pdf, .docx, .doc, .jpeg, .jpg, .png"
							onChange={(e) => handleFileChange(e, "consultant")}
							style={{ display: "none" }}
						/>
						Attach Consultant Commitment
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<InputLabel></InputLabel>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Attach Contractor Commitment
						<input
							type="file"
							accept=".pdf,.docx,.doc, .jpeg, .jpg,.png"
							onChange={(e) => handleFileChange(e, "contractor")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					fullWidth={true}
					multiline
					rows={6}
				/>
			</Grid>
		</Grid>
	);
}

export default CommitmentTab;
