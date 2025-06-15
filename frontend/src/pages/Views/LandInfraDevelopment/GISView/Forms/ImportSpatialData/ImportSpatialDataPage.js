import { useState } from "react";
import { DefaultMap } from "../../MapRelated/Views";
import { ExecutePostWithParams } from "../../../../../../services/api/ExecuteApiRequests";

const featureTypes = [
  { key: "PARK", label: "Park" },
  { key: "BLOCK", label: "Block" },
  { key: "PARCEL", label: "Parcel" },
  { key: "GREEN", label: "Green Area" },
  { key: "ROAD", label: "Road" },
  { key: "GPX", label: "GPS exchange format" },
  { key: "GCP", label: "Ground Control Point" },
  { key: "Electric", label: "Electric" },
  { key: "Telephone", label: "Telephone" },
  { key: "Water", label: "Water" },
  { key: "INFRA", label: "Other Infrastructure" },
];

export default function ImportSpatialDataPage() {
  const [selectedFeature, setSelectedFeature] = useState(featureTypes[0]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileInput = document.getElementById("file_name");
      if (fileInput.files.length === 0) {
        setResponseMessage("No file chosen, Please first select file!");
        return;
      }
      const formData = new FormData();
      console.log("selected feature : " + selectedFeature.label);
      formData.append("file", fileInput.files[0]);
      const ft_type = document.getElementById("featureType").value;
      formData.append("shape_type", ft_type);
      const responseData=await ExecutePostWithParams("upload", formData, true);
      console.log(responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      setResponseMessage("An error occurred: " + error.message);
      console.log(error);
    }
  };
  const handleShapefileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  return (
    <div>
      <div className="floating-form shadow-lg d-flex flex-column">
        <form onSubmit={handleSubmit} method="post">
          <div>
            <div className="form-title">Feature to Import</div>
            <label>
              <div className="p-2">Feature to Import</div>
            </label>
            <select
              id="featureType"
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
            >
              {featureTypes.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.label}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={handleShapefileChange}
              id="file_name"
              name="file_name"
              className=""
              accept=".shp,.zip"
              required
            />
            <div className="d-grid gap-4">
              <button
                type="submit"
                className="btn btn-primary decorated-button shadow-lg"
                onClick={handleSubmit}
              >
                Import Features
              </button>
            </div>
          </div>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
      <div>
        <DefaultMap />
      </div>
    </div>
  );
}
//import shp from 'shpjs';

//import DefaultMap from '../MapRelated/DefaultMap';
//import {loadPark,loadBlocks,loadParcels,loadInfrastructure,loadRoads} from '../MapRelated/MapDataLoader';
