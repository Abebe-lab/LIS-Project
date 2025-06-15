import { useState, useCallback, useEffect } from "react";
import useDecodedUser from "../../../services/hooks/useDecodedUser";
import "./CustomUserProfile.css";

import Search from "../../../components/shared/Search/Search";

export default function CustomUserProfile({ isOnline }) {
	const decodedUser  = useDecodedUser();
	//const [noOfReminders, setNoOfReminders] = useState(0);
	const [searchResult, setSearchResult] = useState({});
	const [imgNew, setImgNew] = useState("");

	useEffect(() => {
		// Try to load the image, if it fails, set the default person icon
		try {
			setImgNew(require("../../../assets/image/" + (decodedUser.id ? decodedUser.id : "26") + ".jpg"));
		} catch (error) {
			setImgNew(require("../../../assets/image/person.png")); // Replace with your default person icon path
		}
	}, [decodedUser.id]);

	const handleSearch = useCallback(
		(searchValue) => {
			const filterData = "";
		},
		[searchResult]
	);

	const handleReminder = useCallback(() => {
		const showReminderWithLink = "";
	}, []);

	return (
		<div className="top-default-navigator-container row">
			<div className="col-2"></div>
			<div className="col-7" style={{ paddingLeft: "6rem" }}>
				<span className="search-title">
					<Search onChange={handleSearch} />
				</span>
			</div>
			<div className="col-3">
				<div className="user-profile-container">
					<div className="user-profile">
						<div
							className={" user-profile-status" + isOnline ? " active" : " inactive"}
							style={{ padding: "0px", margin: "0px", gap: "0px", float: "right" }}
						></div>
						<div className="user-profile-picture">
							{imgNew && <img src={imgNew} className="user-profile-picture" alt="" id="imgPersonalProfile" />}
						</div>
						<div className="user-profile-name">{decodedUser.full_name}</div>
						<div className="user-profile-email">{decodedUser.email}</div>
					</div>
				</div>
				{/* <div id="reminder" style={reminderStyle} >
                    <div className="input-group-append mb-3">
                        <Search onChange={handleSearch} />
                        <ReminderLogo
                            onChange={(e) =>
                                setNoOfReminders(e.target.value)
                            }
                            noOfReminders={noOfReminders}
                        />
                    </div>
                </div> */}
			</div>
			<div className="search-container">
				{/**
				 *
				 */}
			</div>
		</div>
	);
}