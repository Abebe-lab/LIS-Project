import { v4 as uuidv4 } from "uuid"; // Import UUID library
const generateDeviceId = () => {
  return uuidv4();
};
const getCurrentDeviceInfo = () => {
  return {
    deviceId: localStorage.getItem("device_id"),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
  };
};
export { generateDeviceId, getCurrentDeviceInfo };
