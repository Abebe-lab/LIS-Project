import { useState } from "react";
import {
	Home,
	Map,
	Report,
	Logout,
	SettingsAccessibility,
	AddBusiness,
	SwipeRight,
} from "@mui/icons-material";

import RootLayout from "../RootLayout";

const PromotionAndMarketingMenuItems = [
	{ key: "home", to: "/", title: "Home", iconClass: <Home /> },
	{ key: "prospectiveInvestor", to: "/prospectiveInvestor", title: "Prospective Investor", iconClass: <AddBusiness /> },
	{ key: "viewMapByCategory", to: "/viewMapByCategory", title: "Map By Category", iconClass: <Map /> },
	{ key: "viewReferredStatus", to: "/viewReferredStatus", title: "Referred Status", iconClass: <SwipeRight /> },
	{ key: "promReport", to: "/promReport", title: "Report", iconClass: <Report /> },
	{ key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
	{ key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function PromotionAndMarketingLayout() {
	const [open, setOpen] = useState(true);
	const [showProfile, setShowProfile] = useState(true);
	return (
		<RootLayout
			department="Promotion & Marketing"
			open={open}
			setOpen={setOpen}
			showProfile={showProfile}
			setShowProfile={setShowProfile}
			menuList={PromotionAndMarketingMenuItems}
		/>
	);
}