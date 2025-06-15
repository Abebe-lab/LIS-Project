//import React, { useState, useEffect } from "react";
import { Grid, TextField, FormControl, Button, Typography } from "@mui/material";

import { AttachFile } from "@mui/icons-material";

function PermitInfoTab({
	startingDate,
	setStartingDate,
	finishingDate,
	setFinishingDate,
	numberOfBuildings,
	setNumberOfBuildings,
	residenceCount,
	setResidenceCount,
	commercialCount,
	setCommercialCount,
	shedCount,
	setShedCount,
	otherCount,
	setOtherCount,
	modificationDetails,
	setModificationDetails,
	architecturalPlan,
	setArchitecturalPlan,
	structuralPlan,
	setStructuralPlan,
	sanitaryPlan,
	setSanitaryPlan,
	electricalPlan,
	setElectricalPlan,
	electroMechanicalPlan,
	setElectroMechanicalPlan,
	environmentalPlan,
	setEnvironmentalPlan,
	otherPlan,
	setOtherPlan,
	otherPlanDetails,
	setOtherPlanDetails,
}) {
	const handleFileChange = (e, planType) => {
		switch (planType) {
			case "architectural":
				setArchitecturalPlan(e.target.files[0]);
				break;
			case "structural":
				setStructuralPlan(e.target.files[0]);
				break;
			case "sanitary":
				setSanitaryPlan(e.target.files[0]);
				break;
			case "electrical":
				setElectricalPlan(e.target.files[0]);
				break;
			case "electroMechanical":
				setElectroMechanicalPlan(e.target.files[0]);
				break;
				case "environmental":
				setEnvironmentalPlan(e.target.files[0]);
				break;
			case "other":
				setOtherPlan(e.target.files[0]);
				break;
			default:
				break;
		}
	};

	// Calculate number of buildings based on building types
	const totalBuildings =
		parseInt(residenceCount) + parseInt(commercialCount) + parseInt(shedCount) + parseInt(otherCount);

	// Validate starting date and finishing date

	const handleStartingDateChange = (e) => {
		try {
			const newStartingDate = e.target.value;
			setStartingDate(newStartingDate);
			const finishingDate = new Date(newStartingDate);
	  finishingDate.setDate(finishingDate.getDate() + (18 * 31)); // Adjust date by 18 months (approximation)
	  setFinishingDate(finishingDate);			
		} catch (error) {
			console.log(error)
		}
	};

	const handleFinishingDateChange = (e) => {
		try {
			const newFinishingDate = e.target.value;
			if (newFinishingDate && startingDate && newFinishingDate < startingDate) {
				// If finishing date is less than starting date, don't update
				return;
			}
			setFinishingDate(newFinishingDate);
				
		} catch (error) {
			console.log(error)
		}
	};
	//const [disabledDates, setDisabledDates] = useState([]);

	/*useEffect(() => {
		if (startingDate) {
			const disabledDatesArray = [];
			const startingDateObj = new Date(startingDate);
			for (let i = 0; i < 365; i++) {
				const date = new Date(startingDateObj);
				date.setDate(date.getDate() - i);
				disabledDatesArray.push(date.toISOString().slice(0, 10));
			}
			setDisabledDates(disabledDatesArray);
		} else {
			setDisabledDates([]);
		}
	}, [startingDate]);*/
	return (
		<Grid container spacing={2} paddingLeft={6} paddingRight={6}>
			<Grid item xs={12} md={6}>
				<TextField
					label="Construction Starting Date"
					type="date"
					value={startingDate}
					onChange={handleStartingDateChange}
					fullWidth={true}
					InputLabelProps={{ shrink: true }}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label="Construction Finishing Date"
					type="date"
					value={finishingDate}
					onChange={handleFinishingDateChange}
					fullWidth={true}
					InputLabelProps={{ shrink: true }}
					//renderInput={(params) => <DatePicker {...params} minDate={minimumDate} />}
					//disabled={disabledDates.length>0}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Typography variant="subtitle1">Building Types</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							label="Number of Buildings"
							type="number"
							value={totalBuildings} // Display calculated total
							onChange={(e) => setNumberOfBuildings(e.target.value)} // Still allow manual input
							fullWidth={true}
						/>
					</Grid>
					<Grid item xs={12} md={2}>
						<TextField
							label="Residence"
							type="number"
							value={residenceCount}
							onChange={(e) => setResidenceCount(e.target.value)}
							fullWidth={true}
						/>
					</Grid>
					<Grid item xs={6} md={2}>
						<TextField
							label="Commercial"
							type="number"
							value={commercialCount}
							onChange={(e) => setCommercialCount(e.target.value)}
							fullWidth={true}
						/>
					</Grid>
					<Grid item xs={6} md={2}>
						<TextField
							label="Shed"
							type="number"
							value={shedCount}
							onChange={(e) => setShedCount(e.target.value)}
							fullWidth={true}
						/>
					</Grid>
					<Grid item xs={6} md={2}>
						<TextField
							label="Other"
							type="number"
							value={otherCount}
							onChange={(e) => setOtherCount(e.target.value)}
							fullWidth={true}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					label="Modification Details (if applicable)"
					value={modificationDetails}
					onChange={(e) => setModificationDetails(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="subtitle1">Plan attachments (DWG Files)</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Architectural plan
						<input
							type="file"
							accept=".dwg"
							onChange={(e) => handleFileChange(e, "architectural")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Structural plan
						<input
							type="file"
							accept=".dwg"
							onChange={(e) => handleFileChange(e, "structural")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Sanitary plan
						<input
							type="file"
							accept=".dwg"
							onChange={(e) => handleFileChange(e, "sanitary")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Electrical Plan
						<input
							type="file"
							accept=".dwg"
							onChange={(e) => handleFileChange(e, "electrical")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Electro-Mechanical plan
						<input
							type="file"
							accept=".dwg"
							onChange={(e) => handleFileChange(e, "electroMechanical")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						Environmental plan
						<input
							type="file"
							accept=".dwg"
							onChange={(e) => handleFileChange(e, "environmental")}
							style={{ display: "none" }}
						/>
					</Button>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={8}>
				<TextField
					label="Other Plan Details (if applicable)"
					value={otherPlanDetails}
					onChange={(e) => setOtherPlanDetails(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth={true}>
					<Button variant="contained" component="label" startIcon={<AttachFile />}>
						<input
							type="file"
							accept=".dwg"
							onChange={(e) => handleFileChange(e, "other")}
							style={{ display: "none" }}
						/>
						Other plan
					</Button>
				</FormControl>
			</Grid>
		</Grid>
	);
}

export default PermitInfoTab;
