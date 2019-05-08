const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authsRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/auth', authsRouter);
server.use('/api/users', usersRouter);

module.exports = server;
