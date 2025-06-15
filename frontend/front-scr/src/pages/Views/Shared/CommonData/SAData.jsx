import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

const GetSystemLog = async () => {
  try {
    const responseData = await GetDataFromApiWithParams(`systemLog`);
    return responseData || null;
  } catch (error) {
    console.error("Error fetching system log:", error);
  }
};

const GetActivities = async () => {
  try {
    const responseData = await GetDataFromApiWithParams(`activities`);
    return responseData || null;
  } catch (error) {
    console.error("Error fetching parks:", error);
  }
};

export { GetSystemLog, GetActivities };
