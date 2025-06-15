import React,{ useState} from "react";
import MenuItem from "./MenuItem";
import "./Menu.css";
import logo from "../../../assets/image/main_logo.png";

const Menu = ({ department, menuItems }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <div className={`menu ${isMenuVisible ? 'visible' : 'hidden'}`}>
            <div className="menu-title-container">
                <img src={logo} onClick={toggleMenu} className="menu-logo" alt="IPDC Logo" />
                {isMenuVisible && <div className="menu-title">IPDC</div>}
            </div>
            {isMenuVisible && (
                <>
                    <div className="menu-department">
                        <h4 style={{ paddingLeft: "10px", marginLeft: "10px", color: "white", alignContent: "right" }}>
                            {" " + department}
                        </h4>
                    </div>
                    <div className="menu-item-container">
                        <ul>
                            {menuItems.map((eachItem) => {
                                return (
                                    <MenuItem key={eachItem.key} to={eachItem.to} title={eachItem.title} iconClass={eachItem.iconClass} />
                                );
                            })}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Menu;

/*
			<div
				className={
					'vertical-nav bg-white ' + (!isMenuVisible ? 'active' : '')
				}
				id="sidebar"
			>
				<MenuTitle
					department={department}
					userName={user.user.full_name}
				/>
				<ul className="nav flex-column bg-white mb-0">
					{menuItems.map((eachItem) => {
						return (
							<MenuItem
								key={eachItem.key}
								to={eachItem.to}
								title={eachItem.title}
								iconClass={eachItem.iconClass}
							/>
						);
					})}
				</ul>
			</div>*/
