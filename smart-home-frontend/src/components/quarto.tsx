import React from 'react';
import LuzControl from './luz';
import VentiladorControl from './ventilador';
import CortinaControl from './cortina';
import './quarto.css';

// Definição das propriedades (props) que o componente QuartoProps espera receber
interface QuartoProps {
  devices: any;
  handleDeviceChange: (room: string, device: string, state: any) => void;
}

// Componente funcional que representa o Quarto
const Quarto: React.FC<QuartoProps> = ({ devices, handleDeviceChange }) => {
  return (
    <div className="section">
      <h2>Quarto</h2>

      {/* Componente LuzControl para gerenciar a Luz */}
      <LuzControl
        room="Quarto"
        Luz={devices.Quarto?.Luz}
        onToggle={() => handleDeviceChange('Quarto', 'Luz', !devices.Quarto?.Luz)}
      />

      {/* Componente VentiladorControl para gerenciar o Ventilador */}
      <VentiladorControl
        on={devices.Quarto?.Ventilador?.on}
        velocidade={devices.Quarto?.Ventilador?.velocidade}
        onToggle={() => handleDeviceChange('Quarto', 'Ventilador', { ...devices.Quarto?.Ventilador, on: !devices.Quarto?.Ventilador.on })}
        onChangeVelocidade={(velocidade) => handleDeviceChange('Quarto', 'Ventilador', { ...devices.Quarto?.Ventilador, velocidade })}
      />

      {/* Componente CortinaControl para gerenciar as cortinas */}
      <CortinaControl
        open={devices.Quarto?.Cortinas === 'aberto'}
        onToggle={() => handleDeviceChange('Quarto', 'Cortinas', devices.Quarto?.Cortinas === 'aberto' ? 'fechado' : 'aberto')}
      />
    </div>
  );
};

export default Quarto;