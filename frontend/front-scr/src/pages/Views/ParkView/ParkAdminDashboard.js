import CustomUserProfile from "../../../components/shared/UserProfile/CustomUserProfile";
import CustomCard from "../../../components/shared/Card/CustomCard";
import "./SADashboard.css";
import MultiLineChart from "../../../components/shared/Chart/CustomMultiLineChart";
import PieChart from "../../../components/shared/Chart/CustomPieChart";
import useDecodedUser from "../../../services/hooks/useDecodedUser";
import { NavLink } from "react-router-dom";

const ParkAdminDashboard = () => {
	const decodedUser  = useDecodedUser();	

	const handleClick = () => {
		console.log("clicked");
		return;
	};
	return (
		<div className="container1">
			<CustomUserProfile isOnline={"yes"} />
			<div className="dashboard-container">
				<div className="grid-empty1" />
				<div className="dashboard-title">Park Admin Dashboard</div>
				<div className="dashboard-welcome">Welcome back, {decodedUser && decodedUser.full_name}</div>
				<div className="grid-empty2" />
				<div className="grid-first-cards">
					{/*<MultiLineChart chartTitle="Requested/Returned Plots"/>*/}
					<CustomCard className="grid-item3" title="Investor List" imgSource="" type="SMALL" onClick={handleClick} />
					<CustomCard className="grid-item3" title="Agreement List" imgSource="" type="SMALL" onClick={handleClick} />
					<CustomCard
						className="grid-item3"
						title="Investor Activities"
						imgSource=""
						type="SMALL"
						onClick={handleClick}
					/>
				</div>
				<div className="grid-empty3" />
				<div className="grid-second-title">
					Messages{" "}
					<NavLink
						to={"/sendMessage"}
						style={{ position: "relative", left: "25rem", backgroundColor: "orange" }}
						className="btn btn-primary"
					>
						Send Message
					</NavLink>
				</div>
				<div className="grid-second-cards">
					<CustomCard
						className="grid-item6"
						type="LARGE"
						title="Messages"
						body="List of activities"
						imgSource=""
						commandMessage="Activity List"
						onClick={handleClick}
						showButton={false}
					/>
					{/*<CustomCard className='grid-item6' type="SMALL" title="Configuration" body="List of activities" imgSource="" commandMessage="Activity List" onClick={handleClick}  showButton={false}/>*/}
				</div>
				<div className="grid-empty4" />
			</div>
		</div>
	);
};
export default ParkAdminDashboard;
