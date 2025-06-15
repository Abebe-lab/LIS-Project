import React, { useState, useEffect } from "react";
import IPDCFormHeader from "../../../../components/Forms/IPDCFormHeader";
import { Factory } from "@mui/icons-material";
import {
  SquareChartContainer,
  IPDCPieChart,
} from "../../../../components/Charts";
import { Grid } from "@mui/material";

import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

const transformParkData = (data) => {
  // Create an empty object to store parks by their ID
  const parkMap = {};

  // Loop over the data
  data.forEach((item) => {
    const { park_id, park_name, category, count } = item;

    // If the park_id doesn't exist in the map, initialize it
    if (!parkMap[park_id]) {
      parkMap[park_id] = {
        park_id,
        park_name,
        detail: [],
      };
    }

    // Push the category and count into the details array of the park
    parkMap[park_id].detail.push({
      category,
      count: parseInt(count, 10), // Ensure count is a number
    });
  });

  // Return the values of the parkMap as an array
  return Object.values(parkMap);
};

const ParksDetailBySector = () => {
  //const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [transformedData, setTransformedData] = useState([]);

  // Transform the data to strip park_name and park_id, and group by category with the sum of counts

  useEffect(() => {
    const fetchParkBySector = async () => {
      setIsLoading(true);
      try {
        const tempOcc = await GetDataFromApiWithParams("dashboard/executives/parkBySectorDetail");
        console.log(tempOcc);
        if (tempOcc) {
          const transformedData = transformParkData(tempOcc);
          setTransformedData(transformedData);
          console.log("transformend");
          console.log(transformedData);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchParkBySector();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <IPDCFormHeader title={"Park by Sector"} />
      </Grid>
      {(transformedData && transformedData.length > 0) &&
        transformedData?.map((eachparkData) => {
          console.log(eachparkData);
          return (
            <Grid item xs={12} md={6} key={eachparkData.park_id}>
              <SquareChartContainer
                THECHART={
                  eachparkData.detail && (
                    <IPDCPieChart
                      data={
                        eachparkData.detail &&
                        eachparkData.detail.filter(
                          (item) => item.category !== "Total Parcels"
                        )
                      }
                      showButton={false}
                      nameKey="category"
                      dataKey="count"
                      withHole={true}
                      showLabel={true}
                    />
                  )
                }
                title={eachparkData.park_name}
                showMoreButton={false}
                avatar={<Factory />}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ParksDetailBySector;
