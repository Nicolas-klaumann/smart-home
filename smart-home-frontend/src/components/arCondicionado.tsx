import React from 'react';
import './salaEstar';

interface AirConditionerProps {
  on: boolean;
  temperature: number;
  onToggle: () => void;
  onChangeTemperature: (temp: number) => void;
}

const AirConditioner: React.FC<AirConditionerProps> = ({ on, temperature, onToggle, onChangeTemperature }) => {
  return (
    <div className="arCondicionado">
      <button onClick={onToggle}>
        {on ? 'O ar-condicionado está ligado' : 'O ar-condicionado está desligado'}
      </button>
      <div className="image-container">
        <img 
          className="imgArCondicionado"
          src={on ? '/imgArLigado.png' : '/imgArDesligado.png'} 
          alt={on ? 'Ar-condicionado ligado' : 'Ar-condicionado desligado'} 
        />
        {on && ( // Mostra a temperatura apenas quando o ar-condicionado está ligado
          <div className="temperatura">
            {temperature}°C
          </div>
        )}
      </div>
      {on && ( // Exibe o controle de temperatura apenas quando o ar-condicionado está ligado
        <div>
          <label>Temperatura: </label>
          <input
            type="number"
            min="18"
            max="30"
            value={temperature}
            onChange={(e) => onChangeTemperature(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default AirConditioner;
