import { memo } from 'react';

function ReminderLogo({ onChange, noOfReminders }) {
	return (
		<>
			<div className="input-group-append">
				<i
					className="fa fa-bell p-2"
					style={{
						color: 'grey',
						fontSize: '20px',
						cursor: 'pointer',
					}}
				></i>
				<div
					className="shadow-lg"
					style={{
						position: 'relative',
						color: 'white',
						backgroundColor: 'red',
						fontSize: '16px',
						fontWeight: 'bold',
						textAlign: 'center',
						padding: 0,
						margin: 0,
						top: 0,
						width: 20,
						height: 20,
						left: -18,
						borderRadius: 50,
						boxShadow: '1px 1px 1px black',
					}}
				>
					{noOfReminders}
				</div>
			</div>
		</>
	);
}
export default memo(ReminderLogo);
