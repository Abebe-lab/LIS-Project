import { useEffect, useState } from "react";
import { Tooltip, IconButton, Avatar, Badge, styled } from "@mui/material";
import useDecodedUser from "../../services/hooks/useDecodedUser";
import config from "../../config";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function IPDCProfileAvatar({ setAnchorElUser }) {
  const decodedUser = useDecodedUser();
  const [imgNew, setImgNew] = useState(null);
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    const initiateUser = async () => {
      try {
        if (decodedUser) {
          setFullName(`${decodedUser?.full_name?.split(" ")[0][0]}${decodedUser?.full_name?.split(" ")[1][0]}`);
          if (decodedUser?.profile_picture) {
            const theImage = `${config?.apiUrl}/uploads/profilePicture/${encodeURIComponent(
              decodedUser?.profile_picture?.split("/")?.pop(),
            )}`;
            setImgNew(theImage);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    initiateUser();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Tooltip title="Settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
          <Avatar src={imgNew && imgNew} alt={fullName && fullName} />
        </StyledBadge>
      </IconButton>
    </Tooltip>
  );
}
