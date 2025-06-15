import messageQueries from "../quieries/messageQueries.js";
import { fileUploader } from "../utils/uploader.js";
import { executeQueryAndGetResult } from "../utils/dbHandler.js";
import pool from "../../../db.js";

//sendMessage
//-------------attachh if attachment
const attachDocuments = async (req, res) => {
  return true;
};
const sendMessage = async (req, res) => {
  console.log("[send message started]");
  try {
    const parsedData = JSON.parse(req.body.data);
    const sentFrom = req.userId;
    const { sentTo, title, description, responseFor, attachment } = parsedData;
    console.log("files: ", req.file);
    let attachmentPath = "";
    if (req.file) {
      attachmentPath = await fileUploader(req.file, `messages/${sentTo}`);
    }

    const response = await executeQueryAndGetResult(res, messageQueries.sendMessage, [
      sentFrom,
      sentTo,
      title,
      description,
      responseFor,
      attachmentPath,
    ]);
    if (response) {
      res.status(201).send({ message: "Message sent succesfully!" });
    } else {
      res.status(201).send({ message: "Nothing to execute" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server unable to execute, please try again later!");
  }
};
//getMessages
const getMessages = (req, res) => {
  try {
    pool.query(messageQueries.getMessages, (error, results) => {
      if (error) console.log(error);
      res.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};
//getMessageByRecieverId

const getMessageByRecieverId = async (req, res) => {
  const reciever_id = req.params.id;
  try {
    pool.query(messageQueries.getMessageByRecieverId, [reciever_id], async (error, results) => {
      if (error) {
        console.log(error);
      }
      //        console.log(results)
      res.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};
const getMessageBySenderId = async (req, res) => {
  console.log("[Get message by sender started]");
  const sender_id = req.params.id;
  try {
    const result = await executeQueryAndGetResult(res, messageQueries.getMessageBySenderId, [sender_id]);
    return res.status(200).json(result?.rows || []);
  } catch (error) {
    console.log("[Error] ", error);
    return res.status(500).send("Server unable to execute, please try again later!");
  } finally {
    console.log("[Get message by sender finished]");
  }
};
//getMessageMessageById
const getMessageMessageById = async (req, res) => {
  try {
    const message_id = req.params.id;
    const result = await executeQueryAndGetResult(res, messageQueries.getMessageMessageById, [message_id]);
    return res.status(200).json(result?.rows || []);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server unable to execute, please try again later!");
  }
};
//deleteMessage
const deleteMessage = (req, res) => {
  try {
    const message_id = req.params.messageId;

    pool.query(messageQueries.deleteMessage, [message_id], (error, results) => {
      if (error) console.log(error);
      if (results.rows.length === 0) {
        res.send("no such message");
      }
      res.status(200).send("Message deleted succesfully!");
    });
  } catch (err) {
    console.log(err);
  }
};

//updateMessage
const updateMessage = (req, res) => {
  const { msg_id, title, description, status, response_for, attachment_s, sent_from, sent_to } = req.body;

  pool.query(
    messageQueries.updateMessage,
    [msg_id, title, description, status, response_for, attachment_s, sent_from, sent_to],
    (error, results) => {
      if (error) console.log(error);
      if (results.rows.length === 0) {
        res.send("no such message");
      }
      res.status(200).send("message updated succesfully!");
      console.log("message updated");
    }
  );
};
//updateMessageStatus
const updateMessageStatus = (req, res) => {
  try {
    const { id } = req.params;
    //console.log()
    pool.query(messageQueries.updateMessageStatus, [id], (error, results) => {
      if (error) console.log(error);
      if (!results) {
        res.send("no such message");
      }
      res.status(200).send("message updated succesfully!");
      console.log("message updated");
    });
  } catch (err) {
    console.log(err);
  }
};
const updateAllMessagesAsSeen = async (req, res) => {
  console.log("[update all messages as seen started]");
  try {
    const result = await executeQueryAndGetResult(res, messageQueries.updateAllMessagesAsSeen, [req.userId]);
    if (result) return res.status(200).send("message updated succesfully!");
  } catch (err) {
    console.log(err);
  }
  console.log("[update all messages as seen finished]");
};

export default {
  sendMessage,
  getMessages,
  getMessageBySenderId,
  getMessageByRecieverId,
  getMessageMessageById,
  deleteMessage,
  updateMessage,
  updateMessageStatus,
  updateAllMessagesAsSeen,
};
