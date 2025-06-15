import React from "react";
import { Route } from "react-router-dom";

import SystemAdminDashboard from "../../../pages/Views/SystemAdminView/SystemAdminDashboard";
import RegistrationPage from "../../../pages/Views/SystemAdminView/Forms/RegistrationPage";
import {
	RegisterDepartment,
	SystemAccess,
} from "../../../pages/Views/SystemAdminView/Forms/Department/RegisterDepartment";
import DepartmentList from "../../../pages/Views/SystemAdminView/Reports/DepartmentList";
import SystemLogSummary from "../../../pages/Views/SystemAdminView/Reports/SystemLogSummary";
import ActivateOrDeactivateAccount from "../../../pages/Views/SystemAdminView/Forms/ActivateOrDeactivateAccount";
import UserManagementPage from "../../../pages/Views/SystemAdminView/Forms/UserManagementPage";

import SystemConfiguration from "../../../pages/Views/SystemAdminView/Forms/SystemConfiguration";
import AuditLog from "../../../pages/Views/SystemAdminView/Reports/AuditLog";
import SystemHealth from "../../../pages/Views/SystemAdminView/Reports/SystemHealth";
import SystemAdminReport from "../../../pages/Views/SystemAdminView/Reports/SystemAdminReport";

export default function SystemAdminRoutes() {
	return (
		<>
			<Route path="/" element={<SystemAdminDashboard />} />
			<Route path="/registerUser" element={<RegistrationPage />} />
			<Route path="/registerDepartment" element={<RegisterDepartment />} />
			<Route path="/listDepartment" element={<DepartmentList />} />
			<Route path="/activateDeactivateUser" element={<ActivateOrDeactivateAccount />} />
			<Route path="/system-access" element={<SystemAccess />} />
			<Route path="/systemLog" element={<SystemLogSummary />} />
			<Route path="/userManagement" element={<UserManagementPage />} />
			<Route path="/systemConfig" element={<SystemConfiguration />} />
			<Route path="/auditLog" element={<AuditLog />} />
			<Route path="/systemHealth" element={<SystemHealth />} />
			<Route path="/systemAdminReport" element={<SystemAdminReport />} />
		</>
	);
}
