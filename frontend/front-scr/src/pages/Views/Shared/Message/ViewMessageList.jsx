import React, { useState, useEffect, useRef } from "react";
import { CircularProgress, Paper, Container, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IPDCFinalTable } from "../../../../components";
import { GetCurrentUserMessage } from "../CommonData/CommonData";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";
import { Send } from "@mui/icons-material";

export default function ViewMessageList({ isSearchable = true }) {
  const decodedUser = useDecodedUser();
  const [loading, setLoading] = useState(true);

  const [myMessages, setMyMessages] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const componentRef = useRef();
  useEffect(() => {
    const fetchMessage = async () => {
      //console.log(decodedUser.id);
      const data = await GetCurrentUserMessage({ userId: decodedUser?.id });
      //console.log(data);
      if (data) {
        const cols = data?.length>0 ? Object.keys(data[0]) : [];
        setSelectedColumns(cols);
        setMyMessages(data);
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 1, m: 1 }}>
      <Container sx={{ paddingBottom: 1 }}>
        <NavLink to="/sendMessage">
          Send Message <Send />
        </NavLink>
      </Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          {myMessages && myMessages.length ? (
            <IPDCFinalTable
              ref={componentRef}
              data={myMessages}
              setData={setMyMessages}
              title="Inbox"
              selectedColumns={selectedColumns}
              isSearchable={isSearchable}
              showHeader={false}
              isMessage={true}
              hasAttachment={true}
              attachmentLink={"attachment_links"}
            />
          ) : (
            <Container>
              <Typography>No messages today, Have a nice day!</Typography>
            </Container>
          )}
        </Box>
      )}
    </Paper>
  );
}
