import React, { useState } from 'react';
import './RegisterContractor.css';
import { ExecuteApiToPost } from '../../../../../../services/api/ExecuteApiRequests';

const ResgisterContractor = () => {
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
			const responseData = await ExecuteApiToPost("/contractors", {
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

			setSuccessMessage(`Contractor registered successfully with ID: ${responseData.id}`);
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
		<div className="contractor-registration-container">
			<h2>Contractor Registration</h2>
			{successMessage && <div className="success-message">{successMessage}</div>}
			{errorMessage && <div className="error-message">{errorMessage}</div>}
			<form onSubmit={handleSubmit} className="registration-form">
				<div className="form-group">
					<label htmlFor="name">Company Name:</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="class">Class (1-5):</label>
					<select
						id="class"
						value={classValue}
						onChange={(e) => setClassValue(parseInt(e.target.value))}
						className="form-control"
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="licenseNo">License No:</label>
					<input
						type="text"
						id="licenseNo"
						value={licenseNo}
						onChange={(e) => setLicenseNo(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="tinNo">TIN No:</label>
					<input
						type="text"
						id="tinNo"
						value={tinNo}
						onChange={(e) => setTinNo(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="originCountry">Origin Country:</label>
					<select
						id="originCountry"
						value={originCountry}
						onChange={(e) => setOriginCountry(e.target.value)}
						className="form-control"
					>
						{/* Add your list of countries here */}
						<option value="Ethiopia">Ethiopia</option>
						<option value="United States">United States</option>
						{/* ... other countries ... */}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="addressRegion">Address Region:</label>
					<input
						type="text"
						id="addressRegion"
						value={addressRegion}
						onChange={(e) => setAddressRegion(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="addressCity">City:</label>
					<input
						type="text"
						id="addressCity"
						value={addressCity}
						onChange={(e) => setAddressCity(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="addressSubCity">Sub-City:</label>
					<input
						type="text"
						id="addressSubCity"
						value={addressSubCity}
						onChange={(e) => setAddressSubCity(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="addressWoreda">Woreda:</label>
					<input
						type="text"
						id="addressWoreda"
						value={addressWoreda}
						onChange={(e) => setAddressWoreda(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="addressHouseNo">House No:</label>
					<input
						type="text"
						id="addressHouseNo"
						value={addressHouseNo}
						onChange={(e) => setAddressHouseNo(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contactPersonName">Contact Person Name:</label>
					<input
						type="text"
						id="contactPersonName"
						value={contactPersonName}
						onChange={(e) => setContactPersonName(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="telephone">Telephone:</label>
					<input
						type="tel"
						id="telephone"
						value={telephone}
						onChange={(e) => setTelephone(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="form-control"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register Contractor
				</button>
			</form>
		</div>
	);
};

export default ResgisterContractor;
