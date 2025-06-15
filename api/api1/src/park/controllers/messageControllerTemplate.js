import path from "path";
import fs from "fs";
import Message from "../models/Message.js"; // Assuming you have a Message model
import { v4 as uuidv4 } from "uuid"; // For generating unique filenames

const messageControllerTemplate = {
    // Send a new message
    sendMessage: async (req, res) => {
        try {
            const { senderId, receiverId, subject, body } = req.body;

            // Create a new message object
            const newMessage = new Message({
                senderId,
                receiverId,
                subject,
                body,
                read: false, // Message is unread by default
                sentAt: new Date(),
            });

            // Save the message to the database
            await newMessage.save();

            res.status(201).json({ message: "Message sent successfully", data: newMessage });
        } catch (error) {
            res.status(500).json({ message: "Failed to send message", error });
        }
    },

    // Get inbox messages for the current user
    getInboxMessages: async (req, res) => {
        try {
            const userId = req.user.id;

            // Fetch messages where the current user is the receiver
            const messages = await Message.find({ receiverId: userId }).sort({ sentAt: -1 });

            res.status(200).json({ message: "Inbox messages retrieved successfully", data: messages });
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve inbox messages", error });
        }
    },

    // Get sent messages for the current user
    getSentMessages: async (req, res) => {
        try {
            const userId = req.user.id;

            // Fetch messages where the current user is the sender
            const messages = await Message.find({ senderId: userId }).sort({ sentAt: -1 });

            res.status(200).json({ message: "Sent messages retrieved successfully", data: messages });
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve sent messages", error });
        }
    },

    // Get a specific message by ID
    getMessageById: async (req, res) => {
        try {
            const { id } = req.params;

            // Fetch the message by ID
            const message = await Message.findById(id);

            if (!message) {
                return res.status(404).json({ message: "Message not found" });
            }

            res.status(200).json({ message: "Message retrieved successfully", data: message });
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve message", error });
        }
    },

    // Delete a specific message by ID
    deleteMessage: async (req, res) => {
        try {
            const { id } = req.params;

            // Delete the message by ID
            const message = await Message.findByIdAndDelete(id);

            if (!message) {
                return res.status(404).json({ message: "Message not found" });
            }

            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete message", error });
        }
    },

    // Mark a message as read by ID
    markAsRead: async (req, res) => {
        try {
            const { id } = req.params;

            // Update the message's read status
            const message = await Message.findByIdAndUpdate(id, { read: true }, { new: true });

            if (!message) {
                return res.status(404).json({ message: "Message not found" });
            }

            res.status(200).json({ message: "Message marked as read", data: message });
        } catch (error) {
            res.status(500).json({ message: "Failed to mark message as read", error });
        }
    },

    // Upload an attachment for a message
    uploadAttachment: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            // Generate a unique filename
            const uniqueFilename = `${uuidv4()}-${req.file.originalname}`;

            // Move the file to the desired location (e.g., `attachments/` directory)
            const uploadPath = path.join("uploads", uniqueFilename);

            fs.renameSync(req.file.path, uploadPath);

            res.status(200).json({ message: "File uploaded successfully", filename: uniqueFilename });
        } catch (error) {
            res.status(500).json({ message: "Failed to upload file", error });
        }
    },

    // Download an attachment by filename
    downloadAttachment: async (req, res) => {
        try {
            const { filename } = req.params;
            const filePath = path.join("uploads", filename);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "File not found" });
            }

            res.download(filePath);
        } catch (error) {
            res.status(500).json({ message: "Failed to download file", error });
        }
    }
};

export default messageControllerTemplate;
