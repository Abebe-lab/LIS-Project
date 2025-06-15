import React, { useMemo } from 'react'
import {useTable, useSortBy, useFilters, useGlobalFilter} from 'react-table';
import './BasicTable.css';

export default function SortingTable({columnsToDisplay, dataToDisplay}) {
    const columns=useMemo(()=>columnsToDisplay,[]);
    const data=useMemo(()=>dataToDisplay,[]);
   
    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        footerGroups, 
        rows, 
        prepareRow}=useTable({columns: columnsToDisplay, data: dataToDisplay}, useSortBy);

  return (
    <table {...getTableProps()} className='table-style'>
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                            </span>
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map(row=>{
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell=>{
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })
            }
        </tbody>
        <tfoot>
           {
            footerGroups.map(footerGroup=>{
                return(
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column=>{
                            return <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                        })}
                    </tr>
                )
            })}                      
        </tfoot>
    </table>
  )
};
