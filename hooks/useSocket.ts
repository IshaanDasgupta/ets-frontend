import { SocketContext } from "@/provider/SocketProvider";
import { useContext, useEffect } from "react";

const useSocket = (eventName: string, callback: (data: any) => void) => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        if (!socket) return;

        socket.on(eventName, callback);

        return () => {
            socket.off(eventName, callback);
        };
    }, [socket, eventName, callback]);
};

export default useSocket;
