import React from 'react';
import './quarto';

// Definição das propriedades (props) que o componente VentiladorControl espera receber
interface VentiladorControlProps {
  on: boolean;
  velocidade: number;
  onToggle: () => void;
  onChangeVelocidade: (velocidade: number) => void;
}

// Componente funcional que representa o VentiladorControl
const VentiladorControl: React.FC<VentiladorControlProps> = ({ on, velocidade, onToggle, onChangeVelocidade }) => {
  return (
    <div className="Ventilador-control-container">
      <button onClick={onToggle}>
        {on ? 'O ventilador está ligado' : 'O ventilador está desligado'}
      </button>
      <div className="image-container">
        <img
          src={on ? '/imgVentiladorLigado.png' : '/imgVentiladorDesligado.png'}
          alt={on ? 'Ventilador ligado' : 'Ventilador desligado'}
          className={on ? 'imgVentiladorLigado' : 'imgVentiladorDesligado'}
        />
        {on && ( // Mostra a velocidade apenas quando o ventilador está ligado
          <div className="velocidade">
            Velocidade: {velocidade}
          </div>
        )}
      </div>
      {on && ( // Exibe o controle de velocidade apenas quando o ventilador está ligado
        <div>
          <label>Velocidade: </label>
          <input
            type="number"
            min="1"
            max="3"
            value={velocidade}
            onChange={(e) => onChangeVelocidade(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default VentiladorControl;