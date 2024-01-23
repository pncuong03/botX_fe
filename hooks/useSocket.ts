import { useEffect } from "react";
import { useAppSelector } from "./useStore";
import { selectAccessToken } from "redux/authentication/selector";
import Socket from "utils/socket";

export const useSocket = ({
    event,
    handleEvent,
    depArr,
    nonAuthen,
  }: {
    event: string;
    handleEvent: any;
    depArr?: any;
    nonAuthen?: boolean;
  }) => {
    const token = useAppSelector(selectAccessToken.getToken);

    useEffect(() => {
      const socketIo = new Socket();
      const socketInstance = socketIo.getInstance(token);
      if (token || nonAuthen) {
        socketInstance.on(event, handleEvent);
      }
      return () => {
        if (token || nonAuthen) {
          socketInstance.off(event, handleEvent);
        }
      };
    }, [token, ...(depArr || [])]);
  };