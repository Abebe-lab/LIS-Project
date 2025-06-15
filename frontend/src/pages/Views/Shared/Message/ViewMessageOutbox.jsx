import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IPDCFinalTable } from "../../../../components";
import { GetCurrentUserOutboxMessage } from "../CommonData/CommonData";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";

export default function ViewMessageOutbox({ isSearchable = true }) {
  const decodedUser = useDecodedUser();
  const [loading, setLoading] = useState(true);

  const [myMessages, setMyMessages] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const componentRef = useRef();
  useEffect(() => {
    const fetchMessage = async () => {//console.log(decodedUser.id);
      const data = await GetCurrentUserOutboxMessage({ userId: decodedUser.id });//console.log(data);
      if (data) {
        const cols = (await data.length) ? Object.keys(data[0]) : [];
        setSelectedColumns(cols);
        setMyMessages(data);
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  return (
    <>
      <NavLink to="/sendMessage">Send Message</NavLink>
      {loading ? (
        <CircularProgress />
      ) : myMessages ? (
        <>
          <IPDCFinalTable
            ref={componentRef}
            data={myMessages}
            setData={setMyMessages}
            title="Outbox"
            selectedColumns={selectedColumns}
            isSearchable={isSearchable}
            showHeader={false}
            isMessage={true}
            hasAttachment={true}
            attachmentLink={"attachment_links"}
          />
        </>
      ) : (
        "No Data Found!"
      )}
    </>
  );
}
