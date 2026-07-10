// Car Parking Friends Edition
// Created by: kernavee
// Multiplayer Server

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

const rooms = new Map();

function getRoomList() {
  const list = [];
  for (const [id, room] of rooms) {
    list.push({ id, playerCount: room.players.size, name: room.name });
  }
  return list;
}

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  let currentRoom = null;

  socket.on('getRooms', () => {
    socket.emit('roomsList', getRoomList());
  });

  socket.on('joinRoom', ({ roomId, player }) => {
    if (currentRoom) {
      socket.leave(currentRoom);
      const oldRoom = rooms.get(currentRoom);
      if (oldRoom) {
        oldRoom.players.delete(socket.id);
        if (oldRoom.players.size === 0) rooms.delete(currentRoom);
        else io.to(currentRoom).emit('playersUpdate', Array.from(oldRoom.players.values()));
      }
    }

    currentRoom = roomId;
    if (!rooms.has(roomId)) {
      rooms.set(roomId, { name: roomId, players: new Map() });
    }

    const room = rooms.get(roomId);
    room.players.set(socket.id, {
      id: socket.id,
      name: player.name,
      carId: player.carId,
      customization: player.customization,
      position: { x: Math.random() * 4 - 2, y: 0, z: Math.random() * 4 - 2 },
      rotation: 0,
      velocity: 0,
    });

    socket.join(roomId);
    io.to(roomId).emit('playersUpdate', Array.from(room.players.values()));
    console.log(`${player.name} joined room ${roomId}`);
  });

  socket.on('playerMove', (data) => {
    if (!currentRoom) return;
    const room = rooms.get(currentRoom);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      player.position = { x: data.x, y: 0, z: data.z };
      player.rotation = data.rotation;
      player.velocity = data.velocity;
      socket.to(currentRoom).emit('playersUpdate', Array.from(room.players.values()));
    }
  });

  socket.on('leaveRoom', () => {
    if (!currentRoom) return;
    const room = rooms.get(currentRoom);
    if (room) {
      room.players.delete(socket.id);
      if (room.players.size === 0) rooms.delete(currentRoom);
      else io.to(currentRoom).emit('playersUpdate', Array.from(room.players.values()));
    }
    socket.leave(currentRoom);
    currentRoom = null;
  });

  socket.on('disconnect', () => {
    if (currentRoom) {
      const room = rooms.get(currentRoom);
      if (room) {
        room.players.delete(socket.id);
        if (room.players.size === 0) rooms.delete(currentRoom);
        else io.to(currentRoom).emit('playersUpdate', Array.from(room.players.values()));
      }
    }
    console.log(`Player disconnected: ${socket.id}`);
  });
});

const CLIENT_DIST = join(__dirname, '..', 'client', 'dist');
app.use(express.static(CLIENT_DIST));
app.get('*', (_req, res) => {
  res.sendFile(join(CLIENT_DIST, 'index.html'));
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Car Parking Friends server running on port ${PORT}`);
});
