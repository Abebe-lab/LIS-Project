import React,{useEffect,useState} from 'react'
import {Grid,Container, Typography} from '@mui/material';
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
export default function ViewMessageDetail({messageId}) {
  //const decodedUser = useDecodedUser();
  const [messageDetail,setMessageDetail]=useState(null);
  const [attributes,setAttributes]=useState(null);

  useEffect(()=>{
    const fetchData=async()=>{
      const resultData=await GetDataFromApiWithParams(`messages/${messageId}`);
      const {...tempAttributes}=resultData[0];
      setAttributes(tempAttributes)
      setMessageDetail(resultData)
      console.log(resultData)
//      const data = await GetCurrentUserMessage({ userId: decodedUser.id });
      
    }
    fetchData();
  },[])
  return (
    <>{
      messageDetail?<Container>
      {
      messageDetail && (
        <>
          <Grid container spacing={1} paddingX={5}>
            {Object.entries(attributes).map(([key, value]) => (
              <React.Fragment key={key}>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1">
                    {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Typography variant="body1" fontWeight="bold">
                    {value === null || value === "" ? "Not Available" : value}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </>
      )
      }
      </Container>:
      <div>No message Detail!</div>
    }
    </>
    
  )
}
