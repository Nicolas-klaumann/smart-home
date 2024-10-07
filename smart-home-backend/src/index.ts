import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

interface DeviceState {
  lights: boolean;
  tv: { status: boolean; channel: number };
  airConditioner: { status: boolean; temperature: number };
}

let deviceState: DeviceState = {
  lights: false,
  tv: { status: false, channel: 1 },
  airConditioner: { status: false, temperature: 24 },
};

io.on('connection', (socket) => {
  console.log('a user connected');

  // Enviar estado inicial dos dispositivos para o cliente
  socket.emit('initialState', deviceState);

  // Lidar com eventos de mudança de estado
  socket.on('toggleLights', (status: boolean) => {
    deviceState.lights = status;
    io.emit('lightStatus', status); // Enviar atualização para todos os clientes
  });

  socket.on('toggleTV', (status: boolean) => {
    deviceState.tv.status = status;
    io.emit('tvStatus', deviceState.tv);
  });

  socket.on('changeChannel', (channel: number) => {
    deviceState.tv.channel = channel;
    io.emit('tvStatus', deviceState.tv);
  });

  socket.on('toggleAirConditioner', (status: boolean) => {
    deviceState.airConditioner.status = status;
    io.emit('airConditionerStatus', deviceState.airConditioner);
  });

  socket.on('setTemperature', (temperature: number) => {
    deviceState.airConditioner.temperature = temperature;
    io.emit('airConditionerStatus', deviceState.airConditioner);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('listening on *:3000');
});
