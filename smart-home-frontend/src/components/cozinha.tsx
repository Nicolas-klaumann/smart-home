import React from 'react';
import LightControl from './luz';
import StoveControl from './fogao';
import './cozinha.css';

interface KitchenProps {
  devices: any;
  handleDeviceChange: (room: string, device: string, state: any) => void;
}

const Kitchen: React.FC<KitchenProps> = ({ devices, handleDeviceChange }) => {
  return (
    <div className="section">
      <h2>Cozinha</h2>
      
      {/* Componente LightControl para gerenciar a luz */}
      <LightControl
        room="kitchen"
        lights={devices.kitchen?.lights}
        onToggle={() => handleDeviceChange('kitchen', 'lights', !devices.kitchen?.lights)}
      />

      <div>
        <label>Temperatura da Geladeira: {devices.kitchen?.fridge?.temperature}°C</label>
        {devices.kitchen?.fridge?.alert && <p style={{ color: 'red' }}>Alerta: A temperatura está acima de 5°C!</p>}
      </div>

      {/* Componente StoveControl para gerenciar o fogão */}
      <StoveControl
        on={devices.kitchen?.stove?.on}
        power={devices.kitchen?.stove?.power}
        onToggle={() => handleDeviceChange('kitchen', 'stove', { ...devices.kitchen?.stove, on: !devices.kitchen?.stove.on })}
        onChangePower={(power) => handleDeviceChange('kitchen', 'stove', { ...devices.kitchen?.stove, power })}
      />
    </div>
  );
};

export default Kitchen;