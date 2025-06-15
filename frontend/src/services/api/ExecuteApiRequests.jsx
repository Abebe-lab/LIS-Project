import axios from "axios";
import config from "../../config";

const AuthorizationInfo = `Bearer ${localStorage.getItem("token")}`;

const ExecuteApiToPost = async (targetPoint, formData) => {
  try {
    const response = await axios.post(`${config.apiUrl}/${targetPoint}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        deviceId: localStorage?.getItem("device_id"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
async function ExecutePostWithParams(targetPoint, params = {}, withAttachment = false) {
  try {
    //console.log("[started exexcution] of : ", targetPoint, params, withAttachment);
    //if(!localStorage.getItem("token") || targetPoint==="users/login"){
    const result = await axios.post(`${config.apiUrl}/${targetPoint}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": withAttachment ? "multipart/form-data" || "application/json" : "application/json",
        deviceId: localStorage?.getItem("device_id"),
      },
    });
    console.log(result.data);
    return result.data;
    //}
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function ExecutePostWithParamsWithErrMsg(targetPoint, params = {}, withAttachment = false, setError = null) {
  try {
    //console.log("[started exexcution] of : ", targetPoint, params, withAttachment);
    //if(!localStorage.getItem("token") || targetPoint==="users/login"){
    const result = await axios.post(`${config.apiUrl}/${targetPoint}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": withAttachment ? "multipart/form-data" || "application/json" : "application/json",
        deviceId: localStorage?.getItem("device_id"),
      },
    });
    return result.data;
    //}
  } catch (err) {
    console.log(err);
    err && setError(err?.response?.data?.message || err?.response?.data);
    return null;
  }
}
async function GetDataFromApiWithParams(targetPoint, params = {}) {
  try {
    if (params) {
      const result = await axios.get(`${config.apiUrl}/${targetPoint}`, params, {
        params: params || {},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          deviceId: localStorage?.getItem("device_id"),
        },
      });
      return result.data;
    } else {
      const result = await axios.get(`${config.apiUrl}/${targetPoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          deviceId: localStorage?.getItem("device_id"),
        },
      });
      return result.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function GetDataFromApiWithParamsAndGetResponse(targetPoint, params = {}) {
  try {
    if (params) {
      const result = await axios.get(`${config.apiUrl}/${targetPoint}`,params, {
        params: params || {},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          deviceId: localStorage?.getItem("device_id"),
        },
      });
      return result;
    } else {
      const result = await axios.get(`${config.apiUrl}/${targetPoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          deviceId: localStorage?.getItem("device_id"),
        },
      });
      return result;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}
const UpdateAndGetResponse = async (targetPoint, params = {}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle error: token not found
      return;
    }
    const headerInfo = {
      Authorization: AuthorizationInfo || `Bearer ${localStorage.getItem("token")}`,
      deviceId: localStorage?.getItem("device_id"),
    };
    if (params) {
      const result = await axios.put(`${config.apiUrl}/${targetPoint}`, params, {
        headers: headerInfo,
      });
      return result.data;
    } else {
      const result = await axios.put(`${config.apiUrl}/${targetPoint}`, {
        headers: headerInfo,
      });
      return result.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const DeleteAndGetResponse = async (targetPoint, params = {}) => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.delete(`${config.apiUrl}/${targetPoint}`, params, {
      params: params || {},
      headers: {
        Authorization: `Bearer ${token}`,
        deviceId: localStorage?.getItem("device_id"),
      },
    });
    alert("Saved" + result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const DownloadFileFromServer = async url => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${config.apiUrl}/${url}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      deviceId: localStorage?.getItem("device_id"),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export {
  ExecuteApiToPost,
  ExecutePostWithParams,
  GetDataFromApiWithParams,
  UpdateAndGetResponse,
  DeleteAndGetResponse,
  GetDataFromApiWithParamsAndGetResponse,
  ExecutePostWithParamsWithErrMsg,
  DownloadFileFromServer,
};
