import React from 'react';
import './quarto'; // Certifique-se de criar e importar o CSS

interface CurtainControlProps {
  open: boolean;
  onToggle: () => void;
}

const CurtainControl: React.FC<CurtainControlProps> = ({ open, onToggle }) => {
  return (
    <div className="curtain-control-container">
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

export default CurtainControl;
