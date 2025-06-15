import React, { useMemo } from 'react'
import {useTable} from 'react-table';
import './BasicTable.css';

export default function BasicTable({columnsToDisplay, dataToDisplay}) {
    const columns=useMemo(()=>columnsToDisplay,[]);
    const data=useMemo(()=>dataToDisplay,[]);
   
    const tableInstance=useTable({columns: columnsToDisplay, data: dataToDisplay});

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        footerGroups, 
        rows, 
        prepareRow} = tableInstance;

  return (
    <table {...getTableProps()} className='table-style'>
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
