import React, { useEffect, useState } from 'react';
import Select from 'ol/interaction/Select';
import { UpdateAndGetResponse } from '../../../../../services/api/ExecuteApiRequests';

const MPandPlanRuleSettingsForm = React.forwardRef(({ props, mapRef }, ref) => {
	const [selectedFeatures, setSelectedFeatures] = useState([]);

	const [parkId, setParkId] = useState('');
	const [id, setId] = useState('');
	const [blockNo, setBlockNo] = useState('');
	const [noExitingParcels, setNoExistingParcels] = useState(null);
	const [noOfPlannedParcels, setNoOfPlannedParcels] = useState(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [responseMessage, setResponseMessage] = useState('');

	const [featureType, setFeatureType] = useState('BLOCK');
	const handleFeatureSelect = () => {
		try {
			console.log(
				'feature type: ' + document.getElementById('featureType')?.value
			);
			setFeatureType(document.getElementById('featureType')?.value);
			if (featureType !== 'BLOCK') return;
			if (mapRef) {
				console.log('select started');
				const select = new Select({
					multi: false,
				});

				mapRef.current.addInteraction(select);
				//select
				select.on('select', (evt) => {
					if (evt.selected) {
						//console.log(evt.selected[0]);
						if (document.getElementById('id')) {
							//              console.log(evt.selected[0]?.getProperties());

							setParkId(
								evt.selected[0]?.getProperties()?.park_id
							);
							setId(evt.selected[0]?.getProperties()?.id);
							setBlockNo(
								evt.selected[0]?.getProperties()?.block_no
							);
							//              console.log(evt.selected[0]?.getProperties()?.name);
							setName(
								evt.selected[0]?.getProperties()?.name === 'N/A'
									? 'Enter Block Name'
									: evt.selected[0]?.getProperties()?.name
							);
							//(evt.selected[0]?.getProperties()?.planned_parcels==0)? document.getElementById('plannedParcels').placeholder="enter planned parcels": setNoOfPlannedParcels(evt.selected[0]?.getProperties()?.planned_parcels);
							setNoOfPlannedParcels(
								evt.selected[0]?.getProperties()
									?.planned_parcels
							);
							//              (evt.selected[0]?.getProperties()?.existing_parcels==0)? document.getElementById('NoOfParcels').placeholder="enter existing parcels": setNoExistingParcels(evt.selected[0]?.getProperties()?.existing_parcels);
							setNoExistingParcels(
								evt.selected[0]?.getProperties()
									?.existing_parcels
							);
							setDescription(
								evt.selected[0]?.getProperties()
									?.description === 'N/A'
									? 'Enter Description'
									: evt.selected[0]?.getProperties()
											?.description
							);
						}
						setSelectedFeatures((prev) => [
							...prev,
							...evt.selected,
						]);
					}
				});
				//deselect
				select.on('deselect', (evt) => {
					setId('');
					setName('');
					setDescription('');
					const unselectedIds = evt.deselected.map((feat) =>
						feat?.getId()
					);
					setSelectedFeatures((prev) => {
						return prev.filter((id) => !unselectedIds.includes(id));
					});
				});
			}
		} catch (ex) {
			console.log(ex);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			handleFeatureSelect();
		}, 1000);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const doesFetaureExist =
				document.getElementById('featureType').value;
			if (doesFetaureExist) setFeatureType(doesFetaureExist);

			if (featureType === 'BLOCK') {
				const apiToCall = 'addBlockInfo';

				const parameterValues = {
					id: id,
					block_no: blockNo,
					name: name,
					planned_parcels: noOfPlannedParcels,
					existing_parcels: noExitingParcels,
					description: description,
				};
				
				const responseData = await UpdateAndGetResponse(`${apiToCall}/${parameterValues.id}`,parameterValues)
				
				if (responseData) {
					setResponseMessage('Registration successful!');
				} else {
					setResponseMessage('Registration failed: ' + responseData);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="floating-form shadow-lg d-flex flex-column">
			<form onSubmit={handleSubmit} ref={ref}>
				<div className="form-title p-2 bd-highlight">
					Master Plan and Land Bank Rule Settings
				</div>
				<input
					className="form-control"
					type="text"
					id="id"
					style={{ margin: '5px' }}
					value={parkId}
					onChange={(e) => setId(e.target.value)}
					placeholder="Rule No"
					required
				/>
				<div className="input-group row p2">
					<input
						className="form-control inputGroup-sizing-sm"
						type="number"
						id="minArea"
						style={{ margin: '5px' }}
						value={id}
						onChange={(e) => setId(e.target.value)}
						placeholder="Minimum area for split"
						required
					/>
					<span
						className="input-group-text inputGroup-sizing-sm"
						id="basic-addon1"
					>
						m2
					</span>
				</div>
				<div className="input-group row p2">
					<input
						className="form-control inputGroup-sizing-sm"
						type="number"
						id="minFrontage"
						style={{ margin: '5px' }}
						value={blockNo}
						onChange={(e) => setBlockNo(e.target.value)}
						placeholder="Minimum frontage for split"
						required
					/>
					<span className="input-group-text mb-1" id="basic-addon2">
						m
					</span>
				</div>

				<label>Reference Document</label>
				<input
					type="file"
					id="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Reference Attachment"
					required
				/>
				<textarea
					className="form-control"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
				/>
				<div className="d-grid gap-4">
					<button
						type="submit"
						className="btn btn-primary decorated-button shadow-lg"
					>
						Set Land Rule
					</button>
				</div>
			</form>
			{responseMessage && <p>{responseMessage}</p>}
		</div>
	);
});

export default MPandPlanRuleSettingsForm;
