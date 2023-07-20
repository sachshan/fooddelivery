import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import socketChat from './socketChat/socketChat.js';


// Paths to directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start express
const app = express();

// Start server
const server = http.createServer(app);

// The chat app server will run on port 30001
const port = 3001;
const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

app.use(express.json());

// Pass the server instance to the socketChat function
socketChat(server);

server.listen(port, ()=>{
    console.log("Server is up on port "+port);
});