import React, { useState, useEffect } from "react";
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

const TableToShow = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const apiToCall = ""; // + "/getParcels", parameterValues
  console.log(apiToCall);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GetDataFromApiWithParams("parcels");
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const filteredData = data.filter((item) => {
    return item.upin.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <table border="true">
      <thead>
        <tr>
          <th>Permit Number</th>
          <th>Planned Function</th>
          <th>Issued Date</th>
          <th>Completion Date</th>
          <th>Planned Buildings</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody style={{ background: "white" }}>
        <tr>
          <td>no permit issued</td>
        </tr>
      </tbody>
      {/*filteredData.map((item) => (
          <tr key={item.upin}>
            <td>{item.upin}</td>
            <td>{item.block_no}</td>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.planned_function}</td>
            <td>{item.current_function}</td>
            <td>{item.no_of_buildings}</td>
            <td>{item.no_of_planned_buildings}</td>
            <td>{item.description}</td>
          </tr>
        ))*/}
    </table>
  );
};

export default TableToShow;
