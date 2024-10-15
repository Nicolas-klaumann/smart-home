import React from 'react';
import LuzControl from './luz';
import FogaoControl from './fogao';
import './cozinha.css';

// Definição das propriedades (props) que o componente Cozinha espera receber
interface CozinhaProps {
  devices: any;
  handleDeviceChange: (room: string, device: string, state: any) => void;
}

// Componente funcional que representa a cozinha
const Cozinha: React.FC<CozinhaProps> = ({ devices, handleDeviceChange }) => {
  return (
    <div className="section">
      <h2>Cozinha</h2>
      
      {/* Componente LuzControl para gerenciar a luz */}
      <LuzControl
        room="Cozinha"
        Luz={devices.Cozinha?.Luz}
        onToggle={() => handleDeviceChange('Cozinha', 'Luz', !devices.Cozinha?.Luz)}
      />

      <div>
        <label>Temperatura da Geladeira: {devices.Cozinha?.Geladeira?.temperatura}°C</label>
        {devices.Cozinha?.Geladeira?.alert && <p style={{ color: 'red' }}>Alerta: A temperatura está acima de 5°C!</p>}
      </div>

      {/* Componente FogaoControl para gerenciar o fogão */}
      <FogaoControl
        on={devices.Cozinha?.Fogao?.on}
        power={devices.Cozinha?.Fogao?.power}
        onToggle={() => handleDeviceChange('Cozinha', 'Fogao', { ...devices.Cozinha?.Fogao, on: !devices.Cozinha?.Fogao.on })}
        onChangePower={(power) => handleDeviceChange('Cozinha', 'Fogao', { ...devices.Cozinha?.Fogao, power })}
      />
    </div>
  );
};

export default Cozinha;