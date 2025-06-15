import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { GetDepartments } from "../CommonData/CommonData";

export default function DepartmentList({
  selectedDepartment,
  setSelectedDepartment,
}) {
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepartmentData(await GetDepartments());
    };
    fetchDepartments();
  }, []);

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = e.target.value;
    const selectedDepartment = departmentData.find(
      (dept) => dept.id === selectedDepartmentId
    );
    setSelectedDepartment(selectedDepartment);
  };
  return (
    <>
      {departmentData && departmentData.length > 0 && (
        <FormControl fullWidth={true}>
          <InputLabel id="department-label">Select Department</InputLabel>
          <Select
            labelId="department-label"
            id="department"
            color="info"
            value={selectedDepartment ? selectedDepartment.id : ""}
            onChange={handleDepartmentChange}
            fullWidth={true}
          >
            {(departmentData &&
              departmentData.length > 0) &&
              departmentData?.map((dept) => (
                <MenuItem key={dept?.id} value={dept?.id}>
                  {dept?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
