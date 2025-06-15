import React, { useEffect, useState } from "react";
import { TextField, Grid, Alert, CircularProgress, Button } from "@mui/material";
import FormContainer from "../../../../../components/Forms/FormContainer";
//import useDecodedUser from "../../../../../services/hooks/useDecodedUser";
import { ExecutePostWithParams } from "../../../../../services/api/ExecuteApiRequests";
import { ParcelsInParkList, InvestorList, ParkList } from "../../../Shared/PreRenderedComponents";
import PlanPrintPreview from "./PlanPrintPreview";
import IPDCToastMessageResult from "../../../../../components/Controls/IPDCToastMessageResult";
import MapDataProvider from "../../GISView/MapRelated/MapData/MapDataProvider";

const initialValue = {
  selectedPark: null,
  selectedParcel: null,
  investor: null,
  newInvestor: "",
  type: null,
  description: "",
  attachment: null,
};

const PreparePlanToIssueToInvestor = () => {
  //const decodedUser = useDecodedUser();
  const [formData, setFormData] = useState(initialValue);
  const [status, setStatus] = useState({ loading: false, error: null, success: null });
  const [openPreview, setOpenPreview] = useState(false);

  const validateForm = () => {
    const { selectedPark, investor, selectedParcel, newInvestor, type } = formData;
    if (!selectedPark) return "Please select a park";
    if (!(investor || newInvestor)) return "Please select or fill investor";
    if (!selectedParcel) return "Please select a parcel to assign";
    if (!type) return "Please select type";
    return null;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setStatus({ ...status, error: validationError });
      return;
    }
    setOpenPreview(true);
    setStatus({ loading: true, error: null, success: null });

    try {
      const submitData = new FormData();
      submitData.append("data", JSON.stringify(formData));
      submitData.append("file", formData.attachment);
      const response = await ExecutePostWithParams(`parcels/placeOnHold`, submitData, false);
      if (response?.message) {
        setStatus({ loading: false, error: null, success: response?.message || "Data imported successfully" });
        setFormData(initialValue);
        setOpenPreview(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStatus({ loading: false });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = event => {
    const file = event.target.files[0];
    handleInputChange("attachment", file);
  };

  const handleOpenPreview = () => {
    if (!(formData.selectedParcel?.upin && formData.selectedPark?.id)) {
      setStatus({ loading: false, error: "Please select a parcel and park", success: null });
      return;
    }
    setOpenPreview(true);
    //setFormData({loading: false,error: null,success: null });
  };

  const handlePrint = async e => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Only call preventDefault if it's an event object
    }
    setStatus({ ...status, loading: true, error: null, success: null });
    try {
      const submitData = new FormData();
      submitData.append("upin", formData.selectedParcel?.upin || "");
      //submitData.append("park_id", formData.selectedPark?.id || "");
      submitData.append("investor_id", formData.investor?.id || formData.newInvestor || "");
      submitData.append("type", formData.type || "");
      submitData.append("description", formData.description || "");

      if (formData.attachment) {
        submitData.append("file", formData.attachment);
      }
      const response = await ExecutePostWithParams(`parcels/:${formData.selectedParcel?.upin}/placeOnHold`, submitData);
      if (response?.message) {
        setStatus({error: null, success: response.message, dialogOpen: false });
        setOpenPreview(false); // Close preview after successful submission
      }
    } catch (error) {
      console.log(error);
      setStatus({ ...status,error: "An error occurred while submitting the form." });
    }finally{
      setStatus({ ...status, loading: false });
    }
  };

  useEffect(() => {
    // Reset selectedParcel when the park changes to ensure a clean selection for new park
    if (formData.selectedPark) {
      handleInputChange("selectedParcel", null); // Or whatever default value you want
    }
  }, [formData.selectedPark]);

  return (
    <>
      <MapDataProvider>
        <FormContainer title="Prepare Plan to Issue to Investor" showButton={false}>
          <Grid item xs={6}>
            <InvestorList
              selectedInvestor={formData.investor}
              setSelectedInvestor={investor => handleInputChange("investor", investor)}
              isRequired={false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="newInvestor"
              value={formData.newInvestor}
              onChange={e => handleInputChange("newInvestor", e.target.value)}
              name="newInvestor"
              label="Fill name for new investor"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <ParkList
              selectedPark={formData.selectedPark}
              setSelectedPark={park => handleInputChange("selectedPark", park)}
            />
          </Grid>
          <Grid item xs={6}>
            {formData.selectedPark && (
              <ParcelsInParkList
                key={formData.selectedPark?.id} // <-- Add key here
                parkId={formData.selectedPark?.id}
                selectedParcel={formData.selectedParcel}
                setSelectedParcel={parcel => handleInputChange("selectedParcel", parcel)}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              value={formData.description}
              onChange={e => handleInputChange("description", e.target.value)}
              name="description"
              label="Description"
              multiline
              rows={2}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField type="file" onChange={handleFileUpload} fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          {status && status.loading && (
            <Grid item justifyContent="center" style={{ marginTop: 16 }}>
              <CircularProgress />
            </Grid>
          )}
          <Grid item xs={12} justifyContent="center" style={{ marginTop: 16 }}>
            <Button type="button" variant="contained" color="primary" onClick={handleOpenPreview} fullWidth={true}>
              Preview Plan
            </Button>
          </Grid>
          {/* Preview Dialog */}
          {formData.selectedParcel && (
            <PlanPrintPreview
              feature={formData.selectedParcel}
              investorName={formData.investor?.company_name || formData.newInvestor || "Company name not stated"}
              open={openPreview}
              onClose={() => setOpenPreview(false)}
              onPrint={handlePrint}
            />
          )}
          {(status.error || status.success) && (
            <Grid item xs={12}>
              <Alert severity={status.error ? "warning" : "success"}>{status.error || status.success}</Alert>
              <IPDCToastMessageResult message={status.error ? status.error : status?.success || ""} />
            </Grid>
          )}
        </FormContainer>
      </MapDataProvider>
    </>
  );
};

export default PreparePlanToIssueToInvestor;
