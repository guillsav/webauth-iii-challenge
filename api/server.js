const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authsRouter = require('../auth/auth');

const server = express();

server.use(helmet());
server.use(cors());
server.use('/api/auth', authsRouter);

module.exports = server;
