import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
const GetBuildingPermitsReport = async () => {
  try {
    return await GetDataFromApiWithParams(`buildingPermits/report`);
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetOccupancyPermits = async () => {
  try {
    return await GetDataFromApiWithParams(`occupancyPermits`);
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { GetBuildingPermitsReport ,GetOccupancyPermits};
