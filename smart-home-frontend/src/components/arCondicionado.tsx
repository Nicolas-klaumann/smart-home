import React from 'react';
import './salaEstar';

// Definição das propriedades (props) que o componente ArCondicionado espera receber
interface ArCondicionadoProps {
  on: boolean;
  temperatura: number;
  onToggle: () => void;
  onChangeTemperatura: (temp: number) => void;
}

// Componente funcional que representa o Ar Condicionado
const ArCondicionado: React.FC<ArCondicionadoProps> = ({ on, temperatura, onToggle, onChangeTemperatura }) => {
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
            {temperatura}°C
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
            value={temperatura}
            onChange={(e) => onChangeTemperatura(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default ArCondicionado;