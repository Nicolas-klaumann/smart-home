import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

interface DeviceState {
  lights: boolean;
  tv?: {
    on: boolean;
    channel: number;
  };
  airConditioner?: {
    on: boolean;
    temperature: number;
  };
  fridge?: {
    temperature: number;
    alert: boolean;
  };
  stove?: {
    on: boolean;
    power: number;
  };
  fan?: {
    on: boolean;
    speed: number;
  };
  curtains?: 'open' | 'closed';
}

interface RoomState {
  livingRoom: {
    lights: boolean;
    tv: {
      on: boolean;
      channel: number;
    };
    airConditioner: {
      on: boolean;
      temperature: number;
    };
  };
  kitchen: {
    lights: boolean;
    fridge: {
      temperature: number;
      alert: boolean;
    };
    stove: {
      on: boolean;
      power: number;
    };
  };
  bedroom: {
    lights: boolean;
    fan: {
      on: boolean;
      speed: number;
    };
    curtains: 'open' | 'closed';
  };
}

let devicesState: RoomState = {
  livingRoom: {
    lights: false,
    tv: { on: false, channel: 1 },
    airConditioner: { on: false, temperature: 24 },
  },
  kitchen: {
    lights: false,
    fridge: { temperature: 4, alert: false },
    stove: { on: false, power: 1 },
  },
  bedroom: {
    lights: false,
    fan: { on: false, speed: 1 },
    curtains: 'closed',
  },
};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('initialState', devicesState);

  socket.on(
    'updateDevice',
    (data: { room: keyof RoomState; device: string; state: any }) => {
      const { room, device, state } = data;
      console.log(
        `Update device request: Room - ${room}, Device - ${device}, State - ${state}`
      );
      if (devicesState[room] && device in devicesState[room]) {
        (devicesState[room] as any)[device] = state;
        io.emit('deviceStateChanged', data);
      }
    }
  );

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
