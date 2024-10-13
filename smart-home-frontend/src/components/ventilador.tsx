import React from 'react';
import './quarto'; // Certifique-se de importar o CSS

interface FanControlProps {
  on: boolean;
  speed: number;
  onToggle: () => void;
  onChangeSpeed: (speed: number) => void;
}

const FanControl: React.FC<FanControlProps> = ({ on, speed, onToggle, onChangeSpeed }) => {
  return (
    <div className="fan-control-container">
      <button onClick={onToggle}>
        {on ? 'O ventilador está ligado' : 'O ventilador está desligado'}
      </button>
      <div className="image-container">
        <img
          src={on ? '/imgVentiladorLigado.png' : '/imgVentiladorDesligado.png'}
          alt={on ? 'Ventilador ligado' : 'Ventilador desligado'}
          className={on ? 'imgVentiladorLigado' : 'imgVentiladorDesligado'}
        />
        {on && (
          <div className="velocidade">
            Velocidade: {speed}
          </div>
        )}
      </div>
      {on && (
        <div>
          <label>Velocidade: </label>
          <input
            type="number"
            min="1"
            max="3"
            value={speed}
            onChange={(e) => onChangeSpeed(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default FanControl;
