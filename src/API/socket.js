import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // updated to match backend port

export default socket;
