//import getMAC from "getmac";
import { v4 as uuidv4 } from "uuid";
import { openDB } from "idb";

const generateDeviceUUIDFile = () => {
  const uuid = uuidv4();
  const fileContent = new Blob([uuid], { type: "text/plain" });
  const url = URL.createObjectURL(fileContent);

  // Create a link element for file download
  const link = document.createElement("a");
  link.href = url;
  link.download = "ipdc_device_uuid.txt";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return uuid;
};

const readDeviceUUIDFile = () => {
  const theUUID = null;
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt";
  fileInput.click();

  return theUUID;
};
const storeUUIDInIndexedDB = async uuid => {
  if (!("indexedDB" in window)) {
    console.error("This browser doesn't support IndexedDB");
    return;
  }

  const db = await openDB("DeviceDB", 1, {
    upgrade(db) {
      db.createObjectStore("DeviceStore");
    },
  });

  await db.put("DeviceStore", uuid, "deviceUUID");
  db.close();
};

const getUUIDFromIndexedDB = async () => {
  const db = await openDB("DeviceDB", 1);
  const uuid = await db.get("DeviceStore", "deviceUUID");
  db.close();
  return uuid;
};
const initializeDeviceUUID = async () => {
  let deviceUUID = await getUUIDFromIndexedDB();

  if (!deviceUUID) {
    // Generate a new UUID and store it
    deviceUUID = uuidv4();
    await storeUUIDInIndexedDB(deviceUUID);
  }

  return deviceUUID;
};

export default {
  generateDeviceUUIDFile,
  readDeviceUUIDFile,
  initializeDeviceUUID,
  storeUUIDInIndexedDB,
  getUUIDFromIndexedDB,
};
