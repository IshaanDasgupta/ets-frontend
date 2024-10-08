import SocketIOClient from "socket.io-client";
const socket = SocketIOClient.connect("https://ets-backend-t2yw.onrender.com/");
export default socket;
// export const socket = SocketIOClient("http://10.0.0.2:8000");
// export const socket = SocketIOClient("https://ets-backend-t2yw.onrender.com/");
