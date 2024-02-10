const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const SocketManager = require('./utils/socket-manager');
const errorHandler = require('./middlewares/error-handler');
const apiRouter = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Socket.io init
const httpServer = http.createServer(app);
new SocketManager().initializeSocket(httpServer, app);

// Mount routes
app.use('/api/v1', apiRouter);
app.use(errorHandler);

httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});