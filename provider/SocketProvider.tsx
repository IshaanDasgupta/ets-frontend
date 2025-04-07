import React, { createContext, useEffect, useState } from "react";
import socketService from "@/utils/socket";

export const SocketContext = createContext(socketService.getSocket());

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState(socketService.getSocket());

    useEffect(() => {
        const newSocket = socketService.connect();
        setSocket(newSocket);

        return () => {
            socketService.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
