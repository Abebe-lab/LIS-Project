import React,{useState} from 'react';
import { useAsyncDebounce } from 'react-table';

export default function GlobalFilter({filter,setFilter}) {
  const [value,setValue]=useState(filter);

  const onChange=useAsyncDebounce((value)=>{
    setFilter(value||undefined);
  },400);

  return (
    <span className="global-filter">
        Search: {' '}
        <input value={value|| ''} onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
          }} placeholder='E.g. System Admin'/>        
    </span>
  )
}
