import { GetDataFromApiWithParams, UpdateAndGetResponse } from "../../../../services/api/ExecuteApiRequests";

const GetParks = async () => {
  try {
    const parksData = await GetDataFromApiWithParams("parks");
    return parksData || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetConsultants = async () => {
  try {
    const consultantsData = await GetDataFromApiWithParams("consultants");
    return consultantsData || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetContractors = async () => {
  try {
    const contractorsData = await GetDataFromApiWithParams("contractors");
    return contractorsData || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const GetDepartments = async () => {
  try {
    const departmentData = await GetDataFromApiWithParams("departments");
    return departmentData || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetInvestors = async () => {
  try {
    const investorData = await GetDataFromApiWithParams("investors");
    return investorData || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetInvestorsByParkAndSector = async () => {
  try {
    const department = "shared";
    const reportType = "investorsByParkAndSector";
    const investorData = await GetDataFromApiWithParams(`reports/${department}/reportType/${reportType}`);
    return investorData || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const GetParcelsInPark = async (parkId, withSpatialData = true) => {
  try {
    const parcelsInPark = await GetDataFromApiWithParams(`parcelsInPark/${parkId}`, { id: parkId });
    if (parcelsInPark) {
      if (!withSpatialData) {
        return parcelsInPark.map((parcel) => {
          const { boundary, ...parcelWithoutBoundary } = parcel;
          return parcelWithoutBoundary;
        });
      }
      return parcelsInPark;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetAgreementsInPark = async (parkId) => {
  try {
    const parcelsInPark = await GetDataFromApiWithParams(`agreements/${parkId}`, { id: parkId });
    return parcelsInPark;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetAvailableParcelsInPark = async (parkId, withSpatialData = true) => {
  try {
    const parcelsInPark = await GetDataFromApiWithParams(`availableParcelsInPark/${parkId}`, { id: parkId });
    if (parcelsInPark) {
      if (!withSpatialData) {
        return parcelsInPark.map((parcel) => {
          const { boundary, ...parcelWithoutBoundary } = parcel;
          return parcelWithoutBoundary;
        });
      }
      return parcelsInPark;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetUsers = async () => {
  try {
    const data = await GetDataFromApiWithParams("users");
    if (data) return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetCurrentUserMessage = async ({ userId }) => {
  try {
    const data = await GetDataFromApiWithParams(`messages/reciever/${userId}`);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
    // return error.message;
  }
};
const GetUnreadMessagesCount = async ({ userId }) => {
  try {
    const data = await GetCurrentUserMessage({ userId: userId });
    //console.log(data);
    if (data) {
      const unreadCount = data?.filter((message) => message?.status !== "Seen")?.length;
      return unreadCount;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};
const UpdateMessagesAsSeen=async ({userId})=>{
  try {
    const updated=await UpdateAndGetResponse(`messages/${userId}/updateAllAsSeen`);
    return updated;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const GetCurrentUserOutboxMessage = async ({ userId }) => {
  try {
    //console.log("User ID: ",userId);
    const data = await GetDataFromApiWithParams(`messages/sender/${userId}`);
    //console.log("data: ", data)
    return data||[];
  } catch (error) {
    console.log(error);
    return null;
  }
};
const GetAgreements = async (parkId = false) => {
  try {
    const agreementsData = parkId
      ? await GetDataFromApiWithParams(`agreements/inPark/${parkId}`)
      : await GetDataFromApiWithParams("agreements");
    return agreementsData || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export {
  GetDepartments,
  UpdateMessagesAsSeen,
  GetCurrentUserMessage,
  GetUnreadMessagesCount,
  GetCurrentUserOutboxMessage,
  GetInvestors,
  GetInvestorsByParkAndSector,
  GetParcelsInPark,
  GetAvailableParcelsInPark,
  GetParks,
  GetUsers,
  GetConsultants,
  GetContractors,
  GetAgreements,
  GetAgreementsInPark,
};

