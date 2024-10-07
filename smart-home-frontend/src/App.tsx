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
    socket.emit('updateDevice', { room, device, state });
  };

  return (
    <div>
      <h1>Smart Home Control</h1>
      <div>
        <h2>Sala de Estar</h2>
        <button onClick={() => handleDeviceChange('livingRoom', 'lights', !devices.livingRoom?.lights)}>
          {devices.livingRoom?.lights ? 'A luz está acessa' : 'A luz está apagada'}
        </button>
        <button onClick={() => handleDeviceChange('livingRoom', 'tv', { ...devices.livingRoom?.tv, on: !devices.livingRoom?.tv.on })}>
          {devices.livingRoom?.tv?.on ? 'A TV está ligada' : 'A TV está desligada'}
        </button>
        <div>
          <label>Canal: </label>
          <input
            type="number"
            value={devices.livingRoom?.tv?.channel}
            onChange={(e) => handleDeviceChange('livingRoom', 'tv', { ...devices.livingRoom?.tv, channel: parseInt(e.target.value) })}
          />
        </div>
        <button onClick={() => handleDeviceChange('livingRoom', 'airConditioner', { ...devices.livingRoom?.airConditioner, on: !devices.livingRoom?.airConditioner.on })}>
          {devices.livingRoom?.airConditioner?.on ? 'O ar-condicionado está ligado' : 'O ar-condicionado está desligado'}
        </button>
        <div>
          <label>Temperatura: </label>
          <input
            type="number"
            min="18"
            max="30"
            value={devices.livingRoom?.airConditioner?.temperature}
            onChange={(e) => handleDeviceChange('livingRoom', 'airConditioner', { ...devices.livingRoom?.airConditioner, temperature: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <h2>Cozinha</h2>
        <button onClick={() => handleDeviceChange('kitchen', 'lights', !devices.kitchen?.lights)}>
          {devices.kitchen?.lights ? 'A luz está acessa' : 'A luz está apagada'}
        </button>
        <div>
          <label>Temperatura da Geladeira: {devices.kitchen?.fridge?.temperature}°C</label>
          {devices.kitchen?.fridge?.alert && <p style={{ color: 'red' }}>Alerta: A temperatura está acima de 5°C!</p>}
        </div>
        <button onClick={() => handleDeviceChange('kitchen', 'stove', { ...devices.kitchen?.stove, on: !devices.kitchen?.stove.on })}>
          {devices.kitchen?.stove?.on ? 'O fogão está ligado' : 'O fogão está desligado'}
        </button>
        <div>
          <label>Potência: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={devices.kitchen?.stove?.power}
            onChange={(e) => handleDeviceChange('kitchen', 'stove', { ...devices.kitchen?.stove, power: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <h2>Quarto</h2>
        <button onClick={() => handleDeviceChange('bedroom', 'lights', !devices.bedroom?.lights)}>
          {devices.bedroom?.lights ? 'A luz está acessa' : 'A luz está apagada'}
        </button>
        <button onClick={() => handleDeviceChange('bedroom', 'fan', { ...devices.bedroom?.fan, on: !devices.bedroom?.fan.on })}>
          {devices.bedroom?.fan?.on ? 'O ventilador está ligado' : 'O ventilador está desligado'}
        </button>
        <div>
          <label>Velocidade: </label>
          <input
            type="number"
            min="1"
            max="3"
            value={devices.bedroom?.fan?.speed}
            onChange={(e) => handleDeviceChange('bedroom', 'fan', { ...devices.bedroom?.fan, speed: parseInt(e.target.value) })}
          />
        </div>
        <button onClick={() => handleDeviceChange('bedroom', 'curtains', devices.bedroom?.curtains === 'open' ? 'closed' : 'open')}>
          {devices.bedroom?.curtains === 'open' ? 'Fechar as cortinas' : 'Abrir as cortinas'}
        </button>
      </div>
    </div>
  );
};

export default App;
