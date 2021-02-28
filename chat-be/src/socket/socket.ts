import { authenticateWithToken } from "../utils/authenticate";

let socketIo = require('socket.io');

export function initializeSocket(http) {
    const _io = socketIo(http, {
        path: `/socket.io`
    });
    _io.use(async (socket: any, next: any) => {
        console.log("socket hited", socket.id, socket.handshake.headers["authorization"])
        if (socket.handshake && socket.handshake.headers["authorization"]) {
            let user = await authenticateWithToken(socket.handshake.headers["authorization"]);
            console.log(socket.id, user.id, "=========> details")
            socket.client.userId = user.id;
            socket.client.user = user;
            next();
        }
        else {
            next(new Error('Authentication error'));
        }
    }).on('connection', (socket) => {
        console.log(`Sockect Connection Established ${socket.id}`);

        socket.on("check-conn", () => {
            _io.to(socket.id).emit(`check-conn`, { is_connected: true });
        });
        // Update User Location
        socket.on("loyalty_ribbon", async (storeId) => {
        });

        // On Disconnect
        socket.on('disconnect', () => {
            console.log(`Sockect Disconnected ${socket.id}`);
        });
    });
    return _io;
}