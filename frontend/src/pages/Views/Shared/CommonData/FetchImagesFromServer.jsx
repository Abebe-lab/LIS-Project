import { Avatar } from "@mui/material";
import config from "../../../../config";

const UserWithAvatar = ({ profile_picture = "", alternativeText }) => {
  if (!profile_picture) return <Avatar alt={alternativeText} />;

  const pictureFileName = typeof profile_picture === "string" ? profile_picture.split("/").pop() : profile_picture;
  
  return (
    <Avatar
      src={pictureFileName && `${config.apiUrl}/uploads/profilePicture/${encodeURIComponent(pictureFileName)}`}
      alt={alternativeText}
    />
  );
};

export { UserWithAvatar };
