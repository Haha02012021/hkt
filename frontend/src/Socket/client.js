import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000"

const socketClient = io(
    ENDPOINT,
    {
        cors: {
            origin: "http://localhost:5000",
            credentials: true,
        },
        transports: ['websocket']
    }
)

socketClient.on('connect', () => {

    console.log("client connected server!");
})

export default socketClient


