import React from 'react';
import './cozinha.css';

// Definição das propriedades (props) que o componente FogaoControl espera receber
interface FogaoControlProps {
  on: boolean;
  power: number;
  onToggle: () => void;
  onChangePower: (power: number) => void;
}

// Componente funcional para controlar o fogão
const FogaoControl: React.FC<FogaoControlProps> = ({ on, power, onToggle, onChangePower }) => {
  return (
    <div className="Fogao-control-container">
      <button onClick={onToggle}>
        {on ? 'O fogão está ligado' : 'O fogão está desligado'}
      </button>

      <div className="image-container">
        <img
          src={on ? '/imgFogaoLigado.png' : '/imgFogaoDesligado.png'}
          alt={on ? 'Fogão ligado' : 'Fogão desligado'}
          className="imgFogao"
        />
        {on && ( // Exibir a potência acima da imagem apenas se o fogão estiver ligado
          <div className="potencia">
            Potência: {power}
          </div>
        )}
      </div>

      {on && ( // Campo para ajustar a potência apenas se o fogão estiver ligado
        <div>
          <label>Definir Potência: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={power}
            onChange={(e) => onChangePower(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default FogaoControl;