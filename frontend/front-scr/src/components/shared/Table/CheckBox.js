import React,{forwardRef, useEffect} from 'react';

export const Checkbox=React.forwardRef(({indeterminate, ...rest},ref)=>
{
    const defaultRef=React.useRef();
    const resolveRef=ref||defaultRef;

    useEffect(()=>{
        resolveRef.current.indeterminate=indeterminate;
    },[indeterminate,resolveRef]);

    return (
        <>
             <input type="checkbox" ref={resolveRef} {...rest}/>
        </>
    );
});