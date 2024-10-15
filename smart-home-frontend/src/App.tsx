import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SalaEstar from './components/salaEstar';
import Cozinha from './components/cozinha';
import Quarto from './components/quarto';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

// Inicializa o cliente Socket.IO, conectando-se ao servidor na porta 4000
const socket = io('http://localhost:4000');

const App: React.FC = () => {
  // Estado para armazenar o estado dos dispositivos
  const [devices, setDevices] = useState<any>({});

  // Hook useEffect para gerenciar a conexão Socket.IO e os eventos
  useEffect(() => {
    // Ouve o evento 'initialState' do servidor para obter o estado inicial dos dispositivos
    socket.on('initialState', (initialState) => {
      setDevices(initialState);
    });

    // Ouve o evento 'deviceStateChanged' para atualizar o estado dos dispositivos em tempo real
    socket.on('deviceStateChanged', (data) => {
      setDevices((prevDevices: any) => {
        const { room, device, state } = data; // Extrai as informações do evento
        const updatedDevices = { ...prevDevices }; // Cria uma cópia do estado anterior
        if (updatedDevices[room]) {
          updatedDevices[room][device] = state; // Atualiza o estado do dispositivo específico
        }
        return updatedDevices; // Retorna o novo estado atualizado
      });
    });

    // Limpeza dos ouvintes quando o componente é "desmontado"
    return () => {
      socket.off('initialState'); // Remove o ouvinte para o evento 'initialState'
      socket.off('deviceStateChanged'); // Remove o ouvinte para o evento 'deviceStateChanged'
    };
  }, []); // O array vazio garante que o efeito seja executado apenas uma vez na montagem

  // Função para lidar com mudanças no estado dos dispositivos
  const handleDeviceChange = (room: string, device: string, state: any) => {
    socket.emit('updateDevice', { room, device, state });
  };

  return (
    <div>
      <Header /> {/* Renderiza o componente Header */}
      <main>
        {/* Renderiza os componentes das diferentes salas, passando dispositivos e a função de manipulação */}
        <SalaEstar devices={devices} handleDeviceChange={handleDeviceChange} />
        <Cozinha devices={devices} handleDeviceChange={handleDeviceChange} />
        <Quarto devices={devices} handleDeviceChange={handleDeviceChange} />
      </main>
      <Footer /> {/* Renderiza o componente Footer */}
    </div>
  );
};

export default App;