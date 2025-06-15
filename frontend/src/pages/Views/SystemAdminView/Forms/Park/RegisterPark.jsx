import React, { useState, useRef } from "react";
import { Alert, Grid, TextField, TextareaAutosize } from "@mui/material";
import FormContainer from "../../../../../components/Forms/FormContainer";
import { ExecuteApiToPost } from "../../../../../services/api/ExecuteApiRequests";

const initialData = {
  id: "",
  name: "",
  region: "",
  compound_boundary: null,
  specialization: "",
  developed_by: "",
  area_on_plan: "",
  current_status: "",
  description: "",
  abbrevation: "",
  zone: "",
  city: "",
  center_of_park: null,
  pid: "",
  woreda: "",
  address: "",
};

function RegisterPark() {
  const [formData, setFormData] = useState(initialData);
  const [responseMessage, setResponseMessage] = useState(null);
  const compoundBoundaryRef = useRef(null);
  const centerParkRef = useRef(null);

  const handleValueChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const hexValue = event.target.result.trim();
        setFormData((prev) => ({ ...prev, [field]: hexValue }));
      };
      reader.onerror = () => {
        alert("Error reading file");
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form Data before submission:", formData);

    if (!formData.id) {
      setResponseMessage(<Alert severity="error">ID is required</Alert>);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const data = await ExecuteApiToPost("parks", formDataToSend);
      if (data) {
        setResponseMessage(<Alert severity="success">Park registered successfully</Alert>);
        // Clear form data and file inputs
        setFormData(initialData);
        compoundBoundaryRef.current.value = ""; // Clear the file input
        centerParkRef.current.value = ""; // Clear the file input
      }
    } catch (error) {
      setResponseMessage(<Alert severity="error">Error registering park</Alert>);
      console.error("Error registering park:", error);
    }
  };

  return (
    <>
      <FormContainer title="Park Registration" onSubmit={handleSubmit}>
        {Object.keys(initialData).map((key) => (
          <Grid item xs={12} key={key}>
            {key === "description" ? (
              <TextareaAutosize
                aria-label={`${key.charAt(0).toUpperCase() + key.slice(1)} Description`}
                name={key}
                minRows={4}
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} Description`}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 4,
                  borderColor: "#c4c4c4",
                  marginBottom: "16px",
                }}
                value={formData[key]}
                onChange={handleValueChange}
              />
            ) : key === "compound_boundary" ? (
              <input
                type="file"
                accept=".txt"
                onChange={(e) => handleFileChange(e, key)}
                ref={compoundBoundaryRef} // Assign ref
                style={{ marginBottom: "16px", width: "100%" }}
              />
            ) : key === "center_of_park" ? (
              <input
                type="file"
                accept=".txt"
                onChange={(e) => handleFileChange(e, key)}
                ref={centerParkRef} // Assign ref
                style={{ marginBottom: "16px", width: "100%" }}
              />
            ) : (
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                variant="outlined"
                name={key}
                fullWidth={true}
                value={formData[key]}
                onChange={handleValueChange}
                sx={{ mb: 2 }}
              />
            )}
          </Grid>
        ))}
        {responseMessage && (
          <Grid item xs={12}>
            {responseMessage}
          </Grid>
        )}
      </FormContainer>
    </>
  );
}

export default RegisterPark;

// import React, { useState } from "react";
// import { Alert, Grid, TextField, TextareaAutosize } from "@mui/material";
// import FormContainer from "../../../../../components/Forms/FormContainer";
// import { ExecuteApiToPost } from "../../../../../services/api/ExecuteApiRequests";
// import * as shapefile from "shapefile"; // Importing shapefile

// const initialData = {
//   id: "",
//   name: "",
//   region: "",
//   compound_boundary: null,
//   specialization: "",
//   developed_by: "",
//   area_on_plan: "",
//   current_status: "",
//   description: "",
//   abbrevation: "",
//   zone: "",
//   city: "",
//   center_of_park: null,
//   pid: "",
//   woreda: "",
//   address: "",
// };

// function RegisterPark() {
//   const [formData, setFormData] = useState(initialData);
//   const [responseMessage, setResponseMessage] = useState(null);

//   const handleValueChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.name.endsWith('.shp')) {
//         alert("Please upload a valid .shp file.");
//         return;
//       }

//       shapefile.open(file)
//         .then(source => {
//           return source.read(); // Read the first feature
//         })
//         .then(({ features }) => {
//           console.log("Number of features:", features.length);
//           if (features.length < 2) {
//             alert("Shapefile must contain at least two features.");
//             return;
//           }

//           // Convert geometries to hexadecimal
//           const hexValue = convertGeometryToHex(features[0].geometry); // Adjust as needed for the appropriate feature
//           console.log(`${field} Hex:`, hexValue);

//           // Update form data with hexadecimal values for the specific field
//           setFormData((prev) => ({
//             ...prev,
//             [field]: hexValue, // Update only the specified field
//           }));
//         })
//         .catch((error) => {
//           console.error("Error reading shapefile:", error.message);
//           alert("Error reading shapefile: " + error.message);
//         });
//     }
//   };

//   const convertGeometryToHex = (geometry) => {
//     if (!geometry) {
//       console.error("Invalid geometry:", geometry);
//       return null; // Return null if geometry is invalid
//     }
//     const geomString = JSON.stringify(geometry);
//     return Buffer.from(geomString).toString('hex'); // Convert geometry to hexadecimal
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Form Data before submission:", formData);

//     if (!formData.id) {
//       setResponseMessage(<Alert severity="error">ID is required</Alert>);
//       return;
//     }

//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const data = await ExecuteApiToPost("parks", formDataToSend);
//       if (data) {
//         setResponseMessage(<Alert severity="success">Park registered successfully</Alert>);
//         setFormData(initialData);
//       }
//     } catch (error) {
//       setResponseMessage(<Alert severity="error">Error registering park</Alert>);
//       console.error("Error registering park:", error);
//     }
//   };

//   return (
//     <>
//       <FormContainer title="Park Registration" onSubmit={handleSubmit}>
//         {Object.keys(initialData).map((key) => (
//           <Grid item xs={12} key={key}>
//             {key === "description" ? (
//               <TextareaAutosize
//                 aria-label={`${key.charAt(0).toUpperCase() + key.slice(1)} Description`}
//                 name={key}
//                 minRows={4}
//                 placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} Description`}
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   borderRadius: 4,
//                   borderColor: "#c4c4c4",
//                   marginBottom: "16px",
//                 }}
//                 value={formData[key]}
//                 onChange={handleValueChange}
//               />
//             ) : key === "compound_boundary" ? (
//               <input
//                 type="file"
//                 accept=".shp"
//                 onChange={(e) => handleFileChange(e, "compound_boundary")}
//                 style={{ marginBottom: "16px", width: "100%" }}
//               />
//             ) : key === "center_of_park" ? (
//               <input
//                 type="file"
//                 accept=".shp"
//                 onChange={(e) => handleFileChange(e, "center_of_park")}
//                 style={{ marginBottom: "16px", width: "100%" }}
//               />
//             ) : (
//               <TextField
//                 label={key.charAt(0).toUpperCase() + key.slice(1)}
//                 variant="outlined"
//                 name={key}
//                 fullWidth={true}
//                 value={formData[key]}
//                 onChange={handleValueChange}
//                 sx={{ mb: 2 }}
//               />
//             )}
//           </Grid>
//         ))}
//         {responseMessage && (
//           <Grid item xs={12}>
//             {responseMessage}
//           </Grid>
//         )}
//       </FormContainer>
//     </>
//   );
// }

// export default RegisterPark;