import React from 'react';
import LuzControl from './luz';
import ArCondicionado from './arCondicionado';
import './salaEstar.css';

// Definição das propriedades (props) que o componente SalaEstarProps espera receber
interface SalaEstarProps {
  devices: any;
  handleDeviceChange: (room: string, device: string, state: any) => void;
}

// Componente funcional que representa a SalaEstar
const SalaEstar: React.FC<SalaEstarProps> = ({ devices, handleDeviceChange }) => {
  return (
    <div className="section">
      <h2>Sala de Estar</h2>

      {/* Componente LuzControl para gerenciar a Luz */}
      <LuzControl
        room="SalaEstar"
        Luz={devices.SalaEstar?.Luz}
        onToggle={() => handleDeviceChange('SalaEstar', 'Luz', !devices.SalaEstar?.Luz)}
      />

      {/* Controle da TV */}
      <button onClick={() => handleDeviceChange('SalaEstar', 'tv', { ...devices.SalaEstar?.tv, on: !devices.SalaEstar?.tv.on })}>
        {devices.SalaEstar?.tv?.on ? 'A TV está ligada' : 'A TV está desligada'}
      </button>

      {/* Exibição da TV */}
      <div className="tv">
        {devices.SalaEstar?.tv?.on ? (
          <div className="tv-screen">
            <img
              src={`/imagemTv/canal-${devices.SalaEstar?.tv?.canal}.png`}
              alt={`Canal ${devices.SalaEstar?.tv?.canal}`}
            />
          </div>
        ) : (
          <div className="tv-off">A TV está desligada</div>
        )}
      </div>

      {/* Controles de canal */}
      {devices.SalaEstar?.tv?.on && (
        <div>
          <div>
            <label>Canal: </label>
            <input
              type="number"
              min="1"
              max="5"
              value={devices.SalaEstar?.tv?.canal}
              onChange={(e) => handleDeviceChange('SalaEstar', 'tv', { ...devices.SalaEstar?.tv, canal: parseInt(e.target.value) })}
            />
          </div>
        </div>
      )}

      {/* Controle do ar-condicionado */}
      <ArCondicionado
        on={devices.SalaEstar?.ArCondicionado?.on}
        temperatura={devices.SalaEstar?.ArCondicionado?.temperatura}
        onToggle={() => handleDeviceChange('SalaEstar', 'ArCondicionado', { ...devices.SalaEstar?.ArCondicionado, on: !devices.SalaEstar?.ArCondicionado.on })}
        onChangeTemperatura={(temp) => handleDeviceChange('SalaEstar', 'ArCondicionado', { ...devices.SalaEstar?.ArCondicionado, temperatura: temp })}
      />
    </div>
  );
};

export default SalaEstar;
