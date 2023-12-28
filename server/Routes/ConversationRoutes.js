const express = require('express');
const router = express.Router();
const Conversation = require('../Models/Conversation');
const requireAuth = require('../middleware/requireAuth');
const User = require('../Models/UserModel');

router.use(requireAuth);

// Fetch all users
router.get('/getUsers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allUsers = await User.find({ _id: { $ne: id } });
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error fetching User Data:', error);
        res.status(500).json({ error: 'An error occurred while fetching User Data' });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new Conversation({ members: [senderId, receiverId] });
        await newConversation.save();

        res.status(200).json({ message: "Conversation created successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/getChats/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundConversation = await Conversation.find({ members: { $in: [id] } });
        const conversationUserData = Promise.all(foundConversation.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== id);
            const user = await User.findById(receiverId);
            return {
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    profilePic: user.profilePic,
                    updatedAt: user.updatedAt,
                    createdAt: user.createdAt,
                    about: user.about,
                },
                conversationId: conversation._id
            }
        }))

        res.status(200).json(await conversationUserData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// serach chat users
router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.search ? {
            $or: [
                { fullName: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ],
        } : {};

        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        res.status(200).json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});











module.exports = router;
