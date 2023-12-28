const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const axios = require('axios');
require('dotenv').config();
const ConversationRoutes = require('./Routes/ConversationRoutes');
const MessagesRoutes = require('./Routes/MessagesRoutes');
const UserRoutes = require('./Routes/UserRoutes');

const socketHandler = require('./SocketHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const server = http.createServer(app);



// Middleware
app.use(cors());
app.use(express.json());


// API routes setup
app.use('/api/auth', UserRoutes);
app.use('/api/conversation', ConversationRoutes);
app.use('/api/message', MessagesRoutes);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Your other routes and middleware go here

app.get('/check-url', async (req, res) => {
    // Your existing route handler
});

app.get('/', (req, res) => {
    res.send('Started');
});



// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});


// Start the server
const port = process.env.PORT || 1050;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
