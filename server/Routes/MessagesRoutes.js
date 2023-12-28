const express = require('express');
const router = express.Router();
const Message = require('../Models/Message');
const Conversation = require('../Models/Conversation');
const requireAuth = require('../middleware/requireAuth');
const User = require('../Models/UserModel');

router.use(requireAuth);



// sending messages
router.post('/send', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId } = req.body;

        if (!senderId || !message) {
            return res.status(422).json({ error: 'Please add all the fields' });
        }
        if (conversationId) {
            const newMessage = new Message({
                conversationId: conversationId,
                senderId: senderId,
                message: message,
            });
            const savedMessage = await newMessage.save();
            return res.status(200).json({ message: 'message sent' });
        } else if (!conversationId) {
            const newConversation = new Conversation({ members: [senderId, receiverId] });
            await newConversation.save();
            const newMessage = new Message({
                conversationId: newConversation._id,
                senderId: senderId,
                message: message,
            });
            const savedMessage = await newMessage.save();
            return res.status(200).json({ message: 'message sent' });
        } else {
            return res.status(404).json({ error: 'Invalid Request.' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.get('/getMessages', async (req, res) => {
    const senderId = req.query.senderId;
    const receiverId = req.query.receiverId;
    try {
        const conversation = await Conversation.find({ members: { $all: [senderId, receiverId] } });
        const conversationId = conversation[0]._id;
        if (conversationId) {
            const messages = await Message.find({ conversationId: conversationId });
            const messageUserData = Promise.all(messages.map(async (msg) => {
                const user = await User.findById(msg.senderId);
                return {
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        profilePic: user.profilePic,
                        about: user.about,
                        updatedAt: user.updatedAt,
                        createdAt: user.createdAt,
                    }, message: msg.message
                }
            }))
            res.status(200).json(await messageUserData);
        } else {
            res.status(404).json({ message: 'No Conversation found.' });
        }

    } catch (error) {
        res.status(500).json(error);
    }
});


// if user chat exist or not
router.get('/checkChat/:senderId/:receiverId', async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;
        const conversation = await Conversation.find({ members: { $all: [senderId, receiverId] } });

        if (!conversation) {
            console.log('No conversation found.');
        } else {
            console.log('conversation found:', conversation);
        }

    } catch (error) {
        res.status(500).json(error);
    }
});











module.exports = router;
