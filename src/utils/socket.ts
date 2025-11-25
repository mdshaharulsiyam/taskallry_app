import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { url } from "../redux/baseApi";

let socket: Socket | null = null;

export const getSocket = async (): Promise<Socket> => {
  if (socket && socket.connected) {
    return socket;
  }

  const token = await AsyncStorage.getItem("token");

  socket = io(url, {
    // transports: ["websocket"],
    query: {
      token: token || "",
    },
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
