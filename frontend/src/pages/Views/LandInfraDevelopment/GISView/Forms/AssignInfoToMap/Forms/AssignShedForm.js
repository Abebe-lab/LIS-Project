import React, { useEffect, useState } from "react";
import Select from "ol/interaction/Select";
import { UpdateAndGetResponse } from "../../../../../../../services/api/ExecuteApiRequests";

const types = [
  { key: "SHED", label: "SHED" },
  { key: "PARCEL", label: "PARCEL" },
];
const AssignShedForm = React.forwardRef(({ props, mapRef, handleChangeForm }, ref) => {
  //console.log(ref);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [parkId, setParkId] = useState("");
  const [blockNo, setBlockNo] = useState("");
  const [upin, setUpin] = useState("");
  const [name, setName] = useState("");
  const [plannedFunction, setPlannedFunction] = useState("");
  const [currentFunction, setCurrentFunction] = useState("");
  const [description, setDescription] = useState("");
  const [parcelType, setParcelType] = useState("");
  const [noOfBuildings, setNoOfBuildings] = useState(null);
  const [noOfPlannedBuildings, setNoOfPlannedBuildings] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const [featureType, setFeatureType] = useState("PARCEL");
  const handleFeatureSelect = () => {
    try {
      //              document.getElementById('featureType').value='BLOCK';
      //handleChangeForm();
      console.log("feature type: " + document.getElementById("featureType")?.value);
      setFeatureType(document.getElementById("featureType")?.value);
      if (featureType !== "PARCEL") {
        return;
      } else {
        if (mapRef) {
          console.log("select started");
          const select = new Select({
            multi: false,
          });

          mapRef.current.addInteraction(select);
          //select
          select.on("select", (evt) => {
            if (evt.selected) {
              console.log(evt.selected[0].getProperties());
              if (document.getElementById("upin")) {
                setParkId("BL");
                setBlockNo(evt.selected[0]?.getProperties()?.block_no);
                setUpin(evt.selected[0]?.getProperties()?.upin);
                //setName(evt.selected[0]?.getProperties()?.name);
                setName(
                  evt.selected[0]?.getProperties()?.name === "N/A"
                    ? "Enter Parcel Name"
                    : evt.selected[0]?.getProperties()?.name,
                );
                setPlannedFunction(evt.selected[0]?.getProperties()?.planned_for);
                setCurrentFunction(evt.selected[0]?.getProperties()?.current_function);
                setDescription(evt.selected[0]?.getProperties()?.description);
                setParcelType(evt.selected[0]?.getProperties()?.type);
                setNoOfBuildings(evt.selected[0]?.getProperties()?.no_of_buildings);
                setNoOfPlannedBuildings(evt.selected[0]?.getProperties()?.no_of_planned_buildings);
              }
              setSelectedFeatures((prev) => [...prev, ...evt.selected]);
            }
          });
          //deselect
          select.on("deselect", (evt) => {
            setUpin("");
            setName("");
            setDescription("");
            const unselectedIds = evt.deselected.map((feat) => feat?.getId());
            setSelectedFeatures((prev) => {
              return prev.filter((id) => !unselectedIds.includes(id));
            });
          });
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleFeatureSelect();
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiToCall = "addParcelInfo";
    const parameterValues = {
      upin: upin,
      name: name,
      planned_for: plannedFunction,
      current_function: currentFunction,
      type: parcelType,
      no_of_planned_buildings: noOfPlannedBuildings,
      no_of_buildings: noOfBuildings,
      description: description,
    };

    const response = await UpdateAndGetResponse(apiToCall, parameterValues);
    if (response.status === 201) {
      setResponseMessage("Registration successful!");
    } else {
      setResponseMessage("Registration failed: " + response);
    }
  };

  return (
    <div className="form-section">
      <form onSubmit={handleSubmit}>
        <div className="form-title">Parcel Info</div>
        <div className="row mb-0">
          <div className="col-6 mb-0">
            <input
              className="form-control input-sm"
              type="text"
              id="parkId"
              value={parkId}
              onChange={(e) => setParkId(e.target.value)}
              placeholder="Park Id"
              required
              disabled
            />
          </div>
          <div className="col-6 mb-0">
            <input
              className="form-control input-sm "
              type="text"
              id="blockNo"
              value={blockNo}
              onChange={(e) => setBlockNo(e.target.value)}
              placeholder="Block No"
              required
              disabled
            />
          </div>
        </div>
        <input
          className="form-control input-sm  mb-0"
          type="text"
          id="upin"
          value={upin}
          onChange={(e) => setUpin(e.target.value)}
          placeholder="UPIN"
          required
          disabled
        />

        <input
          className="form-control input-sm  mb-0"
          type="text"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="form-control input-sm  mb-0"
          type="text"
          id="plannedFor"
          value={plannedFunction}
          onChange={(e) => setPlannedFunction(e.target.value)}
          placeholder="Planned Function"
          required
        />
        <input
          className="form-control input-sm  mb-0"
          type="text"
          id="currentFunction"
          value={currentFunction}
          onChange={(e) => setCurrentFunction(e.target.value)}
          placeholder="Current Function"
          required
        />
        <select className="form-select  mb-0" id="type" value={parcelType} onChange={(event) => setParcelType(event)}>
          {types.map((rg) => (
            <option key={rg.key} value={rg.key}>
              {rg.label}
            </option>
          ))}
        </select>
        <input
          className="form-control input-sm  mb-0"
          type="number"
          id="NoOfBuildings"
          value={noOfBuildings}
          onChange={(e) => setNoOfBuildings(e.target.value)}
          placeholder="Number of buildings"
          min={0}
          required
        />
        <input
          className="form-control input-sm  mb-0"
          type="number"
          id="NoOfPlannedBuildings"
          value={noOfPlannedBuildings}
          onChange={(e) => setNoOfPlannedBuildings(e.target.value)}
          placeholder="Number of Planned buildings"
          min={0}
          required
        />
        <textarea
          className="form-control input-sm  mb-0"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="d-grid gap-4 mb-0">
          <button type="submit" className="btn btn-primary decorated-button shadow-lg">
            Assign Info
          </button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
});
export default AssignShedForm;
