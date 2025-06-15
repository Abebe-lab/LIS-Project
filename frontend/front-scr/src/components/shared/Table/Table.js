const TableToShow = ({ data, columns, onEdit, onDelete, searchTerm={searchTerm}}) => {
	const handleEdit = (rowId) => {
		onEdit(rowId);
	};

	const handleDelete = (rowId) => {
		onDelete(rowId);
	};
	
	return (
		<table >
			<thead>
				<tr>
					{columns &&
						columns.map((header) => (
							<th key={header}>{header}</th>
						))}
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{
				(data && columns) && data.map((row) => {(
					<tr key={row[columns[0]]}>
						{ columns.map((header) => (
							<td key= {row[header] } > {row[header]} </td>
						))}
						<td>
							<button
								className="edit-button"
								onClick={() => handleEdit(row[columns[0]])}
							>
								Edit
							</button>
						</td>
						<td>
							<button
								className="delete-button"
								onClick={() => handleDelete(row[columns[0]])}
							>
								Delete
							</button>
						</td>
					</tr>
				)
				//console.log(row[columns[0]]);
				})}
			</tbody>
		</table>
	);
};

export default TableToShow;