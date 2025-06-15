import React, { useMemo } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
	useRowSelect,
    useColumnOrder,
} from "react-table";
//import { useFilters } from "react-table";//for column filters
import "./BasicTable.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { Checkbox } from "./CheckBox";

export default function AdvancedTable({ columnsToDisplay, dataToDisplay }) {
	const columns = useMemo(() => columnsToDisplay, []);
	const data = useMemo(() => dataToDisplay, []);

	const defaultColumn = useMemo(() => {
		return {
			Filter: ColumnFilter,
		};
	}, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
		state,
		prepareRow,
		selectedFlatRows,
		setGlobalFilter,
        setColumnOrder
	} = useTable(
		{
			columns: columnsToDisplay,
			data: dataToDisplay,
			initialState: { pageIndex: 0 },
		},
		useGlobalFilter,
		useSortBy,
        useColumnOrder,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<Checkbox {...getToggleAllRowsSelectedProps()} />
						),
						Cell: ({ row }) => (
							<Checkbox {...row.getToggleRowSelectedProps()} />
						),
					},
					...columns,
				];
			});
		}
	);
	//pagination must be after globalfilter and sortby as second argument
	const { globalFilter, pageIndex, pageSize } = state;
	//const firstPageRows=rows.slice(0,10);
	return (
		<>
			<div>
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			</div>
			<table {...getTableProps()} className="table-style">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
									{/*<span>
										column.canFilter ? column.render("Filter") : ""
									</span>*/}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
				{/*<pre>
					<code>
						{JSON.stringify(
							{ selectedFlatRows: selectedFlatRows.map((row) => row.original) },
							null,
							2
						)}
					</code>
				</pre>*/
                //UPDATE AND DELETE FROM SELECTED  INFO
                }
			</table>
			<div className="next-previuos">
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
				<span>
					| Go to Page :{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						style={{ width: "50px" }}
					/>
				</span>

				<select
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[5, 10, 15, 20, 25, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					Previous
				</button>
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					Next
				</button>
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{">>"}
				</button>
			</div>
		</>
	);
}
/*getTableProps,
		getTableBodyProps,
		headerGroups,
    //footerGroups,// not necessary when using pagenation
		rows,
		prepareRow,
		state,
		setGlobalFilter,}=        useTable(
		{
			columns: columnsToDisplay,
			data: dataToDisplay,
           defaultColumn
		},
///        before pagination
        */
