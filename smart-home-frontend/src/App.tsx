import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import LivingRoom from './components/salaEstar';
import Kitchen from './components/cozinha';
import Bedroom from './components/quarto';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

const socket = io('http://localhost:4000');

const App: React.FC = () => {
  const [devices, setDevices] = useState<any>({});

  useEffect(() => {
    socket.on('initialState', (initialState) => {
      setDevices(initialState);
    });

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
      <Header />
      <main>
        <LivingRoom devices={devices} handleDeviceChange={handleDeviceChange} />
        <Kitchen devices={devices} handleDeviceChange={handleDeviceChange} />
        <Bedroom devices={devices} handleDeviceChange={handleDeviceChange} />
      </main>
      <Footer />
    </div>
  );
};

export default App;