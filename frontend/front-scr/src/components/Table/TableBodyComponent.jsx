import React from "react";
import { TableBody, TableRow, TextField, IconButton, Checkbox } from "@mui/material";
//prettier-ignore
import {Save as SaveIcon, Cancel as CancelIcon, Edit as EditIcon, Attachment as AttachmentIcon, } from "@mui/icons-material";
import { styled } from "@mui/system";
import { TableCell } from "@mui/material";
import IPDCConfirmDeletion from "../Controls/IPDCConfirmDeletion";
import {
  DeleteAndGetResponse,
  DownloadFileFromServer,
  UpdateAndGetResponse,
} from "../../services/api/ExecuteApiRequests";
//prettier-ignore
const StyledTableCell = styled(TableCell)(({ theme }) => ({ fontWeight: "bold", textAlign: "center", padding: "8px",
  whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-word", maxHeight: "4.5em", lineHeight: "1.5em" }));
//prettier-ignore
const TableBodyComponent = ({ data, columns, selectedColumns, editingRowIndex, setEditingRowIndex, editingData, setEditingData, setData, 
  isMessage=false,isEditable, isDeletable, hasAttachment, attachmentLink, targetPoint, deleteKey,}) => {
  const handleEditClick = rowIndex => {
    setEditingRowIndex(rowIndex);
    setEditingData(data[rowIndex]);
  };

  const handleCancelClick = () => {
    setEditingRowIndex(null);
    setEditingData({});
  };

  const handleSaveClick = async () => {
    const updatedData = [...data];
    updatedData[editingRowIndex] = editingData;
    setData(updatedData);
    setEditingRowIndex(null);
    setEditingData({});
    if (targetPoint !== "" && deleteKey !== "") {
      console.log("the data: ", data[editingRowIndex]);
      const response = await UpdateAndGetResponse(`${targetPoint}/${data[editingRowIndex][deleteKey]}`, editingData);
      console.log("the result: ", response);
    }
  };

  const handleDeleteClick = async rowIndex => {
    try {
      console.log("[fe: delete started]");
      const updatedData = data.filter((_, index) => index !== rowIndex);
      console.log("target: ", targetPoint, "key: ", deleteKey);
      if (targetPoint !== "" && deleteKey !== "") {
        console.log("the data: ", data[rowIndex]);
        const response = await DeleteAndGetResponse(`${targetPoint}/${data[rowIndex][deleteKey]}`);
        console.log("the result: ", response);
      }
      setData(updatedData);
      console.log("[api: delete ended]");
    } catch (error) {
      console.log(error);
    }
  };
  
  const downloadFile = async url => {
    try {
      const response = await DownloadFileFromServer(url);
      console.log(response);
      if (response) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", ""); // Optional: set a file name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl); // Clean up
      } else {
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const handleInputChange = (e, column) => {
    setEditingData({
      ...editingData,
      [column]: e.target.value,
    });
  };
  const handleMessageCheckboxChange = async (event, rowIndex) => {
    try {
      const updatedData = [...data];
      const message = updatedData[rowIndex];
      message.status = event.target.checked ? "Seen" : "Pending";
      setData(updatedData);
      const responseData = await UpdateAndGetResponse(`messages/${message.no}/updateStatus`, {
        msg_id: message.no,
        status: message.status,
      });
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableBody>
      {(data && data?.length > 0) && data.map((row, rowIndex) => (
        <TableRow key={rowIndex} sx={rowIndex % 2 ? { backgroundColor: "#f2f2f2" } : { backgroundColor: "#ffffff" }}>
          {isMessage && (
                      <StyledTableCell>
                        <Checkbox
                          checked={row.status === "Seen"}
                          onChange={(e) => handleMessageCheckboxChange(e, rowIndex)}
                        />
                      </StyledTableCell>
                    )}
          {columns?.length > 0 && columns?.filter(column => selectedColumns?.includes(column))?.map(column => (
              <StyledTableCell key={column}>
                {editingRowIndex === rowIndex ? (
                  <TextField value={editingData[column]} onChange={e => handleInputChange(e, column)} />
                ) : (
                  row[column]
                )}
              </StyledTableCell>
            ))}
          {hasAttachment && (
            <StyledTableCell>
              {row[attachmentLink] && (
                <IconButton onClick={() => downloadFile(row[attachmentLink])}>
                  <AttachmentIcon />
                </IconButton>
              )}
            </StyledTableCell>
          )}
          {(isEditable || isDeletable) && (
            <StyledTableCell>
              {editingRowIndex === rowIndex ? (
                <>
                  <IconButton onClick={handleSaveClick}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelClick}>
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  {isEditable && (
                    <IconButton onClick={() => handleEditClick(rowIndex)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {isDeletable && <IPDCConfirmDeletion onConfirm={() => handleDeleteClick(rowIndex)} />}
                </>
              )}
            </StyledTableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;
