//import { useState,useEffect } from 'react';
import CustomUserProfile from "../../../components/shared/UserProfile/CustomUserProfile";
import CustomCard from "../../../components/shared/Card/CustomCard";
import "./ExecutiveDashboard.css";
import PieChart from "../../../components/shared/Chart/CustomPieChart";
import LineChart from "../../../components/shared/Chart/CustomLineChart";
import useDecodedUser from "../../../services/hooks/useDecodedUser";

export default function PMODashboard() {
  const decodedUser = useDecodedUser();
  const handleClick = () => {
    console.log("clicked");
    return;
  };
  return (
    <div className="container1">
      <CustomUserProfile isOnline={"yes"} />
      <div className="dashboard-container">
        <div className="grid-empty1" />
        <div className="dashboard-title">Executive Dashboard</div>
        {decodedUser && <div className="dashboard-welcome">Welcome back, {decodedUser && decodedUser.full_name}</div>}
        <div className="grid-empty2" />
        <div className="grid-first-cards">
          <LineChart
            chartTitle="Weekly Referred"
            variableLabels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            variableValues={[6, 9, 7, 1, 12, 5]}
          />
          <CustomCard
            className="grid-item4"
            title="Reference from EIC"
            body="Reference from EIC"
            imgSource=""
            type="SMALL"
            onClick={handleClick}
            showButton={false}
          />
        </div>
        <div className="grid-empty3" />
        <div className="grid-second-title">General Summary</div>
        <div className="grid-second-cards">
          {/*<CustomCard className='grid-item4' title="Park by Land Occupancy" body="the thing is 4" imgSource="" commandMessage="View Detail" type="SMALL" onClick={handleClick}  showButton={false}/>*/}
          <PieChart chartTitle="Park by Land Occupancyy" variableLabels={["Vacant", "Occupied"]} variableValues={[50, 50]} />
          <PieChart
            chartTitle="Park by Sector"
            variableLabels={["manufact", "text", "cement"]}
            variableValues={[100, 150, 200]}
          />
          {/*<CustomCard className='grid-item5' title="Park by Sector" body="the thing is 5" imgSource="" commandMessage="View Detail" type="SMALL" onClick={handleClick}  showButton={false}/>*/}
          <CustomCard
            className="grid-item6"
            title="Summary"
            body="Summary of activities"
            imgSource=""
            commandMessage="View Detail"
            type="SMALL"
            onClick={handleClick}
            showButton={false}
          />
        </div>
        <div className="grid-empty4" />
      </div>
    </div>
  );
}
