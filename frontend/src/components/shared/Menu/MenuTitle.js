import { memo } from 'react';
import logo from '../../../assets/image/main_logo.png';

function MenuTitle({ onChange, department, userName }) {
	return (
		<>
			<div className="py-4 px-3 mb-4 bg-light">
				<div className="media d-flex align-items-center">
					<img
						src={logo}
						alt="..."
						width="65"
						className="mr-3 rounded-circle img-thumbnail shadow-sm"
					/>
					<div className="media-body">
						<h4 className="m-0">{department}</h4>
						<p className="font-weight-light text-muted mb-0">
							{userName }
						</p>
					</div>
				</div>{' '}
			</div>
		</>
	);
}
export default MenuTitle;
