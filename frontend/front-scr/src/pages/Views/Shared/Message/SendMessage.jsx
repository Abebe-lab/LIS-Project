import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Container, Grid, TextField, FormControl, Link } from "@mui/material";
import { UserList } from "../PreRenderedComponents";
import { ExecuteApiToPost } from "../../../../services/api/ExecuteApiRequests";
import FormContainer from "../../../../components/Forms/FormContainer";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";

const initialData = { sentFrom: 0, sentTo: 0, title: "", description: "", responseFor: -1, attachment: [] };

export default function SendMessage({ responseFor = null }) {
  const decodedUser = useDecodedUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(initialData);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    setFormData({ ...formData, sentFrom: decodedUser.id, responseFor: responseFor });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (file.size > 15 * 1024 * 1024) {
      alert("File size cannot exceed 15 MB.");
      setFormData({ ...formData, attachment: [] });
      return;
    } else {
      setFormData({ ...formData, attachment: e.target.files[0] });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formData.sentTo = selectedUser?.id;
      setFormData(formData);
      //console.log(formData);
      formDataToSubmit.append("data", JSON.stringify(formData));
      formDataToSubmit.append("file", formData.attachment);
      const responseData = await ExecuteApiToPost("messages/send", formDataToSubmit);

      if (responseData) {
        toast("Message sent successfully!", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
        });
        setFormData(initialData);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    // Handle form submission
    //onSubmit(message);
  };

  return (
    <Container p={3}>
      <FormContainer title={"Send Message"} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth={true} variant="outlined">
              <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth={true}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth={true}
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name="attachment"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.rar"
              size={15 * 1024 * 1024}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Link href="/viewMessageList" variant="body2">
              View Inbox
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="/viewMessageOutbox" variant="body2">
              View Sent Messages
            </Link>
          </Grid>
        </Grid>
      </FormContainer>
    </Container>
  );
}
