import React, { useState, useEffect, useRef } from 'react';
import './Table.css';
import  { useReactToPrint } from 'react-to-print';

import mainLogo from '../../../../assets/image/main_logo.png';
import {ExecuteApiToPost} from '../../../../services/api/ExecuteApiRequests';
//import {format} from 'date-fns';

const ViewReferredStatus=()=>{
    const [referred, setReferred] = useState([]);
    const [search, setSearch] = useState('');

    //const { print } = useReactToPrint();

    const printRef=useRef();
    const handlePrint=useReactToPrint({
      content: ()=>printRef.current,
    });

    useEffect(() => {
      const fetchData = async () => {
      const responseData = await ExecuteApiToPost('referredStatus');
      setReferred(responseData);
      }
      fetchData();

      //console.log(referred);
		}, [search]);

      const handleChange = (event) => {
        setSearch(event.target.value);
      };
	  
      const filteredParcels = referred.filter(referred => {
        if (search === '') {
          return true;
        }    
		if (referred.company_name.toLowerCase().includes(search.toLowerCase())) {
			return true;
		  }    
		  if (referred.request_no.toString().includes(search.toLowerCase())) {
			return true;
		  } 
        if (referred.p_inv_id.toString().includes(search.toLowerCase())) {
          return true;
        }    
        if (referred.request_date.toString().toLowerCase().includes(search.toLowerCase())) {
          return true;
        }    
        if (referred.purpose.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      });
      
    return(
        <div>
			
            <input type="text" value={search} onChange={handleChange} placeholder="Search referred" />
            <button onClick={handlePrint}>Print Table</button>
			<div ref={printRef} style={{textAlign: 'center', paddingTop: 20}}>
					<img src={mainLogo} alt="log"></img>
				<h1 style={{textAlign: 'center', paddingTop: 20}}> Request Report From IPDC</h1>
				
            <table className="table" style={{borderColor: 'black',width: '100%', position: 'relative', display: 'grid'}}>
				<caption>Requets placed to IPDC </caption>
                <thead>
                <tr>
					          <th>Status</th>
                    <th>Req. #</th>
                    <th>Inv. Id.</th>
                    <th>TIN No</th>
                    <th>company Name</th>
                    <th>Contact Person</th>
                    <th>Phone #</th>
                    <th>E-mail</th>
                    <th>Nationality</th>
                    <th>Referred Date</th>
                    <th>Purpose</th>
                    <th>Description</th>
                    <th>Detail</th>
                </tr>
                </thead>
                <tbody>
                {filteredParcels.map(request => {
					return (
                    <tr key={request["request_no"]}>
					<td>{request.status}</td>
                      <td>{request["request_no"]}</td>
                      <td>{request["p_inv_id"]}</td>
					  <td>{request["tin_no"]}</td>
					  <td>{request["company_name"]}</td>
					  <td>{request["contact_person"]}</td>
					  <td>{request["phone_no"]}</td>
					  <td>{request["email"]}</td>
					  <td>{request["nationality_origin"]}</td>
                      <td>{ new Date(request['request_date']).toLocaleDateString()}</td>
                      <td>{request["purpose"]}</td>
                      <td>{request["description"]}</td>
                      <td><a href="./request/approved_request_form">View</a></td>
                    </tr>
                );})}
                </tbody>
            </table>
			</div>
            </div>
    );
}

export default ViewReferredStatus;