import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton, Badge, Container } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { GetUnreadMessagesCount,UpdateMessagesAsSeen } from "../../pages/Views/Shared/CommonData/CommonData";
import useDecodedUser from "../../services/hooks/useDecodedUser";

export default function IPDCNotification() {
  const decodedUser = useDecodedUser();
  const [noOfMessages, setNoOfMessages] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMessage = async () => {
      const count = await GetUnreadMessagesCount({ userId: decodedUser?.id });
      setNoOfMessages(count);
    };
    fetchMessage();
  }, [decodedUser]);
  const handleNotificationClick = async () => {
    try {
      if (decodedUser?.id) {
        // Update message status as seen
        if(noOfMessages>0){
          await UpdateMessagesAsSeen({ userId: decodedUser.id });
          setNoOfMessages(0);
        }
        // Redirect to /viewMessageList
        navigate("/viewMessageList");
      }
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };
  return (
    <Container>
        <IconButton size="large" aria-label="show new notifications" color="inherit"  onClick={handleNotificationClick}>
          <Badge badgeContent={noOfMessages} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
    </Container>
  );
}
