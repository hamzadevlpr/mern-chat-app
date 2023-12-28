const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middleware/requireAuth.js');
const nodemailer = require('nodemailer');



const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

// Check if email exists route
router.post('/check-email', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        res.json({ exists: existingUser !== null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// signup route for new user registration with google
router.post('/google-signup', async (req, res) => {
    try {
        const { fullName, email, profilePic, provider } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ error: 'Email already exists' });
        }
        // hashing the password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('123456789', saltRounds);

        // Create a new user instance
        const newUser = new User({ fullName, email, profilePic, provider, password: hashedPassword });

        // Save the new user to the database
        await newUser.save();

        // Generate JWT token for the new user
        const token = createToken(newUser._id);

        // Update the user with the generated token
        newUser.token = token;
        await newUser.save();

        res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
            about: newUser.about,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            token: token
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// login route for existing user with google
router.post('/google-login', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists in the database
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ error: 'User not found. Please sign up first.' });
        }

        // Generate JWT token for the authenticated user
        const token = createToken(existingUser._id);

        // save token to the database for the authenticated user
        existingUser.token = token;
        await existingUser.save();

        res.status(200).json({
            _id: existingUser._id,
            email: existingUser.email,
            fullName: existingUser.fullName,
            profilePic: existingUser.profilePic,
            about: existingUser.about,
            createdAt: existingUser.createdAt,
            updatedAt: existingUser.updatedAt,
            token: existingUser.token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// signup route for new user registration
router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password, provider } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ error: 'Email already exists' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ fullName, email, password: hashedPassword, provider });
        newUser.token = createToken(newUser._id);

        await newUser.save();


        res.status(201).json({
            // return user details without password
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            token: newUser.token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// login, JWT generation, and middleware can be defined here
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user with the provided email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const newToken = createToken(user._id);

        // save token to the database for the authenticated user
        user.token = newToken;
        await user.save();

        // Send user details
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
            about: user.about,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: user.token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// email config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

// send reset password link
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {

        // Check if the user with the provided email exists in the database, excluding the current user
        const emailMatches = await User.findOne({ email: email });

        if (!emailMatches) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a reset token
        const token = jwt.sign({ _id: emailMatches._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '120s' });

        // Update the user's verifyToken in the database
        const setUserToken = await User.findByIdAndUpdate({ _id: emailMatches._id }, { verifyToken: token }, { new: true });

        if (setUserToken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: emailMatches.email,
                subject: 'Reset Password',
                html: `<h2>Please click on the given link to reset your password</h2>
                        <p>This link is valid for 2 minutes only</p>
                        <p>${process.env.CLIENT_URL}/new-password/${emailMatches._id}/${setUserToken.verifyToken}</p>`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ error: "Email didn't send" });
                } else {
                    console.log('Email sent:');
                    res.status(201).json({ message: 'Password reset link sent to your email' });
                }
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Verify user for reset password
router.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    try {
        // Check if the user with the provided id exists in the database
        const validUser = await User.findOne({ _id: id, verifyToken: token });

        // Verify token
        try {
            const verifyToken = jwt.verify(token, process.env.RESET_PASSWORD_KEY);

            // Compare token and valid user
            if (validUser && verifyToken._id) {
                return res.status(201).json({ message: 'User verified successfully' });
            } else {
                return res.status(401).json({ error: 'User not Exist' });
            }
        } catch (verifyErr) {
            console.error(verifyErr);
            return res.status(401).json({ error: 'Token verification failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'User not verified' });
    }
});

router.put('/new-password/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;

        // Check if the user with the provided id exists in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// authorize user
router.use(requireAuth)

// update user profile route for logged in user
router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, email, profilePic, about } = req.body;

        // check if email is already in use but not checking for the same user
        const emailMatches = await User.findOne({ email: email, _id: { $ne: userId } });
        if (emailMatches) {
            return res.status(400).json({ error: 'Email is Associated with another account' });
        }

        // Generate JWT token
        const updatedUser = await User.findByIdAndUpdate(userId,
            { fullName, email, profilePic, about }, { new: true }).select('-password');

        // Generate JWT token
        const token = createToken(userId);

        // Send user details
        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            profilePic: updatedUser.profilePic,
            about: updatedUser.about,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// change password route for logged in user
router.put('/change-password/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { oldPassword, newPassword } = req.body;

        // Check if the user with the provided id exists in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the provided old password matches the hashed password in the database
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete user route for logged in user
router.delete('/delete/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user from the database
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;
