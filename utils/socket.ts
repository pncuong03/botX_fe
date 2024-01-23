import io from 'socket.io-client';
let socketIo: any;

export default class Socket {
  getInstance = (token:any) => {
    if (socketIo == null) {
      socketIo = io(`${process.env.NEXT_PUBLIC_SOCKET}`,{
        transports : ['websocket'],
        query:{
          token
        }
      });
      socketIo.on('connect', () => {
        console.log('connect=', 'connect');
      });
      socketIo.on('disconnect', () => {
        console.log('------------DISCONNECT-SOCKET------------');
      });
    }
    return socketIo;
  };
  removeInstance = () => {
    socketIo = null;
  };
}
