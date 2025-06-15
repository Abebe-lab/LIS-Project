import { useState } from 'react';
import ListBuildingPermitForm from './ListBuildingPermitForm';
//import ViewMapPage from '../../../../not needed/ViewMapPage';

/*const featureTypes = [
	{ key: 'PARK', label: 'Park' },
	{ key: 'BLOCK', label: 'Block' },
	{ key: 'PARCEL', label: 'Parcel' },
	{ key: 'INFRA', label: 'Infrastructure' },
	{ key: 'SA', label: 'System Admin' },
];*/

export default function ExporFollowBuildingPermit() {
	const [id, setId] = useState('');
//	const [featureType, setFeatureType] = useState(featureTypes[0]);
	const [name, setName] = useState('');
	const [no, setNo] = useState('');
	const [description, setDescription] = useState('');
	const [responseMessage, setResponseMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			//handle assigning/editing info of map
			setResponseMessage('Data Assigned');
		} catch (error) {
			setResponseMessage('An error occurred: ' + error.message);
			console.log(error);
		}
	};
	return (
		<div>
			<div className="assign-info">
				<div style={{ paddingTop: '13%', paddingLeft: '15px' }}>
					<ListBuildingPermitForm />
				</div>
				<div className="floating-form shadow-lg d-flex flex-column">
					<form onSubmit={handleSubmit}>
						<div className="form-title  mb-3">
							Follow Building Permit
						</div>

						<input
							className="form-control  mb-3"
							type="text"
							id="id"
							value={id}
							onChange={(e) => setId(e.target.value)}
							placeholder="Permit No"
							required
						/>
						<input
							className="form-control  mb-3"
							type="text"
							id="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Status"
							required
						/>
						<input
							className="form-control  mb-3"
							type="text"
							id="stage"
							value={no}
							onChange={(e) => setNo(e.target.value)}
							placeholder="Stage"
							required
						/>
						<input
							className="form-control  mb-3"
							type="text"
							id="recommendation"
							value={no}
							onChange={(e) => setNo(e.target.value)}
							placeholder="Recommendation"
							required
						/>
						<textarea
							className="form-control  mb-3"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Description"
						/>
						<div className="d-grid gap-4  mb-3">
							<button
								type="submit"
								className="btn btn-primary decorated-button shadow-lg mb-0"
							>
								Assign Status
							</button>
						</div>
					</form>
					{responseMessage && <p>{responseMessage}</p>}
				</div>
			</div>
		</div>
	);
}
