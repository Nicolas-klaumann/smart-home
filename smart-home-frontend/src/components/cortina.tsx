import React from 'react';
import './quarto';

// Definição das propriedades (props) que o componente CortinaControl espera receber
interface CortinaControlProps {
  open: boolean;
  onToggle: () => void;
}

// Componente funcional que controla o estado das cortinas
const CortinaControl: React.FC<CortinaControlProps> = ({ open, onToggle }) => {
  return (
    <div className="Cortina-control-container">
      <button onClick={onToggle}>
        {open ? 'As cortinas estão abertas' : 'As cortinas estão fechadas'}
      </button>
      <div className="image-container">
        <img
          src={open ? '/imgCortinaAberta.png' : '/imgCortinaFechada.png'}
          alt={open ? 'Cortinas abertas' : 'Cortinas fechadas'}
          className="imgCortina"
        />
      </div>
    </div>
  );
};

export default CortinaControl;
