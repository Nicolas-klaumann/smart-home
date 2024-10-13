import React from 'react';
import LightControl from './luz';
import AirConditioner from './arCondicionado';
import './salaEstar.css';

interface LivingRoomProps {
  devices: any;
  handleDeviceChange: (room: string, device: string, state: any) => void;
}

const LivingRoom: React.FC<LivingRoomProps> = ({ devices, handleDeviceChange }) => {
  return (
    <div className="section">
      <h2>Sala de Estar</h2>

      {/* Controle de Luz */}
      <LightControl
        room="livingRoom"
        lights={devices.livingRoom?.lights}
        onToggle={() => handleDeviceChange('livingRoom', 'lights', !devices.livingRoom?.lights)}
      />

      {/* Controle da TV */}
      <button onClick={() => handleDeviceChange('livingRoom', 'tv', { ...devices.livingRoom?.tv, on: !devices.livingRoom?.tv.on })}>
        {devices.livingRoom?.tv?.on ? 'A TV está ligada' : 'A TV está desligada'}
      </button>

      {/* Exibição da TV */}
      <div className="tv">
        {devices.livingRoom?.tv?.on ? (
          <div className="tv-screen">
            <img
              src={`/imagemTv/canal-${devices.livingRoom?.tv?.canal}.png`}
              alt={`Canal ${devices.livingRoom?.tv?.canal}`}
            />
          </div>
        ) : (
          <div className="tv-off">A TV está desligada</div>
        )}
      </div>

      {/* Controles de canal */}
      {devices.livingRoom?.tv?.on && (
        <div>
          <div>
            <label>Canal: </label>
            <input
              type="number"
              min="1"
              max="5"
              value={devices.livingRoom?.tv?.canal}
              onChange={(e) => handleDeviceChange('livingRoom', 'tv', { ...devices.livingRoom?.tv, canal: parseInt(e.target.value) })}
            />
          </div>
        </div>
      )}

      {/* Controle do ar-condicionado */}
      <AirConditioner
        on={devices.livingRoom?.airConditioner?.on}
        temperature={devices.livingRoom?.airConditioner?.temperature}
        onToggle={() => handleDeviceChange('livingRoom', 'airConditioner', { ...devices.livingRoom?.airConditioner, on: !devices.livingRoom?.airConditioner.on })}
        onChangeTemperature={(temp) => handleDeviceChange('livingRoom', 'airConditioner', { ...devices.livingRoom?.airConditioner, temperature: temp })}
      />
    </div>
  );
};

export default LivingRoom;
