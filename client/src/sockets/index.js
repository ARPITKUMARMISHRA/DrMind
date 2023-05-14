export default function socketInit(socket) {
    socket.on('connect', () => {
        console.log(socket.id);
        console.log('connected');
    });
}