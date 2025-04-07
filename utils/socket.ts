import { BASE_URL } from "@/constants/Variables";
import { io, Socket } from "socket.io-client";

class SocketService {
    private static instance: SocketService;
    private socket: Socket | null = null;

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public connect(): Socket {
        if (!this.socket) {
            this.socket = io(BASE_URL, {
                transports: ["websocket"],
                forceNew: false,
            });
            console.log("Socket Connected");
        }
        return this.socket;
    }

    public getSocket(): Socket | null {
        return this.socket;
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            console.log("Socket Disconnected");
        }
    }
}

export default SocketService.getInstance();
