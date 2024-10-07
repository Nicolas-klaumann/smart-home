// src/App.tsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const App: React.FC = () => {
  const [devices, setDevices] = useState<any>({});

  useEffect(() => {
    // Receber o estado inicial dos dispositivos
    socket.on('initialState', (initialState) => {
      setDevices(initialState);
    });

    // Atualizar o estado local quando um dispositivo mudar
    socket.on('deviceStateChanged', (data) => {
      setDevices((prevDevices: any) => {
        const { room, device, state } = data;
        const updatedDevices = { ...prevDevices };
        if (updatedDevices[room]) {
          updatedDevices[room][device] = state;
        }
        return updatedDevices;
      });
    });

    return () => {
      socket.off('initialState');
      socket.off('deviceStateChanged');
    };
  }, []);

  const handleDeviceChange = (room: string, device: string, state: any) => {
    console.log(room, device, state);
    
    socket.emit('updateDevice', { room, device, state });
  };

  return (
    <div>
      <h1>Smart Home Control</h1>
      <div>
        <h2>Sala de Estar</h2>
        <button onClick={() => handleDeviceChange('livingRoom', 'lights', !devices.livingRoom?.lights)}>
          {devices.livingRoom?.lights ? 'A luz está acessa' : 'A luz está Apagada'}
        </button>
        <button onClick={() => handleDeviceChange('livingRoom', 'tv', !devices.livingRoom?.tv)}>
          {devices.livingRoom?.tv ? 'A Tv está ligada' : 'A tv está Desligada'}
        </button>
      </div>
    </div>
  );
};

export default App;
