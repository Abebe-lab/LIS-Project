import { NavLink } from 'react-router-dom';

const MenuItem = ({ to, title, iconClass }) => {
	return (
		<div className='menu-item-element'>
			<li className="menu-item">
				<NavLink to={to} style={{color: '#C2C0FF'}}>
					{typeof iconClass == 'string' ? (
						<i className={'fa mr-3 text-primary fa-fw ' + iconClass} />
					) : (
						iconClass
					)}
					{title}
				</NavLink>
			</li>
		</div>
	);
};
export default MenuItem;
	{/**	<li className="nav-item mr">
			<NavLink to={to} className="nav-link font-italic bg-light">
				{typeof iconClass == 'string' ? (
					<i className={'fa mr-3 text-primary fa-fw ' + iconClass} />
				) : (
					iconClass
				)}
				{title}
			</NavLink>
		</li>
		 */}