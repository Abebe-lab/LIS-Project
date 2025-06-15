import { useState } from "react";
import {
	Home,
	Map,
	Calculate,
	ReceiptLong,
	Report,
	Logout,
	SettingsAccessibility,
	Pause,
} from "@mui/icons-material";

import RootLayout from "../RootLayout";

const ExecMenuItems = [
	{ key: "home", to: "/", title: "Home", iconClass: <Home /> },
	{ key: "placeOnHold", to: "/placeOnHold", title: "Reserve Parcel", iconClass: <Pause /> },
	{ key: "execActivities", to: "/execActivities", title: "Investor Activities", iconClass: <ReceiptLong /> },
	{ key: "execFinance", to: "/investorsList", title: "Investors List", iconClass: <Calculate /> },
	{ key: "viewMapByCategory", to: "/viewMapByCategory", title: "Map By Category", iconClass: <Map /> },
	{ key: "execReport", to: "/execReport", title: "Report", iconClass: <Report /> },
	/*{ 
		key: "execRuleSettings", to: "/execRuleSettings", title: "Rule Settings", iconClass: <Settings /> 
	},*/
	{ key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
	{ key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function EICLayout() {
	const [open, setOpen] = useState(true);
	const [showProfile, setShowProfile] = useState(true);
	return (
		<RootLayout
			department="Executives"
			open={open}
			setOpen={setOpen}
			showProfile={showProfile}
			setShowProfile={setShowProfile}
			menuList={ExecMenuItems}
		/>
	);
}