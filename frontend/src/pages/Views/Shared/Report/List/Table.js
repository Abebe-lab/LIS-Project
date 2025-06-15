import React, { useState, useEffect } from "react";
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";
//import {Table} from 'react-table';

const TableToShow = ({ searchTerm }) => {
  const [data, setData] = useState([]);
    //console.log(apiToCall);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData=await GetDataFromApiWithParams('parcels');
        
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData=await GetDataFromApiWithParams('parcels');
        
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const filteredData = data?.filter((item) => {
    return item?.upin?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  });

  return (
    <table border="true">
      <thead>
        <tr>
          <th>upin</th>
          <th>Block</th>
          <th>Name</th>
          <th>Type</th>
          <th>Planned Use</th>
          <th>Current Use</th>
          <th>No of Buildings</th>
          <th>Planned Buildings</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody style={{ background: "white" }}>
        {filteredData?.length>0 &&
          filteredData?.map((item) => (
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
          ))}
      </tbody>
    </table>
  );
};

export default TableToShow;
