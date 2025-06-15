import React from 'react'

export default function ColumnFilter({column}) {
    const {filterValue, setFilter}=column;
  return (
    <span className="global-filter">
        <input value={filterValue|| ''} onChange={(e) => setFilter(e.target.value)} placeholder='Enter name'/>        
    </span>
  )
}
