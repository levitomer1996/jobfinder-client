import { io } from "socket.io-client";

const socket = io("http://10.100.102.122:4000"); // updated to match backend port

export default socket;
