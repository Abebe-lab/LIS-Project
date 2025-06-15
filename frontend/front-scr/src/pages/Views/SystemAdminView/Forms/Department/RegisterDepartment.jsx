// import React, { useState } from "react";
// import { Tabs, Tab, Alert, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { TextField, TextareaAutosize } from "@mui/material";
// import FormContainer from "../../../../../components/Forms/FormContainer";
// import { ExecuteApiToPost } from "../../../../../services/api/ExecuteApiRequests";
// import DepartmentList from "../../Reports/DepartmentList";

// const initialData = {
//   name: "",
//   description: "",
// };
// function RegisterDepartment() {
//   const [formData, setFormData] = useState(initialData);
//   const [responseMessage, setResponseMessage] = useState(null);
//   const navigate = useNavigate();

//   const handleValueChange = e => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };
//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const data = await ExecuteApiToPost("departments", formData);
//       if (data) {
//         setResponseMessage(<Alert severity="success">Department registered</Alert>);
//       }
//     } catch (error) {
//       setResponseMessage(<Alert severity="error">Error registering department</Alert>);
//       console.error("Error fetching system configuration:", error);
//     }
//     navigate("/system-access"); // Navigate to the next page
//   };

//   return (
//     <>
//       <FormContainer title="Department Registration" onSubmit={handleSubmit} extraInfoAfterButton={<DepartmentList />}>
//         <Grid item xs={12}>
//           <TextField
//             label="Department Name"
//             variant="outlined"
//             name="name"
//             fullWidth={true}
//             value={formData.name}
//             onChange={e => handleValueChange(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextareaAutosize
//             aria-label="Department Description"
//             name="description"
//             minRows={4}
//             placeholder="Department Description"
//             style={{
//               width: "100%",
//               padding: 10,
//               borderRadius: 4,
//               borderColor: "#c4c4c4",
//               marginBottom: "16px",
//             }}
//             value={formData.description}
//             onChange={e => handleValueChange(e.target.value)}
//           />
//         </Grid>
//         {responseMessage && (
//           <Grid item xs={12}>
//             {responseMessage}
//           </Grid>
//         )}{" "}
//       </FormContainer>
//     </>
//   );
// }

// function SystemAccess() {
//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <div className="floating-form shadow-lg " style={{ float: "inline-end" }}>
//       <form>
//         <h1>Welcome to the System</h1>
//         <Tabs value={selectedTab} onChange={handleChange}>
//           <Tab label="View Map" value={0} />
//           <Tab label="Register User" value={1} />
//         </Tabs>
//         {selectedTab === 0 && <div>View Map Content</div>}
//         {selectedTab === 1 && <div>Register User Content</div>}
//       </form>
//     </div>
//   );
// }

// export { RegisterDepartment, SystemAccess };




import React, { useState } from "react";
import { Tabs, Tab, Alert, Grid, TextField, TextareaAutosize } from "@mui/material"; 
import { useNavigate } from "react-router-dom";
import FormContainer from "../../../../../components/Forms/FormContainer";
import { ExecuteApiToPost } from "../../../../../services/api/ExecuteApiRequests";
import DepartmentList from "../../Reports/DepartmentList";

const initialData = {
  id: "",
  name: "",
  park_id: "",
  description: "",
  abbreviation: "", // Added abbreviation
};

function RegisterDepartment() {
  const [formData, setFormData] = useState(initialData);
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();

  const handleValueChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await ExecuteApiToPost("departments", formData);
      if (data) {
        setResponseMessage(<Alert severity="success">Department registered</Alert>);
        setFormData(initialData);
      }
    } catch (error) {
      setResponseMessage(<Alert severity="error">Error registering department</Alert>);
      console.error("Error registering department:", error);
    }
    // Uncomment to navigate after successful registration
    // navigate("/system-access");
  };

  return (
    <>
      <FormContainer title="Department Registration" onSubmit={handleSubmit} extraInfoAfterButton={""}>
        <Grid item xs={12}>
          <TextField
            label="Department ID"
            variant="outlined"
            name="id"
            fullWidth={true}
            value={formData.id}
            onChange={handleValueChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Department Name"
            variant="outlined"
            name="name"
            fullWidth={true}
            value={formData.name}
            onChange={handleValueChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Park ID"
            variant="outlined"
            name="park_id"
            fullWidth={true}
            value={formData.park_id}
            onChange={handleValueChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            aria-label="Department Description"
            name="description"
            minRows={4}
            placeholder="Department Description"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 4,
              borderColor: "#c4c4c4",
              marginBottom: "16px",
            }}
            value={formData.description}
            onChange={handleValueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Abbrevation"
            variant="outlined"
            name="abbrevation" // Added abbreviation field
            fullWidth={true}
            value={formData.abbrevation}
            onChange={handleValueChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        {responseMessage && (
          <Grid item xs={12}>
            {responseMessage}
          </Grid>
        )}
      </FormContainer>
    </>
  );
}

function SystemAccess() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="floating-form shadow-lg" style={{ float: "inline-end" }}>
      <form>
        <h1>Welcome to the System</h1>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="View Map" value={0} />
          <Tab label="Register User" value={1} />
        </Tabs>
        {selectedTab === 0 && <div>View Map Content</div>}
        {selectedTab === 1 && <div>Register User Content</div>}
      </form>
    </div>
  );
}

export { RegisterDepartment, SystemAccess };