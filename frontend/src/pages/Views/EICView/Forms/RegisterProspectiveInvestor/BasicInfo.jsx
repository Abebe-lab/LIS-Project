import { Grid, TextField } from "@mui/material";

//form 1
export default function BasicInfo({ tin_no, company_name, contact_person, phone_no, description, updateFields }) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          autoFocus
          required
          label="TIN number"
          type="text"
          placeholder="Enter TIN number here"
          value={tin_no}
          onChange={(e) => updateFields({ tin_no: e.target.value })}
          fullWidth={true}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 13, minLength: 10 }}
          margin="normal"
          helperText={
            tin_no.length < 10
              ? "TIN number must be at least 10 digits"
              : tin_no.length > 13
              ? "TIN number cannot exceed 13 digits"
              : null
          }
          error={tin_no.length < 10 || tin_no.length > 13}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Company Name"
          type="text"
          placeholder="Enter company name here"
          value={company_name}
          onChange={(e) => updateFields({ company_name: e.target.value })}
          fullWidth={true}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Contact Person"
          type="text"
          placeholder="Enter primary contact person name"
          value={contact_person}
          onChange={(e) => updateFields({ contact_person: e.target.value })}
          fullWidth={true}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Contact Phone number"
          type="text"
          placeholder="Enter contact phone number"
          value={phone_no}
          onChange={(e) => updateFields({ phone_no: e.target.value })}
          fullWidth={true}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          multiline
          minRows={3}
          value={description}
          onChange={(e) => updateFields({ description: e.target.value })}
          fullWidth={true}
          margin="normal"
        />
      </Grid>
    </>
  );
}
