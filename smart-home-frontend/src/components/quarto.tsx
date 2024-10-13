import React from 'react';
import LightControl from './luz';
import FanControl from './ventilador';
import CurtainControl from './cortina';
import './quarto.css';

interface BedroomProps {
  devices: any;
  handleDeviceChange: (room: string, device: string, state: any) => void;
}

const Bedroom: React.FC<BedroomProps> = ({ devices, handleDeviceChange }) => {
  return (
    <div className="section">
      <h2>Quarto</h2>

      <LightControl
        room="bedroom"
        lights={devices.bedroom?.lights}
        onToggle={() => handleDeviceChange('bedroom', 'lights', !devices.bedroom?.lights)}
      />

      <FanControl
        on={devices.bedroom?.fan?.on}
        speed={devices.bedroom?.fan?.speed}
        onToggle={() => handleDeviceChange('bedroom', 'fan', { ...devices.bedroom?.fan, on: !devices.bedroom?.fan.on })}
        onChangeSpeed={(speed) => handleDeviceChange('bedroom', 'fan', { ...devices.bedroom?.fan, speed })}
      />

      {/* Componente CurtainControl para gerenciar as cortinas */}
      <CurtainControl
        open={devices.bedroom?.curtains === 'open'}
        onToggle={() => handleDeviceChange('bedroom', 'curtains', devices.bedroom?.curtains === 'open' ? 'closed' : 'open')}
      />
    </div>
  );
};

export default Bedroom;