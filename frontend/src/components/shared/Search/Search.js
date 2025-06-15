import { memo } from 'react';
import './Search.css';
function Search({ onChange }) {
	return (
		<>
			<div className="input-group mb-3 mt-2 search-title">
			<span className='mr-3 search-title'>Search:</span> 
				<input
					type="text"
					placeholder="E.g. AABL001001"
					onChange={(e) => onChange(e.target.value)}
					list='searchDataList'
					className='search-input-style'
				/>
				<datalist id="searchDataList">
					<option value="Enter example"></option>
				</datalist>
				{/* {'      '}
				<i
					className="fa fa-search p-2"
					style={{ cursor: 'pointer', color: '#000' }}
				></i> */}
			</div>
		</>
	);
}
export default memo(Search);
