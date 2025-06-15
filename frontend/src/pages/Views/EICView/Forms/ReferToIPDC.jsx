import { useState } from "react";
import { Button, Typography, TextField, Grid, Container } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormContainer from "../../../../components/Forms/FormContainer";
import { ExecuteApiToPost } from "../../../../services/api/ExecuteApiRequests";

const initialData = {
  p_inv_id: "",
  company_name: "",
  request_date: "",
  purpose: "",
  approved_request_form: "",
  associated_documents: [],
  description: "",
};
export default function ReferToIPDC() {
  const [formData, setFormData] = useState(initialData);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const responseData = await ExecuteApiToPost("referToIPDC", formData);

      if (responseData === 201) {
        toast.success("Form Submitted Successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setResponseMessage("Prospective investor parcel reference successful!");
        setFormData(initialData);
      } else {
        toast.error(`Prospective investor parcel reference failed: ${responseData}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        setResponseMessage("Prospective investor parcel reference failed");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      setResponseMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <Container>
      <FormContainer title="Refer to IPDC" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          {/*
					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				*/}

          <TextField
            label="Investor ID/TIN No"
            name="p_inv_id"
            value={formData.p_inv_id}
            onChange={handleChange}
            required
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{formData.company_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Reference Date"
            name="request_date"
            type="date"
            value={formData.request_date}
            onChange={handleChange}
            required
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" component="label" fullWidth={true} startIcon={<AttachFile />}>
            Upload Approved Reference Form
            <input type="file" name="approved_request_form" hidden onChange={handleChange} />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1">
            {formData.approved_request_form ? formData.approved_request_form.name : "No file selected"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" component="label" fullWidth={true} startIcon={<AttachFile />}>
            Upload Associated Documents
            <input
              type="file"
              name="associated_documents"
              accept=".pdf, .jpeg, .jpg, .png"
              hidden
              onChange={handleChange}
            />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1">
            {formData.associated_documents?.length > 0 ? formData.associated_documents[0].name : "No file selected"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            minRows={3}
            fullWidth={true}
          />
        </Grid>
        {responseMessage && (
          <Grid item xs={12}>
            <Typography variant="body1">{responseMessage}</Typography>
          </Grid>
        )}
        <ToastContainer />
      </FormContainer>
    </Container>
  );
}
