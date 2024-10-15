import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Cria a aplicação Express e habilita o uso de CORS para permitir requisições de diferentes origens
const app = express();
app.use(cors());

// Cria o servidor HTTP usando o Express
const httpServer = createServer(app);

// Configura o Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Interface que define o estado de cada sala e seus dispositivos
interface RoomState {
  SalaEstar: {
    Luz: boolean;
    tv: {
      on: boolean;
      canal: number;
    };
    ArCondicionado: {
      on: boolean;
      temperatura: number;
    };
  };
  Cozinha: {
    Luz: boolean;
    Geladeira: {
      temperatura: number;
      alert: boolean;
    };
    Fogao: {
      on: boolean;
      power: number;
    };
  };
  Quarto: {
    Luz: boolean;
    Ventilador: {
      on: boolean;
      velocidade: number;
    };
    Cortinas: 'aberto' | 'fechado';
  };
}

// Estado inicial dos dispositivos em cada sala
let devicesState: RoomState = {
  SalaEstar: {
    Luz: false,
    tv: { on: false, canal: 2 },
    ArCondicionado: { on: false, temperatura: 24 },
  },
  Cozinha: {
    Luz: false,
    Geladeira: { temperatura: 4, alert: false },
    Fogao: { on: false, power: 1 },
  },
  Quarto: {
    Luz: false,
    Ventilador: { on: false, velocidade: 1 },
    Cortinas: 'fechado',
  },
};

// Evento que ocorre quando um novo cliente se conecta ao servidor
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // Envia o estado inicial dos dispositivos para o cliente recém-conectado
  socket.emit('initialState', devicesState);

  // Evento que lida com atualizações de dispositivos recebidas do cliente
  socket.on(
    'updateDevice',
    (data: { room: keyof RoomState; device: string; state: any }) => {
      const { room, device, state } = data;
      console.log(
        `Solicitação de atualização de dispositivo: Sala - ${room}, Dispositivo - ${device}, Estado - ${state}`
      );

      // Atualiza o estado do dispositivo no servidor, se ele existir na sala indicada
      if (devicesState[room] && device in devicesState[room]) {
        (devicesState[room] as any)[device] = state;

        // Emite o evento de atualização de estado para todos os clientes conectados
        io.emit('deviceStateChanged', data);
      }
    }
  );

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

httpServer.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});