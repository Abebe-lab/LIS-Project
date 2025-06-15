// import React, { useState, useEffect } from "react";
// import { TextField, Grid, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// import FormContainer from "../../../components/Forms/FormContainer";

// import useDecodedUser from "../../../services/hooks/useDecodedUser";
// import { ExecutePostWithParams } from "../../../services/api/ExecuteApiRequests";
// import { Navigate } from "react-router-dom";
// import { passwordRegex } from "../../../utils/SecurityRules";
// import { getCurrentDeviceInfo, generateDeviceId } from "../../../utils/DeviceHelper";

// const ChangePassword = () => {
//   const decodedUser = useDecodedUser();
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   useEffect(() => {
//     // Generate or retrieve device ID from localStorage
//     let deviceId = localStorage.getItem("device_id");
//     if (!deviceId) {
//       deviceId = generateDeviceId();
//       localStorage.setItem("device_id", deviceId);
//     }
//   }, []);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (newPassword === "" || confirmPassword === "") {
//       setErrorMessage("Please fill in all required fields.");
//       return; // Prevent further execution if fields are empty
//     } else if (newPassword !== confirmPassword) {
//       setErrorMessage("New passwords do not match.");
//       return;
//     } else if (currentPassword === "" && decodedUser.status === "active") {
//       setErrorMessage("Please enter current password first.");
//       return;
//     } else if (!passwordRegex.test(newPassword)) {
//       setErrorMessage(
//         "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
//       );
//       return;
//     } else if (newPassword === "P@ssw0rd") {
//       setErrorMessage(
//         "The password can't be the default password given by system administrator, Please change it first.",
//       );
//       return;
//     }

//     try {
//       const deviceInfo = getCurrentDeviceInfo(); // Get device information
//       const result = await ExecutePostWithParams(`users/${decodedUser.id}/changePassword`, {
//         userId: decodedUser.id,
//         currentPW: currentPassword,
//         newPW: newPassword,
//         deviceInfo,
//       });

//       if (result) {
//         console.log(result);
//         //Logout();
//         localStorage.removeItem("user-id");
//         localStorage.removeItem("token");
//         window.location.reload(false);
//         window.location.replace("/");
//         //setIsLoggedOut(true);

//         await ExecutePostWithParams("users/logout");
//         return <Navigate to="/" replace />;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const togglePasswordVisibility = field => {
//     setShowPassword(prevState => ({
//       ...prevState,
//       [field]: !prevState[field],
//     }));
//   };
//   return (
//     <>
//       {/*prettier-ignore*/}
//       <FormContainer title={decodedUser.status === "active" ? "Change Password" : "Re/Set Password"} onSubmit={handleSubmit} buttonLabel="Change Password">
//       <Grid item xs={3}>
//         <TextField id="id" label="ID" type="text" fullWidth={true} value={decodedUser && decodedUser.id} disabled />
//       </Grid>
//       <Grid item xs={9}>
//         {/*prettier-ignore*/}
//         <TextField id="full_name" label="Full Name" type="text" fullWidth={true} value={decodedUser && decodedUser.full_name} disabled />
//       </Grid>
//       <Grid item xs={12}>
//         {/*prettier-ignore*/}
//         <TextField id="username" label="Username" type="text" fullWidth={true} value={decodedUser.username} required />
//       </Grid>
//       <Grid item xs={12}>
        
//         <TextField id="current_password" label="Current Password"  type={showPassword.current ? "text" : "password"}
//                     value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} fullWidth={true}
//                     disabled={decodedUser.status === "NEW" || decodedUser.status === "RESET" ? true : false}
//                     InputProps={{
//                       endAdornment: (
//                         <IconButton onClick={() => togglePasswordVisibility('current')}>
//                           {showPassword.current ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       )
//                     }}
//                     />
//       </Grid>
//       <Grid item xs={12}>
//           <TextField 
//             id="new_password" 
//             label="New Password" 
//             type={showPassword.new ? "text" : "password"}
//             value={newPassword} 
//             onChange={(e) => setNewPassword(e.target.value)} 
//             fullWidth 
//             required 
//             InputProps={{
//               endAdornment: (
//                 <IconButton onClick={() => togglePasswordVisibility('new')}>
//                   {showPassword.new ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               )
//             }}
//           />
//         </Grid>
//       <Grid item xs={12}>
//           <TextField 
//             id="confirm_password" 
//             label="Confirm New Password" 
//             type={showPassword.confirm ? "text" : "password"}
//             value={confirmPassword} 
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//             fullWidth 
//             required 
//             InputProps={{
//               endAdornment: (
//                 <IconButton onClick={() => togglePasswordVisibility('confirm')}>
//                   {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               )
//             }}
//           />
//         </Grid>
//       {errorMessage && (
//         <Grid item xs={12}>
//           <p style={{ color: "red" }}>{errorMessage}</p>
//         </Grid>
//       )}
//     </FormContainer>
//     </>
//   );
// };

// export default ChangePassword;

import React, { useState, useEffect } from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormContainer from "../../../components/Forms/FormContainer";
import useDecodedUser from "../../../services/hooks/useDecodedUser";
import { ExecutePostWithParams } from "../../../services/api/ExecuteApiRequests";
import { Navigate } from "react-router-dom";
import { passwordRegex } from "../../../utils/SecurityRules";
import { getCurrentDeviceInfo, generateDeviceId } from "../../../utils/DeviceHelper";

const ChangePassword = ({ user }) => {
  const decodedUser = useDecodedUser(); // Always call useDecodedUser
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = generateDeviceId();
      localStorage.setItem("device_id", deviceId);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage("");

    if (newPassword === "" || confirmPassword === "") {
      setErrorMessage("Please fill in all required fields.");
      return;
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    } else if (currentPassword === "" && decodedUser?.status === "active") {
      setErrorMessage("Please enter current password first.");
      return;
    } else if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    } else if (newPassword === "P@ssw0rd") {
      setErrorMessage(
        "The password can't be the default password given by system administrator, Please change it first."
      );
      return;
    }

    try {
      const deviceInfo = getCurrentDeviceInfo();
      const result = await ExecutePostWithParams(`users/${decodedUser.id}/changePassword`, {
        userId: decodedUser.id,
        currentPW: currentPassword,
        newPW: newPassword,
        deviceInfo,
      });

      if (result) {
        console.log(result);
        localStorage.removeItem("user-id");
        localStorage.removeItem("token");
        window.location.reload(false);
        window.location.replace("/");
        await ExecutePostWithParams("users/logout");
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = field => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      <FormContainer title={decodedUser?.status === "active" ? "Change Password" : "Re/Set Password"} onSubmit={handleSubmit} buttonLabel="Change Password">
        <Grid item xs={3}>
          <TextField id="id" label="ID" type="text" fullWidth={true} value={decodedUser?.id} disabled />
        </Grid>
        <Grid item xs={9}>
          <TextField id="full_name" label="Full Name" type="text" fullWidth={true} value={decodedUser?.full_name} disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField id="username" label="Username" type="text" fullWidth={true} value={decodedUser?.username} required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="current_password"
            label="Current Password"
            type={showPassword.current ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth={true}
            disabled={decodedUser?.status === "NEW" || decodedUser?.status === "RESET"}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => togglePasswordVisibility('current')}>
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="new_password"
            label="New Password"
            type={showPassword.new ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => togglePasswordVisibility('new')}>
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="confirm_password"
            label="Confirm New Password"
            type={showPassword.confirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => togglePasswordVisibility('confirm')}>
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
          />
        </Grid>
        {errorMessage && (
          <Grid item xs={12}>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </Grid>
        )}
      </FormContainer>
    </>
  );
};

export default ChangePassword;