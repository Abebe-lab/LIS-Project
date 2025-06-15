import { Button, Grid, Typography } from "@mui/material";

export default function PIAttachment({ application_file, license, propsal_attached, legal_documents, updateFields }) {
  return (
    <>
      <Grid item md={4}>
        <Typography variant="h6">Application</Typography>
      </Grid>
      <Grid item md={4}>
        <Button variant="contained" component="label">
          Upload Application
          <input
            type="file"
            hidden
            accept="image/*, application/pdf"
            onChange={(e) => updateFields({ application_file: e.target.files[0] })}
          />
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">{application_file ? application_file.name : "No file selected"}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">License</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" component="label">
          Upload License
          <input
            type="file"
            hidden
            accept=".pdf, .docx, .doc, .jpeg, .jpg, .png"
            onChange={(e) => updateFields({ license: e.target.files[0] })}
          />
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">{license ? license.name : "No file selected"}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Proposal</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" component="label">
          Upload Proposal
          <input
            type="file"
            hidden
            accept=".pdf, .docx, .doc, .jpeg, .jpg, .png"
            onChange={(e) => updateFields({ propsal_attached: e.target.files[0] })}
          />
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">{propsal_attached ? propsal_attached.name : "No file selected"}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Legal Documents</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" component="label">
          Upload Legal Documents
          <input
            type="file"
            hidden
            accept=".pdf, .docx, .doc, .jpeg, .jpg, .png"
            onChange={(e) => updateFields({ legal_documents: e.target.files[0] })}
          />
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">{legal_documents ? legal_documents.name : "No file selected"}</Typography>
      </Grid>
    </>
  );
}
