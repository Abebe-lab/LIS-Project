import { useState, useEffect } from "react";
import config from "../../../../config";
import { Alert, Grid, Dialog, DialogContent, IconButton, Typography, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate();
  const decodedUser  = useDecodedUser();
  const [imgNew, setImgNew] = useState(
    `${config.apiUrl}/uploads/profilePicture/${encodeURIComponent(decodedUser?.profile_picture?.split("/")?.pop())}`
  );
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(true);
    navigate("/");
  };
  useEffect(() => {
    try {
      setImgNew(
        `${config.apiUrl}/uploads/profilePicture/${encodeURIComponent(decodedUser?.profile_picture?.split("/")?.pop())}`
      );
    } catch (err) {
      console.log(err);
    }
  }, [decodedUser]);
  
  const profileContent = (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            My Profile
          </Typography>
        </Grid>
        <Grid item xs={4} container alignItems="center" justify="center">
          <Avatar src={imgNew && imgNew} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">Id: {decodedUser && decodedUser.id}</Typography>
          <Typography variant="body1">Name: {decodedUser && (decodedUser.title+'. '+decodedUser.full_name)}</Typography>
          <Typography variant="body1">Email: {decodedUser && decodedUser.email}</Typography>
          <Typography variant="body1">Department: {decodedUser.department_id}</Typography>
          <Typography variant="body1">Username: {decodedUser.username}</Typography>
        </Grid>
      </Grid>
    </DialogContent>
  );

  return (
    <>
      {profileContent && (
        <Dialog open={open}>
          <Alert
            severity="info"
            open={open}
            onClose={handleClose}
            action={
              <IconButton aria-label="close" edge="end" size="small" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            }
          >
            {profileContent}
          </Alert>
        </Dialog>
      )}
    </>
  );
}
