import { Grid, TextField } from "@mui/material";
//prettier-ignore
export default function PIAddress({	nationality_origin,	city, specific_location, mobile_no,	email, website,	updateFields }) {
	return (
		<>
			<Grid item xs={12}>
			<TextField autoFocus required	label="Country"	type="text"	placeholder="Enter country here" value={nationality_origin}
				onChange={(e) => updateFields({ nationality_origin: e.target.value })}	fullWidth={true} margin="normal"
			/>
			</Grid>
			<Grid item xs={12}>
			<TextField
				required
				label="City"
				type="text"
				placeholder="Enter city here"
				value={city}
				onChange={(e) => updateFields({ city: e.target.value })}
				fullWidth={true}
				margin="normal"
			/>
			</Grid>
      <Grid item xs={12}>
			<TextField
				required
				label="Specific Location"
				type="text"
				placeholder="Enter specific location here"
				value={specific_location}
				onChange={(e) => updateFields({ specific_location: e.target.value })}
				fullWidth={true}
				margin="normal"
			/>
			</Grid>
      <Grid item xs={12}>
			<TextField
				required
				label="Mobile No/Office No"
				type="text"
				placeholder="Enter office/mobile no"
				value={mobile_no}
				onChange={(e) => updateFields({ mobile_no: e.target.value })}
				fullWidth={true}
				margin="normal"
			/></Grid>
			<Grid item xs={12}>
			<TextField
				required
				label="Email"
				type="text"
				placeholder="Enter email here"
				value={email}
				onChange={(e) => updateFields({ email: e.target.value })}
				fullWidth={true}
				margin="normal"
			/></Grid>
			<Grid item xs={12}>
			<TextField
				label="Website"
				type="text"
				placeholder="Enter website here"
				value={website}
				onChange={(e) =>  updateFields({ website: e.target.value })}
				fullWidth={true}
				margin="normal"
			/></Grid>
			
		</>
	);
}
