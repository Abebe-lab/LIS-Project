import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid, Dialog, DialogContent, IconButton, Typography, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";
import config from "../../../../config";
import IPDCLogsTable from "../Logs/IPDCLogsTable";

export default function MyActivities() {
  const navigate = useNavigate();
  const decodedUser = useDecodedUser();
  const [imgNew, setImgNew] = useState("");
  const [open, setOpen] = useState(true);
  //const [activities, setActivities] = useState([]);
  useEffect(() => {
    try {
      setImgNew(
        `${config.apiUrl}/uploads/profilePicture/${encodeURIComponent(
          decodedUser?.profile_picture?.split("/")?.pop(),
        )}`,
      );
    } catch (err) {
      console.log(err);
    }
  }, [decodedUser]);
  /*useEffect(() => {
    const fetchActivities = async () => {
      setActivities(["activities", "will be", "implemented", "in", "future!"]);
    };
    fetchActivities();
  }, []);*/
  const handleClose = () => {
    setOpen(true);
    navigate("/");
  };

  const profileContent = (
    <DialogContent sx={{ margin: 0, padding: 0 }}>
      <Grid container spacing={2} >
        <Grid item xs={6} container alignItems="center" justify="center">
          <Avatar src={imgNew && imgNew} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={6} alignContent={"center"}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            My Activities
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: 0, padding: 0 }}>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <IPDCLogsTable userId={decodedUser?.id} />
          </div>
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
