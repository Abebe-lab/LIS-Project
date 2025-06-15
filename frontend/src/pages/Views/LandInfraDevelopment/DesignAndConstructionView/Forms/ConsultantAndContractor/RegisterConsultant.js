import React, { useState } from "react";
import { Grid, TextField, Select, InputLabel, MenuItem } from "@mui/material";
import FormContainer from "../../../../../../components/Forms/FormContainer";
import "./RegisterContractor.css";
import { ExecuteApiToPost } from "../../../../../../services/api/ExecuteApiRequests";

export default function ResgisterConsultant() {
	const [name, setName] = useState("");
	const [classValue, setClassValue] = useState(1); // Default class to 1
	const [licenseNo, setLicenseNo] = useState("");
	const [tinNo, setTinNo] = useState("");
	const [originCountry, setOriginCountry] = useState("Ethiopia"); // Default to Ethiopia
	const [addressRegion, setAddressRegion] = useState("");
	const [addressCity, setAddressCity] = useState("");
	const [addressSubCity, setAddressSubCity] = useState("");
	const [addressWoreda, setAddressWoreda] = useState("");
	const [addressHouseNo, setAddressHouseNo] = useState("");
	const [contactPersonName, setContactPersonName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [email, setEmail] = useState("");
	const [description, setDescription] = useState("");

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const responseData = await ExecuteApiToPost("consultants", {
				name,
				cls: classValue,
				license_no: licenseNo,
				tin_no: tinNo,
				origin_country: originCountry,
				address_region: addressRegion,
				address_city: addressCity,
				address_subcity: addressSubCity,
				address_woreda: addressWoreda,
				address_house_no: addressHouseNo,
				contact_person_name: contactPersonName,
				telephone,
				email,
				description,
			});

			setSuccessMessage(`Consultant registered successfully with ID: ${responseData.id}`);
			setErrorMessage(""); // Clear any previous error message

			// Reset the form fields
			setName("");
			setClassValue(1);
			setLicenseNo("");
			setTinNo("");
			setOriginCountry("Ethiopia");
			setAddressRegion("");
			setAddressCity("");
			setAddressSubCity("");
			setAddressWoreda("");
			setAddressHouseNo("");
			setContactPersonName("");
			setTelephone("");
			setEmail("");
			setDescription("");
		} catch (error) {
			setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
			setSuccessMessage(""); // Clear any previous success message
		}
	};

	return (
		<FormContainer title="Consultant Registration" onSubmit={handleSubmit}>
			<Grid
				item
				xs={12}
				md={12}
				sx={" display: flex; align-items: center; /* Align items vertically */margin-bottom: 5px;"}
			>
				<TextField name="name" label="Company Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth={true} />
			</Grid>
			<Grid item xs={12} md={12}>
				<InputLabel id="park-label">Consultant Class</InputLabel>
				<Select labelId="class" id="class" name="class" color="info" onChange={(e)=>setClassValue(e.target.value)} fullWidth={true}>
					<MenuItem key={1} value={1}>{"1"}</MenuItem>
					<MenuItem key={2} value={2}>{"2"}</MenuItem>
					<MenuItem key={3} value={3}>{"3"}</MenuItem>
					<MenuItem key={4} value={4}>{"4"}</MenuItem>
					<MenuItem key={5} value={5}>{"5"}</MenuItem>
				</Select>				
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="licenceNo"
					label="Licence No"
					value={licenseNo}
					onChange={(e) => setLicenseNo(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="licenceNo"
					label="Licence No"
					value={licenseNo}
					onChange={(e) => setLicenseNo(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField name="tinNo" label="TIN No" value={tinNo} onChange={(e) => setTinNo(e.target.value)} fullWidth={true} />
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="originCountry"
					label="Origin Country"
					value={originCountry}
					onChange={(e) => setOriginCountry(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="addressRegion"
					label="Region"
					value={addressRegion}
					onChange={(e) => setAddressRegion(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="addressCity"
					label="City"
					value={addressCity}
					onChange={(e) => setAddressCity(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="addressSubCity"
					label="Sub City"
					value={addressSubCity}
					onChange={(e) => setAddressSubCity(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="addressWoreda"
					label="Woreda"
					value={addressWoreda}
					onChange={(e) => setAddressWoreda(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="addressHouseNo"
					label="House No"
					value={addressHouseNo}
					onChange={(e) => setAddressHouseNo(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="contactPersonName"
					label="Contact Person Name"
					value={contactPersonName}
					onChange={(e) => setContactPersonName(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					name="telephone"
					label="Telephone"
					value={telephone}
					onChange={(e) => setTelephone(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth={true} />
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField
					rows={3}
					name="description"
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					fullWidth={true}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				{successMessage && <div className="success-message">{successMessage}</div>}
				{errorMessage && <div className="error-message">{errorMessage}</div>}
			</Grid>
		</FormContainer>
	);
}
